
const User = require("../models/user.models")
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const stripe = require('stripe')
const { v4: uuidv4 } = require('uuid');
const signUpSchema = require("../validations/signupValidation");
const { generateTokenAndCookies } = require("../utils/generateTokens");
const Subscription = require('../models/subscription.models'); 

const CustomError=require("../utils/customErrorHandling")



const otpStorage = {};


const hello=(req,res)=>{
    console.log("hello eowdn");
    res.send("dsfads")
    
}

const generateOtp = async (req, res,next) => {
        const { email } = req.body;
        if (!email) {
            // return res.status(400).json({ success: false, message: "Email is required" });
            return next(new CustomError("Email is required",400))
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No registration with ${email}. Please sign-up.`,
            });
        }
        const otp = crypto.randomInt(1000, 9999).toString(); 
        otpStorage[email] = otp; 
  console.log("111");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aslahvava9048@gmail.com',
        pass: 'ibbr jzat oyoh xetp', 
    },
    tls: {
        rejectUnauthorized: false
    }
});  
            const a = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Test Email',
                text: `Your OTP for login is: ${otp}. This code is valid for 5 minutes.`,
            });
            console.log("Email sent:", a);  

        setTimeout(() => {
            delete otpStorage[email];
        }, 5 * 60 * 1000);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });  
};


// const verifyPremium=async(req,res)=>{
//   const {email,amount}=  req.body
//     const user=await User.findOne({email:email}) 
//     console.log("userrr",user);
//     console.log(amount)
    
// const {sessionId}=req.params
// console.log("params",sessionId);


// console.log("userEmail",user);
// if (!sessionId) {
//     return res.status(404).json({ error: 'Session not found' });
// }

// console.log('Session Details:', sessionId);
// user.role = 'premium';

//         await user.save();



// res.status(200).json({ success: true, sessionId ,user:user});

       
// }



const verifyPremium = async (req, res) => {
    const { email, amount } = req.body;
    const { sessionId } = req.params;
  
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    
    if (!sessionId) {
      return res.status(404).json({ error: 'Session not found' });
    }
  
    console.log('Session Details:', sessionId);
  
    
    user.role = 'premium';
    user.premiumStartDate = new Date(); 
    await user.save();
  
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      amount: amount,
      
    };
  
    const secretKey = process.env.JWT_SECRET 
  
    const premiumToken = jwt.sign(payload, secretKey, { expiresIn: '30d' }); 

    res.cookie('premiumToken', premiumToken, {
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict', 
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      
  
    
    res.status(200).json({
      success: true,
      sessionId,
      user: {
        email: user.email,
        role: user.role,
      },
      premiumToken, 
    });
  };

const createPaymentIntent = async (req, res) => {
        const { amount,userEmail } = req.body;
     console.log("userEmail",userEmail);
     
        if (!amount) {
            throw new Error('Amount is required.'); 
        }
        const amountInINR = amount * 100;
        console.log("amountInINR", amount);

        const stripeClient = new stripe(process.env.STRIPE_KEY)
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            ui_mode: "embedded",
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Sample Product' },
                        unit_amount: amountInINR,
                    },
                    quantity: 1, 
                },
            ],

            return_url: 'http://localhost:3000/success/?session_id={CHECKOUT_SESSION_ID}'
        })
        
      
        console.log("he",session);
        
        const user = await User.findOne({ email: userEmail });
        console.log("user",user);    
        
        if (!user) {
            throw new Error('User not found');
        }

        let subscription = await Subscription.findOne({ userId: user._id });

        if (!subscription) {
            
            subscription = new Subscription({
                userId: user._id,
                plan: 'pending',
                price: amount,
                active: true,
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 
            });
        } else {
            
            subscription.plan = 'pending';
            subscription.price = amount;
            subscription.active = true;
            subscription.startDate = new Date();
            subscription.endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }

        await subscription.save();

        
      

        console.log("Updated subscription:", subscription);

     
        res.cookie('payment_session', session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, 
        });

        res.status(200).json({
            clientSecret: session.client_secret,
            url: session.url,
           
        });
   
};



const signup = async (req, res) => {
    
        console.log("Request body:", req.body);


        const { error } = signUpSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = req.body;


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }


        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use." });
        }


        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            email,
            password: hashedPassword,
            image: image,
        });


        await newUser.save();
        res.cookie("user", newUser, {
            httpOnly: false,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        generateTokenAndCookies(newUser._id, res);


        res.status(201).json({
            success: true,
            message: "Sign-up successful!",
            user: {
                ...newUser._doc,
                password: "",
            },
        });
};



const login = async (req, res,next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("adsfd");
            
            return next(new CustomError("all field are required",400))

        }
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ success: false, message:` no registration with ${email} . please sign-up` })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        console.log("dfa",isPasswordCorrect);

        if (!isPasswordCorrect) {
           return res.status(404).json({ success: "falsePassword", message:`Incorrect password for ${email}
             You can use a sign-in code, reset your password or try again.` })
        }
        res.cookie("user", user, { 
            httpOnly: false,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        generateTokenAndCookies(user._id, res)

        console.log("user.premiumStartDate!==null",user.premiumStartDate!==null);
        

        if (user.role === "premium" && user.premiumStartDate !== null) {
                    const currentDate = new Date();
                    const premiumStartDate = new Date(user.premiumStartDate);
                    
                    
                    const differenceInTime = currentDate - premiumStartDate;
                    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

            console.log("differenceInTime",differenceInTime);
            console.log("differenceInDays",differenceInDays);
            
                  
                    const premiumValidityDays = 30;
                    const remainingValidityDays = premiumValidityDays - differenceInDays;
                    console.log("remainingValidityDays",remainingValidityDays);
                    
            
                    if (remainingValidityDays > 0) {
                        const payload = {
                            userId: user._id,
                            email: user.email,
                            role: user.role,
                            remainingValidityDays,
                        };
            
                        const secretKey = process.env.JWT_SECRET;
            
                        const premiumToken = jwt.sign(payload, secretKey, {
                            expiresIn: `${remainingValidityDays}d`,
                        });
            
                        res.cookie('premiumToken', premiumToken, {
                            httpOnly: false,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            path: '/', 
                            maxAge: remainingValidityDays * 24 * 60 * 60 * 1000,
                          });
                    } else {
                        return res.status(403).json({
                            success: false,
                            message: "Your premium membership has expired. Please renew to continue enjoying premium benefits.",
                        });
                    }
                }

        res.status(201).json({
            success: true, message: "Sign-up successful!", uset: {
                ...user._doc,
                password: ""
            }
        });
}





const loginWithOtp = async (req, res) => {
  
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No registration with ${email}. Please sign-up.`,
            });
        }
             console.log("otp",otp);
             console.log("otpStorage[email]",otpStorage[email]);
             
             
        if (otpStorage[email] === otp) {
            delete otpStorage[email]; 

            generateTokenAndCookies(user._id, res);

            return res.status(200).json({
                success: true,
                message: "Login successful via OTP",
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
};

const logOut = async (req, res) => {
        res.clearCookie("jwt-netflix", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        res.clearCookie("premiumToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        res.clearCookie('user', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        res.status(200).json({ success: true, message: "Loggout successfully" })
}


const checkingEmail = async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
 

        console.log("email", email);


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "Email exists" });
        }

        res.status(404).json({ success: false, message: "Email not found" });
};




module.exports = { signup, logOut, login, checkingEmail, createPaymentIntent,verifyPremium,generateOtp,loginWithOtp,hello }
