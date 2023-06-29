import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/**REGISTER USER */

export const register = async(req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            image,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            image,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random( )* 10000),
            impressions: Math.floor(Math.random( )* 10000)
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

/**LOGIN */

export const login = async(req,res) => {
    try {
       
        const user = await User.findOne({email:req.body.email})

        if(!user) {
            return res.status(400).json({msg: "user does not exist"})
        }

        const isFind = await bcrypt.compare(req.body.password,user.password);
        if(!isFind) return res.status(400).json({msg: "invalid credentials"});

        const {password,...others} = user._doc;
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        

        res.status(200).json({token,others})
    } catch (err) {
        res.status(500).json({error: err.message})
        
    }
}