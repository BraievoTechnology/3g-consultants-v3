import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userName, password } = body;

        if (!userName || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { userName },
        });

        // Validate user and compare password using argon2
        if (!user || !(await argon2.verify(user.password, password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const response = NextResponse.json({
            message: 'Signed in',
            user: { id: user.id, userName: user.userName }
        });

        // Set cookie
        response.cookies.set('admin-auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60,
        });

        return response;
    } catch (error) {
        console.error('Signin error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
