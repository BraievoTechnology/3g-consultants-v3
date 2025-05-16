import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [
            totalEvents,
            totalJobApplications,
            totalJobPosts,
            totalNewsFeeds,
            totalProjects
        ] = await Promise.all([
            prisma.event.count(),
            prisma.jobApplications.count(),
            prisma.jobOpportunities.count(),
            prisma.newsFeed.count(),
            prisma.project.count()
        ]);

        return NextResponse.json({
            totalEvents,
            totalJobApplications,
            totalJobPosts,
            totalNewsFeeds,
            totalProjects
        });
    } catch (error) {
        console.error('Error fetching summary data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
