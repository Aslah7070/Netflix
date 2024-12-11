const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")
const premium=require("../controllers/admin-side/premium")
const upload=require("../middlewares/videoUploading")
router.post("/signup",auth.signup)
router.post("/login",auth.login)
router.post("/logout",auth.logOut)
router.post("/checkignemail",auth.checkingEmail)
router.post('/create-payment-intent',auth.createPaymentIntent);
router.post('/verifypremium/:sessionId',auth.verifyPremium);

// router.post("/videoUploading",uploadVideo.single('video'),premium.videoUploading)

router.post("/videoUploading", upload, premium.videoUploading); // for up to 10 files

module.exports=router
