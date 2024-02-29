// import { PrismaClient ,Prisma} from '@prisma/client'


// const prisma = new PrismaClient()

// // const userEmail = Prisma.validator(
// //     prisma,
// //     'user',
// //     'findUnique',
// //     'select'
// //   )({
// //     email: true,
// //   }) 

// export const signIn = async(req,res) =>{

//     try {
//         let User = await prisma.user.findOne({ email: req.body.email });
//         if(User){
//             let success = false
//             return res.status(400).json({success, error: "This email already exist" });
//         }
        
//     } catch (error) {
        
//     }
//     async function main() {
//         // ... you will write your Prisma Client queries here
//         await prisma.user.create({
//             data: {
//                 name: "Kartik shettar",
//                 email: "example@example.com",
//                 password: "password@123"
//             }
//         })
//         const allUsers = await prisma.user.findMany();
//         console.dir(allUsers, { depth: null })
//     }
    
//     main()
//         .catch(async (e) => {
//             console.error(e)
//             process.exit(1)
//         })
//         .finally(async () => {
//             await prisma.$disconnect()
//         })
    
// }

