const mongoose = require('mongoose')
const connectDb = async ()=>{
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if(connection.STATES.connected) console.log("database connected")
    if(connection.STATES.disconnected)
        {
            console.log("database disconnected")
            return;
        }
    
}
module.exports = {connectDb}