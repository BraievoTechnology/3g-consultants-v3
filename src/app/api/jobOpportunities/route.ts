import { PrismaClient, EmploymentType, JobStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const jobs = await prisma.jobOpportunities.findMany();
    return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
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

    const newJob = await prisma.jobOpportunities.create({
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

    return NextResponse.json(newJob);
}
