const express=require("express");

const router=express.Router()
const moveies=require("../controllers/admin-side/premium");
const list=require("../controllers/user-side/myList.controller")
const userMovei=require("../controllers/user-side/Moviel.controller")

router.get("/fetchmovies",moveies.fetchMovies)
router.post("/videoUploading",moveies.videoUploading);
router.get("/moviefetchedbyid/:id",moveies.fetchMovieIdBased);
router.get("/stream/:id",moveies.streamVideo)
router.post("/addtoList",list.addToProfileMyList)
router.post("/findvideo/:movieId",moveies.findthVideo)
router.get("/moviedetails/:movieId",userMovei.movieDetails)

module.exports=router