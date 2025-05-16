// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {uploadToAzureBlob} from "@/app/api/util/blobService";

const prisma = new PrismaClient();

// Utility to extract the ID from URL
function extractIdFromUrl(req: NextRequest): number | null {
    const idStr = req.nextUrl.pathname.split('/').pop();
    return idStr ? Number(idStr) : null;
}

export async function GET(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing ID' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
}

/*export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing ID' }, { status: 400 });
    }

    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string;
        const start_date = formData.get('start_date') as string;
        const end_date = formData.get('end_date') as string;
        const budget = formData.get('budget') as string;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;

        const files = formData.getAll('images');
        const savedImagePaths: { image_name: string }[] = [];

        const uploadDir = path.join(process.cwd(), 'public/assets/projectImages');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of files) {
            if (typeof file === 'object' && 'arrayBuffer' in file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path.join(uploadDir, fileName);

                await writeFile(filePath, buffer);
                savedImagePaths.push({ image_name: `/assets/projectImages/${fileName}` });
            }
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                budget: budget ? parseFloat(budget) : undefined,
                status,
                description,
                category,
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error('Project FormData PUT error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}*/
export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing ID' }, { status: 400 });
    }

    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string;
        const start_date = formData.get('start_date') as string;
        const end_date = formData.get('end_date') as string;
        const budget = formData.get('budget') as string;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;

        const files = formData.getAll('images');
        const savedImagePaths: { image_name: string }[] = [];

        for (const file of files) {
            if (typeof file === 'object' && 'arrayBuffer' in file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
                const mimeType = file.type;

                const imageUrl = await uploadToAzureBlob(buffer, fileName, mimeType);
                savedImagePaths.push({ image_name: imageUrl });
            }
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                budget: budget ? parseFloat(budget) : undefined,
                status,
                description,
                category,
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error('Project FormData PUT error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing ID' }, { status: 400 });
    }

    try {
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 });
    }
}
