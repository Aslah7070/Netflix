
const mongoose= require("mongoose")

const avatarSchema=new mongoose.Schema({
     

    avatar:[
       {
        image:{
            type:String,
            default:""
        }
       }
    ]
})

module.exports=mongoose.model("Avatar",avatarSchema)