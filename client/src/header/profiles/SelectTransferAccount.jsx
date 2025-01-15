import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import api from "../../axiosInstance/api";


const SelectTransferAccount = () => {
    const navigate=useNavigate()
       const [selectedProfile,setSelectedProfile]=useState("")
       const [trasfetOption,setTransferOption]=useState("")
       console.log("trasfetOption",trasfetOption);
       
  const { profileid } = useParams();
      const findProfile=async()=>{
        const response=await api.get(`/fidPprofilebyid/${profileid}`)
        console.log("responseddddddddddddddddd",response.data.pro);
        setSelectedProfile(response.data.pro)
      }
      useEffect(()=>{
        findProfile()
      },[profileid])

      const onSelect=(e)=>{
        setTransferOption(e.target.value)
      }
  const  handleSelectPassingAccound=()=>{
         if(trasfetOption==="existingAccount"){
            navigate(`/selectreservedaccount/${profileid}`)
         }else{
            navigate(`/confirmtransfer/${profileid}`)
         }
  }

  return (
    <div className="max-w-lg py-40 mx-auto mt-10 p-6 bg-white h-full rounded-lg shadow-md">
    <div className=" md:flex items-center justify-evenly">
    <div>
      <img
        src={selectedProfile?.image }
        alt="Profile"
        className="w-32 h-32 mx-auto  object-cover  mb-6"
      /></div>

     <div className="  flex justify-center "> <h1 className=""> {selectedProfile?.name}</h1></div>
    </div>
      <h1 className="text-4xl font-bold text-center mb-6">Transfer Account</h1>

      {/* New Account Option */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="radio"
          name="transferOption"
          value="newAccount" 
          className="w-5 h-5 accent-red-600"
          onChange={onSelect}
        />
        <CgProfile className="text-2xl text-gray-600" />
        <p className="text-xl font-medium">+ A new account</p>
      </div>
      <p className="text-lg text-gray-500 mb-6">
        Transfer this profile and purchase a new Netflix membership.
      </p>

      {/* Existing Account Option */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="radio"
          name="transferOption"
          className="w-5 h-5 accent-red-600"
        
          value="existingAccount"
          onChange={onSelect}
        />
        <ImUsers className="text-2xl text-gray-600" />
        <p className="text-xl font-medium">An Existing account</p>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Transfer this profile to an existing Netflix account. Please note: You
        will need the email and password to complete the transfer.
      </p>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
        onClick={()=>navigate(`/profilesettings/${profileid}`)}
        className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button 
        onClick={handleSelectPassingAccound}
        className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectTransferAccount;
