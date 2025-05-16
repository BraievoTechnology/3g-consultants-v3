
import { NextRequest, NextResponse  } from 'next/server';
import { PrismaClient  } from '@prisma/client';
import {uploadToAzureBlob} from "@/app/api/util/blobService";

const prisma = new PrismaClient();

function extractIdFromUrl(req: NextRequest): number | null {
    const idStr = req.nextUrl.pathname.split('/').pop();
    return idStr ? Number(idStr) : null;
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
        where: { id: Number(id) },
    });

    if (!event) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(event);
}

/*export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });

    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const event_type = formData.get('event_type') as string;
        const date = formData.get('date') as string;
        const start_time = formData.get('start_time') as string;
        const end_time = formData.get('end_time') as string;
        const location = formData.get('location') as string;
        const capacity = parseInt(formData.get('capacity') as string);
        const status = (formData.get('status') as string) || 'active';
        const description = formData.get('description') as string;

        const images = formData.getAll('images') as File[];
        const savedImagePaths: { image_name: string }[] = [];

        if (images.length > 0 && images[0].size > 0) {
            for (const image of images) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = `${Date.now()}-${image.name}`;
                const filePath = path.join(process.cwd(), 'public/assets/projectImages', fileName);

                await writeFile(filePath, buffer);

                savedImagePaths.push({ image_name: `/assets/projectImages/${fileName}` });
            }

            await prisma.eventImages.deleteMany({ where: { eventId: id } });

            await prisma.eventImages.createMany({
                data: savedImagePaths.map((img) => ({
                    eventId: id,
                    image_name: img.image_name,
                })),
            });
        }

        await prisma.event.update({
            where: { id },
            data: {
                title,
                event_type,
                date: date ? new Date(date) : null,
                start_time: start_time ? new Date(start_time) : null,
                end_time: end_time ? new Date(end_time) : null,
                location,
                capacity,
                status,
                description,
            },
        });

        const eventWithImages = await prisma.event.findUnique({
            where: { id },
            include: { images: true },
        });

        return NextResponse.json(eventWithImages);
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}*/



export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });

    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const event_type = formData.get('event_type') as string;
        const date = formData.get('date') as string;
        const start_time = formData.get('start_time') as string;
        const end_time = formData.get('end_time') as string;
        const location = formData.get('location') as string;
        const capacity = parseInt(formData.get('capacity') as string);
        const status = (formData.get('status') as string) || 'active';
        const description = formData.get('description') as string;

        const images = formData.getAll('images') as File[];
        const savedImagePaths: { image_name: string }[] = [];

        if (images.length > 0 && images[0].size > 0) {
            for (const image of images) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = `${Date.now()}-${image.name}`;
                const mimeType = image.type;

                // Upload to Azure Blob
                const blobUrl = await uploadToAzureBlob(buffer, fileName, mimeType);

                savedImagePaths.push({ image_name: blobUrl });
            }

            // Delete previous images for this event
            await prisma.eventImages.deleteMany({ where: { eventId: id } });

            // Save new image URLs to the database
            await prisma.eventImages.createMany({
                data: savedImagePaths.map((img) => ({
                    eventId: id,
                    image_name: img.image_name,
                })),
            });
        }

        // Update the event details
        await prisma.event.update({
            where: { id },
            data: {
                title,
                event_type,
                date: date ? new Date(date) : null,
                start_time: start_time ? new Date(start_time) : null,
                end_time: end_time ? new Date(end_time) : null,
                location,
                capacity,
                status,
                description,
            },
        });

        const eventWithImages = await prisma.event.findUnique({
            where: { id },
            include: { images: true },
        });

        return NextResponse.json(eventWithImages);
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ message: 'Event deleted successfully' });
}