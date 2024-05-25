const {User} = require('../db/models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req,res)=>{
    const {name, email, password, profile, publicId} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({success:false,message:"please login"});
        }
       // const gensalt = await bcrypt.gensalt(10)
        const newpswd = await bcrypt.hash(password, 10) 
        user = await User.create({
            name,
            email,
            password:newpswd,
            profile,
            publicId
        });
        await user.save();
        return res.status(201).json({success:true,message:"SignUp successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const login = async (req,res)=>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user) {return res.status(400).json({success:false,message:"please signup"}) }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({success:false,message:"invalid credentials"})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
        return res.status(200).json({success:true,message:"login successfull",
         token, 
         data:{
            id:user._id,
            name:user.name,
            email:user.email,
            profile:user.profile,
            favourites:user.favourites,
            disliked:user.disliked,
         },

        })

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }

}

const checkAuth =async (req,res)=>{
    const reqId = req.id;
try {
    const user = await User.findById(reqId).select("-password");
    if(!user)
        {
            return res.status(400).json({success:false,message:"user not found"})
        }
        return res.status(200).json({success:true,data:user})
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}
module.exports = {signup, login, checkAuth}