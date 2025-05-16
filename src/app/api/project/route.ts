// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {uploadToAzureBlob} from "@/app/api/util/blobService";

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

// POST - Create Project
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string | null;
        const start_date = formData.get('start_date') as string | null;
        const end_date = formData.get('end_date') as string | null;
        const budget = formData.get('budget') as string | null;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string | null;
        const category = formData.get('category') as string;

        const files = formData.getAll('images');
        const savedImagePaths: { image_name: string }[] = [];

        for (const file of files) {
            if (typeof file === 'object' && 'arrayBuffer' in file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
                const mimeType = file.type;

                const imageUrl = await uploadToAzureBlob(buffer, fileName, mimeType);

                savedImagePaths.push({
                    image_name: imageUrl,
                });
            }
        }

        const newProject = await prisma.project.create({
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                budget: budget ? parseFloat(budget) : undefined,
                status: status as any, // ideally cast to enum
                description,
                category: category as any, // ideally cast to enum
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(newProject);
    } catch (error) {
        console.error('Project FormData POST error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
/*export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string | null;
        const start_date = formData.get('start_date') as string | null;
        const end_date = formData.get('end_date') as string | null;
        const budget = formData.get('budget') as string | null;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string | null;
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

                savedImagePaths.push({
                    image_name: `/assets/projectImages/${fileName}`,
                });
            }
        }

        const newProject = await prisma.project.create({
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                budget: budget ? parseFloat(budget) : undefined,
                status: status as any, // Or import and cast to ProjectStatus if needed
                description,
                category: category as any, // Or import and cast to Category enum
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(newProject);
    } catch (error) {
        console.error('Project FormData POST error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}*/

// GET - Fetch Projects
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category')?.trim();

    try {
        const projects = await prisma.project.findMany({
            where: category
                ? {
                    category: category as any,
                }
                : undefined,
            include: {
                images: true,
            },
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error('GET projects error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
