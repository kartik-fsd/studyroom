import { PrismaClient, } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { config as configDotenv } from 'dotenv';
configDotenv()

console.log(process.env.JWT_SECRET_KEY, "KEY")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

const prisma = new PrismaClient();

export const Register = async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        interface User {
            id?: string | undefined;
            name: string;
            email: string;
            password: string;
        }
        const existingUser: User | null = await prisma.user.findUnique({
            where: { email: req.body.email },
        });

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'This email already exists' });
        }

        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const userData: User = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        // Generate and return JWT token
        const tokenData = { userData: { id: userData.id?.toString() } };
        const authToken: string = jwt.sign(tokenData, JWT_SECRET_KEY);
        return res.json({ success: true, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Ensure Prisma client disconnection (optional)
        await prisma.$disconnect();
    }
};

