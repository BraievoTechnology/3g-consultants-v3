import { PrismaClient, EmploymentType, JobStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Utility to extract ID from the URL
function extractIdFromUrl(req: NextRequest): number | null {
    const idStr = req.nextUrl.pathname.split('/').pop();
    return idStr ? Number(idStr) : null;
}

// GET job opportunity by ID
export async function GET(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    const job = await prisma.jobOpportunities.findUnique({
        where: { id }
    });

    if (!job) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(job);
}

// PUT update job opportunity by ID
export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    try {
        const {
            job_title,
            employment_type,
            department,
            location,
            application_deadline,
            status,
            job_description,
            requirements
        } = await req.json();

        const updatedJob = await prisma.jobOpportunities.update({
            where: { id },
            data: {
                job_title,
                employment_type: employment_type as EmploymentType,
                department,
                location,
                application_deadline: application_deadline ? new Date(application_deadline) : null,
                status: status as JobStatus,
                job_description,
                requirements
            }
        });

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Failed to update job opportunity' }, { status: 500 });
    }
}

// DELETE job opportunity by ID
export async function DELETE(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    try {
        await prisma.jobOpportunities.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Job opportunity deleted successfully' });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete job opportunity' }, { status: 500 });
    }
}
