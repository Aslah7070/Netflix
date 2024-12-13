const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")
const premium=require("../controllers/admin-side/premium")
const upload=require("../middlewares/videoUploading")
const forgott=require("../controllers/forgottPassword")


router.post("/signup",auth.signup)
router.post("/login",auth.login)
router.post("/logout",auth.logOut)
router.post("/checkignemail",auth.checkingEmail)
router.post('/create-payment-intent',auth.createPaymentIntent);
router.post('/verifypremium/:sessionId',auth.verifyPremium);

//otp based login
router.post("/generate-otp", auth.generateOtp); 
router.post("/login-otp", auth.loginWithOtp); 


//forgotpassword....
router.post("/forgorpassword",forgott.forgotpass)
router.post("/verifyforgotpassword/:id/:token",forgott.verifyForgotPassword)





router.post("/videoUploading", upload, premium.videoUploading); 

module.exports=router
