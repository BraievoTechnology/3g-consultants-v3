import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, Media } from 'docx';
import { uploadToAzureBlob } from '@/app/api/util/blobService';

interface ProjectImage {
    id: number;
    projectId: number;
    image_name: string;
}

interface Project {
    id: number;
    project_name: string;
    location: string;
    start_date: string;
    end_date: string;
    budget: string;
    status: string;
    description: string;
    category: string;
    images: ProjectImage[];
}

function generateFileName(): string {
    const now = new Date();
    const timestamp = now
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14);
    return `projects-${timestamp}.docx`;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Incoming body:", body);

        const projects: Project[] = Array.isArray(body) ? body : body.projects;

        if (!Array.isArray(projects)) {
            return NextResponse.json({ message: 'Invalid request format. Expected an array of projects.' }, { status: 400 });
        }

        const doc = new Document({
            sections: [],
            creator: 'Next.js App',
            title: 'Project Report',
            description: 'Generated project report with images',
        });

        const children: Paragraph[] = [];

        for (const project of projects) {
            children.push(
                new Paragraph({ text: `Project Name: ${project.project_name}`, heading: 'Heading1' }),
                new Paragraph({ text: `Location: ${project.location}` }),
                new Paragraph({ text: `Start Date: ${new Date(project.start_date).toLocaleDateString()}` }),
                new Paragraph({ text: `End Date: ${new Date(project.end_date).toLocaleDateString()}` }),
                new Paragraph({ text: `Budget: ${project.budget}` }),
                new Paragraph({ text: `Status: ${project.status}` }),
                new Paragraph({ text: `Category: ${project.category}` }),
                new Paragraph({ text: `Description: ${project.description}` }),
            );

         /*   for (const image of project.images) {
                const imagePath = path.join(process.cwd(), 'public', image.image_name);
                try {
                    const imageBuffer = readFileSync(imagePath);

                    // Show image with fixed width and height
                    const imageDoc = Media.addImage(doc, imageBuffer, 400, 300); // width x height in pixels
                    children.push(new Paragraph(imageDoc));
                } catch (err) {
                    console.error(`Image not found: ${image.image_name}`, err);
                    children.push(new Paragraph({ text: `Image not found: ${image.image_name}` }));
                }
            }*/

            children.push(new Paragraph({ text: '------------------------------------------' }));
        }

        doc.addSection({ children });

        const buffer = await Packer.toBuffer(doc);

        const fileName = generateFileName();
        const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        const blobUrl = await uploadToAzureBlob(buffer, fileName, mimeType);

        return NextResponse.json({ message: 'Document generated', filePath: blobUrl }, { status: 200 });

    } catch (error) {
        console.error('Error generating document:', error);
        return NextResponse.json({ message: 'Failed to generate document' }, { status: 500 });
    }
}
