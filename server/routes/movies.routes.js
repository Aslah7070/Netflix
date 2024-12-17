const express=require("express");

const router=express.Router()
const moveies=require("../controllers/admin-side/premium");

router.get("/fetchmovies",moveies.fetchMovies)
router.post("/videoUploading",moveies.videoUploading);
router.get("/moviefetchedbyid/:id",moveies.fetchMovieIdBased);
router.get("/stream/:id",moveies.streamVideo)

module.exports=router