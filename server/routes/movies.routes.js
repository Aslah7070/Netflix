const express=require("express");

const router=express.Router()
const moveies=require("../controllers/admin-side/premium");
const { tryCatch } = require("../utils/tryCatch");



router.get("/fetchmovies",moveies.fetchMovies)

module.exports=router