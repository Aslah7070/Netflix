const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")

router.post("/signup",auth.signup)
router.post("/login",auth.login)
router.post("/logout",auth.logOut)
router.post("/checkignemail",auth.checkingEmail)
module.exports=router
