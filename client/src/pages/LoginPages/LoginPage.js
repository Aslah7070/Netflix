

  import React, { useState, useEffect } from 'react';
  import loginBg from "../../assets/hero.png";
  import api from '../../axiosInstance/api';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
  import { setLoginStatus, setUserData } from '../../redux/slice';

  const LoginPage = () => {
    const emailFromRedux = useSelector((state) => state.user.email);
    const all = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleOtp=()=>{

      const display=async()=>{
        const response=await api.post("/generate-otp",{email:emailFromRedux})

        console.log("res",response);
        
      }

      display()
  navigate("/loginotp")
    }
  


    const [formData, setFormData] = useState({ email: emailFromRedux || '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [showSignInCodeButton, setShowSignInCodeButton] = useState(true); // state for showing/hiding buttons
    const [showEnterSignInCode, setShowEnterSignInCode] = useState(false); // state to toggle visibility of the "Enter sign-in code" button

    useEffect(() => {
      setFormData((prev) => ({ ...prev, email: emailFromRedux || '' }));
    }, [emailFromRedux]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const dispatch = useDispatch();

    const display = async (e) => {
      e.preventDefault(); // Prevent page reload on form submit

      try {
        const response = await api.post("/login", formData);
        console.log("loginnnn ", response.data);
        const user = response.data.uset;

        dispatch(setUserData(user));
        dispatch(setLoginStatus(true));

        navigate("/");
      } catch (error) {
        if (error.response && error.response.data.success === "falsePassword") {
          setLoginError(error.response.data.message);
        } else if (error.response && error.response.data.message) {
          setLoginError(error.response.data.message, "dfasd");
        } else {
          setLoginError("Login failed. Please check your credentials."); // Generic fallback message
        }
      }
    };

    const handleSignInCodeClick = () => {
      setShowSignInCodeButton(false); // Hide "Enter your sign-in code" button
      setShowEnterSignInCode(true); // Show the new button to go back to the sign-in code button
    };

    const handleBackToSignInCode = () => {
      setShowSignInCodeButton(true); // Show "Enter your sign-in code" button
      setShowEnterSignInCode(false); // Hide the back button
    };
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedisFocusedPassword] = useState(false);

    return (
    
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
        {/* Overlay */}
       
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="w-full max-w-sm px-8 py-8 bg-black bg-opacity-70 rounded-lg">
            <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>

            <form onSubmit={display} className="space-y-4">
              {loginError && (
                <div className="p-2 text-sm text-black bg-yellow-500 border border-red-300 rounded">
                  {loginError}
                </div>
              )}

              {/* Email */}
              <div className="relative">
              <label
          htmlFor="email"
          className={`absolute left-5 transition-all duration-200 ${
            isFocused || formData.email ? "top-2 text-gray-700" : "top-6 text-gray-500"
          }`}
        >
          Enter your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder=""
        />

              </div>

              {/* Password */}
              {!showEnterSignInCode && (
                <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-200 ${
                    isFocusedPassword||formData.password ? "top-2 text-gray-700 text-sm" : "top-5 text-gray-500"
                  }`}
                >
                  Enter your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onFocus={() => setIsFocusedisFocusedPassword(true)}
          onBlur={() => setIsFocusedisFocusedPassword(false)}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder=""
                />
              </div>
              )}

              {/* Sign In Button */}
              {!showEnterSignInCode&&(<button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign In
              </button>)}

              {/* OR Divider */}
              {!showEnterSignInCode&&(<div className="text-center my-4 text-sm text-gray-600">OR</div>)}

              {/* Sign-in Code Button */}
              {showSignInCodeButton && (
                <button
                  type="button"
                  onClick={handleSignInCodeClick}
                  className="w-full px-4 py-2 mt-2 text-white bg-gray-600 rounded-md hover:bg-red-700"
                >
                  Enter your sign-in code
                </button>
              )}

              {/* Back to Sign-in Code Button */}
              {showEnterSignInCode && (
                <button
                  type="button"
                  onClick={handleOtp}
                  className="w-full px-4 py-2 mt-10 text-white bg-red-600 rounded-md hover:bg-blue-700"
                >
                  Send sign-in code
                </button>
              )}

          {showEnterSignInCode&&(<div className="text-center my-4 text-sm text-gray-600">OR</div>)}
                {showEnterSignInCode && (
                <button
                  type="button"
                  onClick={handleBackToSignInCode}
                  className="w-full px-4 py-2 mt-10 text-white bg-gray-600 rounded-md hover:bg-blue-700"
                >
                  Use Password
                </button>
              )}

              {/* Forgot Password Link */}
              <div className="text-sm text-center mt-4">
                <a href="#" className="text-blue-500 hover:underline" onClick={()=>navigate("/sendemail")} >Forgot password?</a>
              </div>

              {/* Sign Up Option */}
              <div className="text-center mt-4 text-sm text-gray-600">
                <p>
                  New to Netflix?{' '}
                  <Link to="/" className="text-blue-500 hover:underline">
                    Sign up now
                  </Link>.
                </p>
              </div>

              {/* reCAPTCHA Disclaimer */}
              <div className="text-center mt-4 text-xs text-gray-600">
                <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more</a>.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;
