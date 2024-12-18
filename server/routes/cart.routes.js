const express=require("express") 
const router=express.Router()
const list=require("../controllers/user-side/myList.controller")


router.post("/addtoList",list.addToProfileMyList)