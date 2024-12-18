const mongoose=require("mongoose")


const myListSchema=mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"Users"},
    movies:[]
})

module.exports=mongoose.model("Mylist",myListSchema)