const mongoose=require("mongoose")

const restrictedSchema=new mongoose.Schema({
    movie:{type:String ,require:true}
})

module.exports=mongoose.model("Restricted",restrictedSchema)    