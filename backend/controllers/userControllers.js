const {User} = require('../db/models/userModel.js')

const getUsers = async (req,res)=>{
    try {
        const users = await User.find({});
        if(!users){
            return res.status(404).json({success:false,message:"Users not found"})
        }
        return res.status(200).json({success:true, data:users})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
const addTofav = async (req,res)=>{
    const myId = req.id;
    const {id} = req.params;
    try {
        let user = await User.findByIdAndUpdate(
            { _id:myId},
            {$push:{favourites:id}}
        )
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})    
        }
        return res.status(200).json({success:true,message:"Added to favourites"})    
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
const addTodis = async (req,res)=>{
    const myId = await req.id;
    const {id} = await req.params;
    try {
        let user = await User.findByIdAndUpdate(
            {_id:myId},
            {$push:{disliked:id}}
        )
        if(!user){
            return res.status(504).json({success:false,message:"user not found"})    
        }
        return res.status(200).json({success:true,message:"Added to disliked"})    
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
const getFromfav = async (req, res) => {
    const myId = req.id;
    try {
      let user = await User.findById({ _id: myId }).populate({
        path: "favourites",
        select: "name email profile _id",
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ success: true, data: user.favourites });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
module.exports = {getUsers, addTodis, addTofav, getFromfav}