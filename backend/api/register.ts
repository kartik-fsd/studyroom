import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { config as configDotenv } from 'dotenv';
configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

const prisma = new PrismaClient();

export const RegisterForm = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'This email already exists' });
        }

        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        // Create new user without setting googleId
        const userData = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });

        // Generate and return JWT token
        const tokenData = { userData: { id: userData.id?.toString() } };
        const authToken: string = jwt.sign(tokenData, JWT_SECRET_KEY);
        return res.status(200).json({ success: true, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Ensure Prisma client disconnection 
        await prisma.$disconnect();
    }
};
