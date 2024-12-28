const express= require("express")
const router= express.Router()
const auth=require("../controllers/auth.controller")
const premium=require("../controllers/admin-side/premium")
const upload=require("../middlewares/videoUploading")
const forgott=require("../controllers/forgottPassword")
const {tryCatch}=require("../utils/tryCatch")
const {userAuthMiddleware}=require("../middlewares/authentication")
const {premiumAuthentication}=require("../middlewares/premiumAuthentication")
const profile=require("../controllers/user-side/Profile-Setting/create-prodile")
const uploadProfileImages=require("../middlewares/profileIcon.middleware")
const profileManagement=require("../controllers/admin-side/profiles/profile-management")


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


//profile routes

router.post("/createprofile",userAuthMiddleware,tryCatch(profile.createProfile))
router.post("/currentprofile",userAuthMiddleware,tryCatch(profile.setCurrentProfile))
router.get("/getcurrentprofile",userAuthMiddleware,tryCatch(profile.getProfile))   
router.get('/getallprofiles', tryCatch(profile.getAllProfiles));
router.post('/uploadprofileicons', uploadProfileImages, profileManagement.uploadProfiles);
router.post('/updateavatar', uploadProfileImages, profileManagement.createAvatar);
router.get('/getavatar', uploadProfileImages, profileManagement.getAvatar);
router.get('/getprofileicons', tryCatch(profileManagement.getprofiles));






module.exports=router
