


import React from "react";
import api from "../../axiosInstance/api";

const ChangePassword = () => {

let userId=0;
let token=1;

    const handleVarifyPassword=async()=>{
        const response=await api.post(`/verifyforgotpassword/${userId}/${token}`)

        console.log(response);
        
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between ">
      <header className="w-full bg-black text-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">NETFLIX</h1>
          <div className="rounded-full bg-blue-500 p-2">
            <span className="text-white">😊</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex justify-evenly items-center w-full    ">
        <div className="bg-white w-full max-w-md p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Change password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Protect your account with a unique password at least 6 characters long.
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Current Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-gray-300 rounded-md border border-10  p-2 shadow-sm"
                value="aslah.c77@gmail.com"
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New password (6-60 characters)
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full border-gray-300 rounded-md border border-10 p-2 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter new password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full border-gray-300 rounded-md p-2 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 border-gray-300 rounded"
                />
                Sign out of all devices
              </label>
            </div>

            <div className="flex space-x-4">
              <button
              onClick={handleVarifyPassword}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <main className=" w-96 h-96">
   
               </main>
      </main>


      
    </div>
  );
};

export default ChangePassword;

