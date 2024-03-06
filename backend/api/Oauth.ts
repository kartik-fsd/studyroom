import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { config as configDotenv } from 'dotenv';
configDotenv();

// **Do not store the JWT secret key directly in your code.**
// Replace with the actual secure storage mechanism
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

const prisma = new PrismaClient();

export const GoogleRegister = async (req: Request, res: Response) => {
    const { googleId, email, name } = req.body;
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { googleId },
        });

        if (!existingUser) {
            // **Password handling is not included here for demonstration purposes. If you plan to offer form-based registration, implement secure password hashing before storing it in the database.**

            // Create new user
            const userData = await prisma.user.create({
                data: {
                    googleId: googleId,
                    name: name,
                    email: email,
                },
            });
            // Generate and return JWT token
            const tokenData = { userData: { id: userData.id?.toString() } };
            const authToken: string = jwt.sign(tokenData, JWT_SECRET_KEY);

            res.cookie('authToken', authToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // One week in milliseconds
                sameSite: 'none'
            });
            return res.status(200).json({ success: true, authToken });
        } else {
            res.status(200).json({ success: true }); // User already exists
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
};
