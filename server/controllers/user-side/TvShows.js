

const tvShow=require("../../models/TvShow.model")


const allTvShows=async(req,res)=>{
    const shows=await tvShow.find()
    if(!shows){
        return res.status(404).json({success:false,message:"not found shows"})
    }


    res.status(200).json({success:true,message:"found",shows})
}

module.exports={allTvShows}