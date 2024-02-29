// import { PrismaClient } from '@prisma/client'
import express from "express"


const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log("Server is running on port ", PORT) })

// const prisma = new PrismaClient()

// async function main() {
//     // ... you will write your Prisma Client queries here
//     await prisma.user.create({
//         data: {
//             name: "Kartik shettar",
//             email: "example@example.com",
//             password: "password@123"
//         }
//     })
//     const allUsers = await prisma.user.findMany();
//     console.dir(allUsers, { depth: null })
// }

// main()
//     .catch(async (e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
