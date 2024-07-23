import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existedUser = await UserModel.findOne({ email });
        if(existedUser) {
            if(existedUser.emailVerified) {
                return res.status(200).json({message: "User already exists"});
            }
            else {
                return res.status(200).json({message: "Verify your Email to access account"});
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '2d'})
        const user = await UserModel.create({
            name, email, password: hashedPassword, verifyToken: token,
        })
        if(user) {
            return res.status(201).json({message: "User created successfully"});
        }

        return res.status(200).json({message: "User registration failed"});
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existedUser = await UserModel.findOne({ email });
        if(!existedUser) {
            return res.status(200).json({message: "User not found"});
        }

        const passwordMatch = await bcrypt.compare(password, existedUser.password);
        if(passwordMatch) {
            const payload = {
                _id: existedUser._id,
                name: existedUser.name,
                email: existedUser.email,
                image: existedUser.image,
                emailVerified: existedUser.emailVerified,
                role: existedUser.role,
                verifyToken: existedUser.verifyToken,
                verifyTokenExpiry: existedUser.verifyTokenExpiry,
                forgotPasswordToken: existedUser?.forgotPasswordToken || "",
                forgotPasswordTokenExpiry: existedUser.verifyTokenExpiry,
            }
            const token = jwt.sign({user: payload}, process.env.JWT_SECRET, {expiresIn: '2d'});

            return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                domain: "vercel.app",
                path: '/'
            })
            .status(201).json({message: "Logged in successfully", user: payload, token});
        }

        return res.status(200).json({message: "Authentication failed"});
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
}

export const logoutUser = async (req, res) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀", user: {}});
}

export const updateProfileImage = async (req, res) => {
    try {
        const { id, image } = req.body;
        const user = await UserModel.findByIdAndUpdate(id, {
            $set: { image: image }
        })
    
        if(user) {
            return res.status(202).json({message: "Image updated successfully"});
        }
        return res.status(200).json({message: "Image updation failed"});
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
}