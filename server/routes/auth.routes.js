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
const myList=require("../controllers/user-side/myList.controller")


router.post("/signup",tryCatch(auth.signup))
router.post("/login",tryCatch(auth.login))    
router.post("/logout",tryCatch(auth.logOut))    
router.post("/checkignemail",tryCatch(auth.checkingEmail))
router.post('/create-payment-intent',tryCatch(auth.createPaymentIntent));
router.post('/verifypremium/:sessionId',tryCatch(auth.verifyPremium));
   
router.post("/generate-otp", tryCatch(auth.generateOtp)); 
router.post("/login-otp", tryCatch(auth.loginWithOtp)); 


//forgotpassword....
router.post("/forgorpassword",tryCatch(forgott.forgotpass))
router.post("/verifyforgotpassword/:id/:token",tryCatch(forgott.verifyForgotPassword))


router.post("/hey",userAuthMiddleware,premiumAuthentication,tryCatch(auth.hello))




router.post("/createprofile",userAuthMiddleware,tryCatch(profile.createProfile))
router.post("/currentprofile",userAuthMiddleware,premiumAuthentication,tryCatch(profile.setCurrentProfile))
router.get("/getcurrentprofile",userAuthMiddleware,tryCatch(profile.getCurrentProfile))   
router.get('/getallprofiles', userAuthMiddleware,tryCatch(profile.getAllProfiles));
router.post('/transferprofile', userAuthMiddleware,tryCatch(profile.tranferprofile));
router.post('/changeprofileimage', userAuthMiddleware,premiumAuthentication,tryCatch(profile.changeProfileImge));
router.delete('/deleteprofile/:profileId', userAuthMiddleware,premiumAuthentication,tryCatch(profile.deleteProfileById));
router.post('/profileblock/:profileId', userAuthMiddleware,premiumAuthentication,tryCatch(profile.profileBlock))
router.post('/unLockprofile/:profileId', userAuthMiddleware,premiumAuthentication,tryCatch(profile.unLockProfile))
router.post('/confirmrestrictions', userAuthMiddleware,tryCatch(profile.confirmViewRestrictionsPage));
router.get('/findthaccount', userAuthMiddleware,tryCatch(profile.findthAccount));
router.post('/signup', userAuthMiddleware,tryCatch(auth.signup));
router.get('/fidPprofilebyid/:profileId', tryCatch(profile.fidProfileById));
router.post('/uploadprofileicons', uploadProfileImages, profileManagement.uploadProfiles);
router.post('/updateavatar', uploadProfileImages, profileManagement.createAvatar);
router.get('/getavatar', uploadProfileImages, profileManagement.getAvatar);
router.get('/getprofileicons', tryCatch(profileManagement.getprofiles));

//mylist----------

router.post("/addmovietoList",userAuthMiddleware,premiumAuthentication,myList.addMovieToList)
router.get("/getmoviesfromList/:profileId",userAuthMiddleware,premiumAuthentication,myList.getMoviesFromList)
router.post("/removemoviefromList",userAuthMiddleware,premiumAuthentication,myList.removeMovieFromList)






module.exports=router
