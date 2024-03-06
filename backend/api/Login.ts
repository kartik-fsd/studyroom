import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const GoogleLogin = async (req: Request, res: Response) => {
    const { googleId } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { googleId },
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // User found, generate JWT token
        const tokenData = { userData: { id: user.id?.toString() } };
        const authToken = jwt.sign(tokenData, JWT_SECRET_KEY);

        // Save the token as a cookie
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
            // Other optional configurations...
        });

        return res.status(200).json({ success: true, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
};
