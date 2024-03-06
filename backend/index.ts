import express from "express";
import cors from "cors";
import { GoogleRegister } from "./api/Oauth";
import router from "./api/logout";
import { GoogleLogin } from "./api/login";
import cookieParser from "cookie-parser"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.post("/gauth", GoogleRegister)
app.post("/glogin", GoogleLogin)
app.use("/user", router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
