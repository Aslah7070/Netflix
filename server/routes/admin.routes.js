const express =require("express")
const admin=require("../controllers/admin-side/login.section/admin.login.controller")
const {adminAuthMiddleware}=require("../middlewares/adminAuthentication")
const adminAccounts=require("../controllers/admin-side/account")
const route=express.Router()


route
.post("/adminlogin",admin.adminLogin)
.post("/adminLogOut",admin.adminLogOut)

.get("/accounts",adminAuthMiddleware,adminAccounts.findAllAccounts)



module.exports=route