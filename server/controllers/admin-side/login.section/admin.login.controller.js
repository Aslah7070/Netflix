const User=require("../../../models/user.models");
const { message } = require("../../../validations/signupValidation");
const bcrypt=require("bcrypt")
const {generateTokenAndCookies}=require("../../../utils/generateAdminToken")
const CustomError=require("../../../utils/customErrorHandling")
const adminLogin=async(req,res,next)=>{
    const {formData}= req.body;
    const { email, password }=formData
   
    if (!email || !password) {
        console.log("email",email);
        console.log("password",password);
        
        return next(new CustomError("all field are required",400))

    }
    const admin = await User.findOne({ email: email })
    if (!admin) {
        res.status(404).json({ success: false, message:` no registration with ${email} . please sign-up` })
    }
    if(admin.role!=="admin"){
        return res.status(400).json({success:true,message:"admin aunautherised"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password)
    console.log("dfa",isPasswordCorrect);

    if (!isPasswordCorrect) {
       return res.status(404).json({ success: "falsePassword", message:`Incorrect password for ${email}
         You can use a sign-in code, reset your password or try again.` })
    }

   
    res.cookie("admin", admin, { 
        httpOnly: false,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
    });

    generateTokenAndCookies(admin._id, res)


    res.status(201).json({
        success: true, message: " admin Sign-up successful!", uset: {
            ...admin._doc,
            password: ""
        }
    });
}

const adminLogOut=async(req,res)=>{
    res.clearCookie('admin', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });
    res.clearCookie("adminToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ success: true, message: "admin Loggout successfully" })
}



module.exports={adminLogin,adminLogOut}