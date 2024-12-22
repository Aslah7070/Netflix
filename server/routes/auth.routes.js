const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")
const premium=require("../controllers/admin-side/premium")
const upload=require("../middlewares/videoUploading")
const forgott=require("../controllers/forgottPassword")
const {tryCatch}=require("../utils/tryCatch")
const {userAuthMiddleware}=require("../middlewares/authentication")
const {premiumAuthentication}=require("../middlewares/premiumAuthentication")

router.post("/signup",tryCatch(auth.signup))
router.post("/login",tryCatch(auth.login))
router.post("/logout",tryCatch(auth.logOut))
router.post("/checkignemail",tryCatch(auth.checkingEmail))
router.post('/create-payment-intent',tryCatch(auth.createPaymentIntent));
router.post('/verifypremium/:sessionId',tryCatch(auth.verifyPremium));

//otp based login
router.post("/generate-otp", tryCatch(auth.generateOtp)); 
router.post("/login-otp", tryCatch(auth.loginWithOtp)); 


//forgotpassword....
router.post("/forgorpassword",tryCatch(forgott.forgotpass))
router.post("/verifyforgotpassword/:id/:token",tryCatch(forgott.verifyForgotPassword))


router.post("/hey",userAuthMiddleware,premiumAuthentication,tryCatch(auth.hello))




// router.post("/videoUploading", upload, premium.videoUploading); 

module.exports=router
