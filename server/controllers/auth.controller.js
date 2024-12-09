
const User = require("../models/user.models")
const bcrypt = require('bcrypt');
require('dotenv').config();


const stripe = require('stripe')
const { v4: uuidv4 } = require('uuid');
const signUpSchema = require("../validations/signupValidation");
const { generateTokenAndCookies } = require("../utils/generateTokens");
const Subscription = require('../models/subscription.models'); 


const createPaymentIntent = async (req, res) => {
    try {
        const { amount,userEmail } = req.body;

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
            return_url: 'http://localhost:3000/'
        })
        
      
        
        const user = await User.findOne({ email: userEmail });
        console.log("user",user);
        
        if (!user) {
            throw new Error('User not found');
        }

        let subscription = await Subscription.findOne({ userId: user._id });

        if (!subscription) {
            
            subscription = new Subscription({
                userId: user._id,
                plan: 'premium',
                price: amount,
                active: true,
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year later
            });
        } else {
            
            subscription.plan = 'premium';
            subscription.price = amount;
            subscription.active = true;
            subscription.startDate = new Date();
            subscription.endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }

        await subscription.save();

        
        user.role = 'premium';
        await user.save();

        console.log("Updated subscription:", subscription);

     
        res.cookie('payment_session', session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({
            clientSecret: session.client_secret,
            url: session.url,
            primeUser: user, 
        });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: error.message });
    }
};



const signup = async (req, res) => {
    try {
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


    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ error: "An error occurred during sign-up." });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all field are required" })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ success: false, message })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            res.status(404).json({ success: "false", message: "password not match" })
        }
        res.cookie("user", user, {
            httpOnly: false,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        generateTokenAndCookies(user._id, res)

        res.status(201).json({
            success: true, message: "Sign-up successful!", uset: {
                ...user._doc,
                password: ""
            }
        });

    } catch (error) {
        console.log(error);

    }
}

const logOut = async (req, res) => {
    try {

        res.clearCookie("jwt-netflix", {
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
    } catch (error) {
        console.log(error);

    }
}


const checkingEmail = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while checking the email" });
    }



};


module.exports = { signup, logOut, login, checkingEmail, createPaymentIntent }
