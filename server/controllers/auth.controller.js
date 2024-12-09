
const User = require("../models/user.models")
const bcrypt = require('bcrypt');

const signUpSchema = require("../validations/signupValidation");
const { generateTokenAndCookies } = require("../utils/generateTokens");

// const signup = async (req, res) => {
//     try {
//         console.log("dh",req.body);

//         const { error } = signUpSchema.validate(req.body);
        
        
//         if (error) {
//             console.log("errorrrr");

//             return res.status(400).json({ error: error.details[0].message });
//         }

//         const { username, email, password } = req.body;


//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             res.status(400).json({ success: false, message: "Invalid email" })
//         }
//         if (password.length < 6) {
//             return res.status(400).json({ success: false, message: " password must be atleast 6 charecters" })
//         }
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email is already in use." });
//         }



//         const existingUserByEmail = await User.findOne({ email: email })
//         if (existingUserByEmail) {
//             return res.status(400).json({ success: false, message: "email is already exist." })
//         }
       

//         const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
//         const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
//         const hashedPassword = await bcrypt.hash(password, 10);

//  console.log("dsfds");
 
//         const newUser = new User({
            
//             email,
//             password: hashedPassword,
//             image: image
//         });
//         if (newUser) {
//             generateTokenAndCookies(newUser._id, res)
//             await newUser.save();
//             res.status(201).json({
//                 success: true, message: "Sign-up successful!", uset: {
//                     ...newUser._doc,
//                     password: ""
//                 }
//             });
//         }



//     } catch (error) {
//         console.log("err",error);
        
//         res.status(500).json({ error: "An error occurred during sign-up." });
//     }
// };

// const signup = async (req, res) => {
//     try {
//         console.log("Request body:", req.body);

//         // Validate input with Joi or your schema
//         const { error } = signUpSchema.validate(req.body);
//         if (error) {
//             console.log("Validation error:", error.details[0].message);
//             return res.status(400).json({ error: error.details[0].message });
//         }

//         const {  email, password } = req.body;

//         // Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ success: false, message: "Invalid email format" });
//         }

//         // Validate password length
//         if (password.length < 6) {
//             return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
//         }

//         // Check if the email already exists in the database
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email is already in use." });
//         }

//         // Randomly select a profile picture
//         const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
//         const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
            
//             email,
//             password: hashedPassword,
//             image: image,
//         });

//         // Save the new user to the database
//         await newUser.save();

//         // Generate token and set cookies
//         generateTokenAndCookies(newUser._id, res);

//         // Return success response
//         res.status(201).json({
//             success: true,
//             message: "Sign-up successful!",
//             user: {
//                 ...newUser._doc,
//                 password: "", // Don't send the password in the response
//             },
//         });

//     } catch (error) {
//         console.error("Error during sign-up:", error);
//         res.status(500).json({ error: "An error occurred during sign-up." });
//     }
// };



const signup = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // Validate input with Joi or your schema
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use." });
        }

        // Randomly select a profile picture
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            image: image,
        });

        // Save the new user to the database
        await newUser.save();
        res.cookie("user", newUser, {
            httpOnly:false,    
            secure: true,      
            maxAge: 24*60*60*1000,  
            sameSite: 'lax',   
        });
        // Generate token and set cookies
        generateTokenAndCookies(newUser._id, res);

        // Return success response
        res.status(201).json({
            success: true,
            message: "Sign-up successful!",
            user: {
                ...newUser._doc,
                password: "", // Don't send the password in the response
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
            httpOnly:false,    
            secure: true,      
            maxAge: 24*60*60*1000,  
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
        
        res.clearCookie("jwt-netflix",{
            httpOnly:true,
            secure:true,
            sameSite:"none"
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
        const  {email}  = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

       
        console.log("email",email);
        

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


module.exports = { signup, logOut, login,checkingEmail }
