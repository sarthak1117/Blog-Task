import mongoose from "mongoose";
import express from "express";
import dotenv from"dotenv";
import cors from "cors";

dotenv.config({
    path: './.env'
});

const app = express();


const allowedOrigins = {
  development: ["http://localhost:5173"],
  production: ["https://blog-task-rho.vercel.app"],
};

app.use(cors({
  origin: (origin, callback) => {
    console.log("CORS request from:", origin); 
    const currentEnv = process.env.NODE_ENV || "development";
    const isAllowed = allowedOrigins[currentEnv].includes(origin);

    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.static("public"));

import authRoutes from "../Backend/routes/Auth.route.js"
import blogRoutes from "../Backend/routes/Blog.route.js"

app.use("/api/auth", authRoutes);   
app.use("/api/Blog", blogRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(process.env.PORT || 5000, () => 
    console.log(`Server running on PORT ${process.env.PORT || 5000}`))
})
.catch((err) => console.error(err));