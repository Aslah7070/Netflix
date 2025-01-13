const express =require("express")
const admin=require("../controllers/admin-side/login.section/admin.login.controller")
const {adminAuthMiddleware}=require("../middlewares/adminAuthentication")
const adminAccounts=require("../controllers/admin-side/account")
const premiums=require("../controllers/admin-side/premium")
const profile=require("../controllers/admin-side/profiles/profile-management")
const route=express.Router()


route
.post("/adminlogin",admin.adminLogin)
.post("/adminLogOut",admin.adminLogOut)

.post("/banaccount/:userId",adminAuthMiddleware,adminAccounts.banAccount)
.post("/unbanaccount/:userId",adminAuthMiddleware,adminAccounts.unbanAccount)
.get("/findaccount/:userId",adminAuthMiddleware,adminAccounts.findAccount)
.get("/accounts",adminAuthMiddleware,adminAccounts.findAllAccounts)
.get("/getallpayments",adminAuthMiddleware,premiums.getAllPayments)
.get("/getdailypayments",adminAuthMiddleware,premiums.getDailyPayments)
.get("/getmonthlypayments",adminAuthMiddleware,premiums.getMonthlyPayments)
.get("/getprofilebyuserId/:userId",adminAuthMiddleware,profile.getProfileByUserId)



module.exports=route