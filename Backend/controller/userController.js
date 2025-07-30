import User from "../modal/user.js"
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export const register = async (req,res) => {
    const {name,email,password,confirmPassword,avtarurl,bio} = req.body;
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({ massage : "All Field Are Required"})
    }

    if(password !== confirmPassword){
        return res.status(400).json({ massage : "Password do not match"})
    }

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ massage : "User already exist"});
        }

        const hashPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({
            name,
            email,
            password:hashPassword,
            avtarurl,
            bio,
        });

        await newUser.save();
        res.status(201).json({ massage : "User Registerd successfully" , user : newUser})
    } catch (error) {
        res.status(500).json({ error : error.massage});
    }
};