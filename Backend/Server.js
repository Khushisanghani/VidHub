import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoute)
mongoose.connect(process.env.Mongodb_URL)
    .then(() => console.log("Mongodb connected"))
    .catch(err => {
        console.log("Mongodb Connection error",err)
    })

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
