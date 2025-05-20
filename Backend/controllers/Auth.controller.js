import { User } from "../models/Auth.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";


const registerUser = async (req, res) => {
    try {

    const {Email, Password, ProfileImage} = req.body;

    if(!Email || !Password){
        return res.status(400).json({message: "Email and password are required"})
    }

    const ExistingUser = await User.findOne({Email});

    if(ExistingUser){
       return res.status(400).json({messge: "User already exist"})
    }

    const hashedPassword = await bcrypt.hash(Password, 10);


    const profileImageFile = req.files["ProfileImage"]?.[0];

    const newUser = new User({
        Email,
        Password: hashedPassword,
        ProfileImage: profileImageFile?.filename || "",
    })

    await newUser.save()

    return res.status(201).json({user: newUser})

    }
    catch (err){
     return res.status(500).json({ message: err.message });
    }

}

const login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const Token = jwt.sign({
        id: user._id,
    },process.env.TOKEN_SECRET , { expiresIn: "15m" })


    res.status(200).json({ Token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
};

export default logoutUser;

export {registerUser, login, logoutUser}
