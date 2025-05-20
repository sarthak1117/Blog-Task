import mongoose from "mongoose";
import express from "express";
import dotenv from"dotenv";
import cors from "cors";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors());
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