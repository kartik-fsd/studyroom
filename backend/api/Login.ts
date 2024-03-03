import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config as configDotenv } from 'dotenv';

interface AuthTokenPayload {
    loginUser: { id?: string };
}

const prisma = new PrismaClient();
configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const Login = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const loginUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!loginUser) {
            return res.status(400).json({ success: false, error: 'This email is not registered' });
        }

        const checkPassword = await bcrypt.compare(password, loginUser?.password || '');

        if (!checkPassword) {
            return res.status(400).json({ success: false, error: 'Please try to login with correct credentials' });
        }

        const tokenData: AuthTokenPayload = { loginUser: { id: loginUser.id?.toString() } };
        const authToken: string = jwt.sign(tokenData, JWT_SECRET_KEY);

        return res.json({ success: true, authToken });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
