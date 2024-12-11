import React, { useState, useRef, useEffect, } from "react";
import netflixLogo from "../assets/netflix-logo.png";
import homeBackground from "../assets/hero.png";
import homeBackgroundImage from "../assets/netflixHomeimage.jpg";
import lucky from "../assets/stranger-things-lg.png";
import stranger from "../assets/stranger-things-sm.png";

import heart from "../assets/heart.webp";

import "../style/HomePage.css"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  setEmail, setLoginStatus } from "../redux/slice";
import api from "../axiosInstance/api";
import { AiOutlineCheck } from 'react-icons/ai';
import { FaPlus } from "react-icons/fa6";


const HomePage = () => {
const [show,setShow]=useState("")


    const FAQ=[
        {
            id:1,
            title:"What is Netflix?",
            body:`Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more - on thousands of internet-connected devices.
            You can watch as much as you want, whenever you want, without a single ad – all 
            for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!`
        },
        {
            id:2,
            title:"How much does Netflix cost?",
            body:`Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.`
        },
        {
            id:3,
            title:"Where can I watch?",
            body:`Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`
        },
        {
            id:4,
            title:"How do I cancel?",
            body:`Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`
        },
        {
            id:5,
            title:"What can I watch on Netflix?",
            body:`Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`
        },
        {
            id:6,
            title:"Is Netflix good for kids?",
            body:`The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.

Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`
        },
        
    ]

    const handleAccorrdian=(data)=>{
        if(data.id!==show.id){
            setShow(data)
            console.log("data",data);
            
        }else{
            setShow("")
            console.log("noop");
        }

    }


    const plans = [
        {
          title: "Mobile",
          resolution: "480p",
          features: ["Fair video quality", "For your phone or tablet"],
          price: "149/mo",
        },
        {
          title: "Mobile",
          resolution: "720p",
          features: ["Good video quality", "For your phone, tablet, laptop, and TV"],
          price: "199/mo",
        },
        {
          title: "Mobile",
          resolution: "1080p",
          features: ["Great video quality", "For your phone, tablet, laptop, and TV"],
          price: "499/mo",
        },
        {
          title: "Mobile",
          resolution: "4K + HDR",
          features: ["Fair video quality", "Fair video quality"],
          price: "149/mo",
        },
      ];

    const user=useSelector((state)=>state.user.isLoggedIn)
    console.log("user",user);
    
    const dispatch=useDispatch()
const emailRef=useRef()
const submitt = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      alert("Please enter a valid email address.");
      return; 
    }

   const display=async()=>{
    try {
        const response=await api.post("/checkignemail",{ email: emailValue })
    console.log("checkignemail",response.data.success);
    if(response.data.success){
        console.log("logiiing");
            
            navigate("/login")
            return
    }
    } catch (error) {
       
        console.log(error);
        
    }

   }

   display()
    
  
    
    dispatch(setEmail(emailValue))
    
    navigate(`/registration`); 
  };
  
    const navigate=useNavigate()
  const [movies, setMovies] = useState([
    { id: 1, title: "Lucky Bashkar", image: lucky },
    { id: 2, title: "Sikandar Ka Muqaddar", image: stranger },
    { id: 3, title: "Devara", image: lucky },
    { id: 4, title: "Bagheera", image: stranger },
    { id: 5, title: "Spellbound", image: lucky },
    { id: 6, title: "Do Patti", image: stranger },
  ]);

  const scrollContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

 
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!isHovering && scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: 2,
          behavior: "smooth",
        });
      }
    }, 20); 

    return () => clearInterval(scrollInterval);
  }, [isHovering]);

  const handleLogout=()=>{
    const display=async()=>{
        const response=await api.post("/logout")
        console.log(response);
      
         dispatch(setLoginStatus(false))
    }
    display()
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
 
  return (
    <div className="bg-gradient-to-b from-[#391013]  to-black text-white min-h-screen ">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <img className="w-32" src={netflixLogo} alt="Netflix Logo" />
        <div className="flex items-center space-x-6">
        <select
      className="bg-transparent h-8 w-24 text-white px-3 py-1 rounded-3xl border border-white cursor-pointer"
      
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
          {
            user?(
                <button onClick={handleLogout} className="bg-white h-8 w-24 text-black px-3 py-1 rounded-3xl hover:bg-red-700 transition-all">
                Sign Out
              </button>
            ):(
<button onClick={()=>navigate("/login")} className="bg-white h-8 w-20 text-black px-3 py-1 rounded-3xl hover:bg-red-700 transition-all">
         Sign In
          </button>
            )
          }
          
        </div>
      </header>

      <div className=" flex justify-center">
      <div className="bg-black w-2/5 h-10 rounded-full p-3 flex items-center justify-evenly">
        <span>Popular Now</span>
        <span>Plans</span>
        <span>Reason to Join</span>
        <span>FAQ</span>
      </div>
      </div>

      {/* Hero Section */}
      <section className=" mt-6  relative mx-auto ms-10 me-10 border border-5 rounded-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 rounded-3xl"
          style={{ backgroundImage: `url(${homeBackgroundImage})` }}
        ></div>
        <div className="relative flex flex-col items-center justify-center text-center py-36 px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mt-24">
            Unlimited movies, TV <br /> shows and more
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Starts at <span className="font-semibold">₹149</span>. Cancel
            anytime.
          </p>
        </div>
      </section>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center  text-white bg-transparent">
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        <form
  className="mt-6 flex flex-col md:flex-row items-center gap-4"
  onSubmit={(e) => e.preventDefault()} // Prevent default form submission
>
  {user ? (
    <button onClick={()=>navigate("/premiumslice")} type="button" className="bg-green-600 w-60 h-14 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700">
      Finish Sign Up
    </button>
  ) : (
    <>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full md:w-80 p-3 h-14 bg-gray-700 rounded-full text-gray-800 border-2 border-green-600"
        ref={emailRef}
      />
      <button
        type="button" // Ensure button does not trigger form submit unless needed
        onClick={submitt}
        className="bg-red-600 w-60 h-14 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700"
      >
        Get Started
      </button>
    </>
  )}
</form>


      </div>

      {/* Trending Now Section */}
      <section className="py-8 px-32">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <div
          className="flex overflow-x-scroll gap-8 scrollbar-hide"
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Duplicate movies array to create continuous loop */}
          {[...movies, ...movies].map((movie, index) => (
  <div key={`${movie.id}-${index}`} className="min-w-[150px] relative group">
    <img
      src={movie.image}
      alt={movie.title}
      className="rounded-md w-full h-52 object-cover transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-lg"
    />
    <p className="mt-2 text-sm text-center">{movie.title}</p>
  </div>
))}


        </div>
      </section>


      <div className="w-full flex flex-col items-start px-32 py-4">
  <h1 className="text-xl font-bold mb-4">A plan to suit your needs</h1>
  <div className="flex flex-wrap justify-around gap-6 w-full">
    {plans.map((plan, index) => (
      <div
        key={index}
        className="w-72 h-56 rounded-3xl flex flex-col items-start justify-start text-left px-4 py-2 text-white bg-gradient-to-r from-blue-800 to-blue-950"
      >
        <h1 className="text-lg font-semibold mt-3">{plan.title}</h1>
        <h1 className="text-sm mt-3">{plan.resolution}</h1>
        {plan.features.map((feature, idx) => (
          <span key={idx} className="flex items-center space-x-2 mt-2">
            <AiOutlineCheck className="text-green-500" />
            <span className="text-xs">{feature}</span>
          </span>
        ))}
        <h1 className="text-xl font-bold mt-8">{plan.price}</h1>
      </div>
    ))}
  </div>
</div>




      <div className="w-full flex flex-col items-start px-32 py-4">
  <h1 className="text-xl font-bold mb-4">More reasons to join</h1>
  <div className="flex flex-wrap justify-around gap-6 w-full">
    <div className="bg-gray-900 w-72 h-36 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
    <div className=" h-24 "> <p className="text-white text-lg font-semibold text-start">Stories tailored to your taste</p> </div>
      <img src={heart} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>
    <div className="bg-gray-900 w-72 h-36 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
    <div className=""> <p className="text-white text-lg font-semibold text-start">Cancel or switch plans anytime</p> </div>
      <img src={heart} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>
    <div className="bg-gray-900 w-72 h-36 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
    <div className=""> <p className="text-white text-lg font-semibold text-start">A place just for kids</p> </div>
  <img src={heart} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
</div>

    <div className="bg-gray-900 w-72 h-36 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
     <div className=""> <p className="text-white text-lg font-semibold text-start">For your phone, tablet, laptop, and TV</p> </div>
      <img src={heart} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>
  </div>
</div>




      
      


      <div className="w-full  px-32">
      <h1>Frequently Asked Questions</h1>
       {
        FAQ&&FAQ.map((val,index)=>(
            <div>
                <div onClick={()=>handleAccorrdian(val)} className="bg-gray-600  h-16 mt-3 w-full flex justify-between px-5 items-center"><p >{val.title} </p> <FaPlus /></div>
                <div className="bg-gray-700 mt-2" ><span >{show.id===val.id&&show.body}</span></div>
            </div>
        ))
       }
      </div>


    

          



    </div>

    
  );
};

export default HomePage;
