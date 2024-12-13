import React, { useState } from "react";
import api from "../../axiosInstance/api";
import crossicon from "../../assets/crossImage.png"

const ForgotSendMail = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // For success feedback
    const [isLoading, setIsLoading] = useState(false); // For loading state
    
    const handlesendmail = async () => {
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success messages
        setIsLoading(true); // Start loading

        console.log("user",email);
        

        try {
            const response = await api.post("/forgorpassword", { email });
            console.log(response);
            setSuccess("An email has been sent to reset your password."); // Show success message
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Check error response status and message
                if (error.response.status === 404 && error.response.data.message === "not found the user") {
                    setError("No account found for this email address.");
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            } else {
                setError("Network error. Please check your internet connection.");
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            {/* Netflix Logo */}
            <div className="absolute top-6 left-6 text-4xl font-bold text-red-600">
                NETFLIX
            </div>

            {/* Sign In link */}
            <div className="absolute top-6 right-6 text-red-500 hover:underline cursor-pointer">
                Sign In
            </div>

            {/* Reset Password Form */}
            <div className="bg-white text-black w-96 p-8 rounded-md shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Update password, email or phone</h1>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-2 flex bg-yellow-400 text-white text-sm  border  rounded">
                       <img className="w-6 h-6 me-3 bg-yellow-400" src={crossicon } alt="" /> {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-2 text-green-600 bg-green-100 border border-green-400 rounded">
                        {success}
                    </div>
                )}

                <p className="text-sm mb-4">
                    How would you like to reset your password?
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="resetOption"
                            value="email"
                            defaultChecked
                            className="mr-2"
                        />
                        Email
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="resetOption"
                            value="sms"
                            className="mr-2"
                        />
                        Text Message (SMS)
                    </label>
                </div>

                <p className="text-sm mb-2">
                    We will send you an email with instructions on how to reset your password.
                </p>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-2 border rounded-md mb-4"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(""); // Clear errors when the user types
                    }}
                />

                {/* Submit Button */}
                <button
                    onClick={handlesendmail}
                    className={`w-full py-2 rounded-md ${
                        isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Email Me"}
                </button>

                {/* Forgot Email/Phone Link */}
                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        I can't remember my email address or phone number.
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-gray-400 text-xs">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </div>
        </div>
    );
};

export default ForgotSendMail;
