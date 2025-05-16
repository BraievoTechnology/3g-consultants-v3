import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

function extractIdFromUrl(req: NextRequest): number | null {
    const idStr = req.nextUrl.pathname.split('/').pop();
    return idStr ? Number(idStr) : null;
}

// GET job application by ID
export async function GET(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    const application = await prisma.jobApplications.findUnique({
        where: { id },
        include: { skills: true }
    });

    if (!application) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(application);
}

// PUT update job application by ID
export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    try {
        const {
            name,
            email,
            contact,
            experience,
            expected_salary,
            cv_name,
            cover_letter
        } = await req.json();

        const updated = await prisma.jobApplications.update({
            where: { id },
            data: {
                name,
                email,
                contact,
                experience,
                expected_salary,
                cv_name,
                cover_letter
            }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }
}

// DELETE job application by ID
export async function DELETE(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    try {
        await prisma.jobApplications.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Job application deleted successfully' });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }
}
