import express from "express";
import cors from "cors";
import { Login } from "./api/Login";
import { RegisterForm } from "./api/register";
import { GoogleRegister } from "./api/Oauth";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/signIn", Login);
app.post("/register", RegisterForm)
app.post("/gauth", GoogleRegister)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
