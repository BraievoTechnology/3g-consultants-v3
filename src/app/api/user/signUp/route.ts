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

        // Hash the password using argon2
        const hashedPassword = await argon2.hash(password);

        // Optional: check if username already exists
        const existingUser = await prisma.user.findUnique({ where: { userName } });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
        }

        const newUser = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'User created', user: { id: newUser.id, userName: newUser.userName } });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
