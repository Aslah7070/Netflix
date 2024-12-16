import React, { useState } from "react";

const ShowHidePassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <label>Password:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={showPassword ? "text" : "password"} // Toggle input type
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            marginLeft: "10px",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          {showPassword ? "Hide" : "Show"} {/* Button label changes */}
        </button>
      </div>
    </div>
  );
};

export default ShowHidePassword;
