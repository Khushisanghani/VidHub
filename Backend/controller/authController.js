import User from "../modal/user.js"
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const register = async (req, res) => {
    const { name, email, password, confirmPassword, avtarurl = '', bio = '' } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            avtarurl, 
            bio,      
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
};

// Login

export const Login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message : "Invalid Email or Password"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ message : "Invalid Email or Password"});
        }
        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'365d'});

        res.json({
            message:"Login Sucessful",
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                avtarurl:user.avtarurl,
                bio:user.bio,
                createdAt:user.createdAt,
            }
        })
    } catch (error) {
        console.log("Login Error",error);
        res.status(500).json({msg:"server error"});
    }
}