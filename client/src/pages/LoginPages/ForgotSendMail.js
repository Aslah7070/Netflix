



import React from "react";

const ForgotSendMail = () => {
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
        />

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Email Me
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

