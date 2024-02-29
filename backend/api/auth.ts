// import { PrismaClient ,Prisma} from '@prisma/client'
// import jwt from "jsonwebtoken"
// import bcrypt from "bcryptjs"
// const JWT_SECTRETKEY = "studyRoom";

// const prisma = new PrismaClient()

// export const signIn = async(req,res) =>{
//     try {
//         let User = await prisma.user.findOne({ email: req.body.email });
//         if(User){
//             let success = false
//             return res.status(400).json({success, error: "This email already exist" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const secPassword = await bcrypt.hash(req.body.password, salt);

//         let userData = await prisma.user.create({
//             data:{
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: secPassword,
//             }
//         })
//         const data = {
//             user: { id: userData.id },
//           };
//           var Authtoken = jwt.sign(data, JWT_SECTRETKEY);
//           let success=true
//           res.json({success, Authtoken });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
//     // async function main() {
//     //     // ... you will write your Prisma Client queries here
//     //     await prisma.user.create({
//     //         data: {
//     //             name: "Kartik shettar",
//     //             email: "example@example.com",
//     //             password: "password@123"
//     //         }
//     //     })
//     //     const allUsers = await prisma.user.findMany();
//     //     console.dir(allUsers, { depth: null })
//     // }

//     // main()
//     //     .catch(async (e) => {
//     //         console.error(e)
//     //         process.exit(1)
//     //     })
//     //     .finally(async () => {
//     //         await prisma.$disconnect()
//     //     })

// }



import { PrismaClient, Prisma, } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

const JWT_SECRET_KEY = 'studyRoom';

const prisma = new PrismaClient();

export const Register = async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        interface User {
            id: string;
            name: string;
            email: string;
            password: string;
        }
        //let User = await prisma.user.findOne({ email: req.body.email });
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
        const tokenData = { userData: { id: userData.id.toString() } };
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

