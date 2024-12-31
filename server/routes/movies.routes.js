const express=require("express");
const {premiumAuthentication}=require("../middlewares/premiumAuthentication")

const router=express.Router()
const moveies=require("../controllers/admin-side/premium");
const list=require("../controllers/user-side/myList.controller")
const userMovei=require("../controllers/user-side/Moviel.controller")

const tvshows=require("../controllers/user-side/TvShows")
const upload=require("../middlewares/videoUploading")


router.get("/fetchmovies",moveies.fetchMovies)
router.post("/videoUploading",upload,moveies.videoUploading);
router.get("/moviefetchedbyid/:id",moveies.fetchMovieIdBased);
router.get("/stream/:id",moveies.streamVideo)
router.post("/addtoList",list.addToProfileMyList)
router.post("/findvideo/:movieId",premiumAuthentication,moveies.findthVideo)
router.post("/isvalidpremium",premiumAuthentication)
router.get("/moviedetails/:movieId",userMovei.movieDetails)
router.post("/tvshowuploading",moveies.uploadTvShow)
router.post("/tvshowseasonuploading/:id",upload,moveies.uploadEpisodes)
router.get("/search",userMovei.movieSearch)
router.get("/search",userMovei.movieSearch)
router.get("/namebasedsearch",userMovei.nameBasedSearch)
router.get("/allshows",tvshows.allTvShows)
router.post("/restrictedMovies/:id",userMovei.restrictedMovies)
router.post("/deleterestrictedmovies",userMovei.removeFromRestricted)
module.exports=router  