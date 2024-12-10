const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")

router.post("/signup",auth.signup)
router.post("/login",auth.login)
router.post("/logout",auth.logOut)
router.post("/checkignemail",auth.checkingEmail)
router.post('/create-payment-intent',auth.createPaymentIntent);
router.post('/verifypremium/:sessionId',auth.verifyPremium);



// router.post("/subscription",auth.subscription)
module.exports=router
