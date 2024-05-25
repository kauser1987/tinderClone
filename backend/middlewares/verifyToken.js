// import {jwt} from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
const verifyToken =async (req,res,next)=>{
    const headers = req.headers["authorization"];
    console.log("headers from authorization", headers)
    const token = headers && headers.split(" ")[1];
    if(!token){
        return res.status(401).json({success:false,message:"Access Denied"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.id = decoded.id;
        next();
    } catch (error) {
       return res.status(500).json({success:false,message:error.message})
    }

}
module.exports = {verifyToken}