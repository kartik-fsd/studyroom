import express from "express";
import { Register } from "./api/auth";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/register", Register);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
