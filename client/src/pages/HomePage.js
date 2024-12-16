import React, { useState, useRef, useEffect, } from "react";
import netflixLogo from "../assets/netflix-logo.png";
import homeBackgroundImage from "../assets/netflixHomeimage.jpg";
import lucky from "../assets/stranger-things-lg.png";
import stranger from "../assets/stranger-things-sm.png";

import heart from "../assets/heart.webp";
import icon from "../assets/iconn.jpg";
import laptopp from "../assets/laptopp.webp";
import telescope from "../assets/telescope.png";

import "../style/HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLoginStatus } from "../redux/slice";
import api from "../axiosInstance/api";
import { FaPlus } from "react-icons/fa6";
import TrendingNow from "./TrendingNow";
import axios from "axios";


const HomePage = () => {
  const [show, setShow] = useState("")


  const FAQ = [
    {
      id: 1,
      title: "What is Netflix?",
      body: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more - on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!`
    },
    {
      id: 2,
      title: "How much does Netflix cost?",
      body: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.`
    },
    {
      id: 3,
      title: "Where can I watch?",
      body: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

  You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`
    },
    {
      id: 4,
      title: "How do I cancel?",
      body: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`
    },
    {
      id: 5,
      title: "What can I watch on Netflix?",
      body: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`
    },
    {
      id: 6,
      title: "Is Netflix good for kids?",
      body: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\n  

  Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`
    },

  ]

  const handleAccorrdian = (data) => {
    if (data.id !== show.id) {
      setShow(data)
      console.log("data", data);

    } else {
      setShow("")
      console.log("noop");
    }

  }



  const user = useSelector((state) => state.user.isLoggedIn)
  console.log("user", user);

  const dispatch = useDispatch()
  const emailRef = useRef()
  const submitt = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    const display = async () => {
      try {
        const response = await api.post("/checkignemail", { email: emailValue })
        console.log("checkignemail", response.data.success);
        if (response.data.success) {
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

  const handletmdb=async()=>{
   const responce=await axios.get("https://api.themoviedb.org/3/watch/providers/movie?api_key=5ae26a19a68042a00dd9534dc8b4ab03")
   console.log("res",responce);
   
  }

  const navigate = useNavigate()
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

  const handleLogout = () => {
    const display = async () => {
      const response = await api.post("/logout")
      console.log(response);

      dispatch(setLoginStatus(false))
    }
    display()
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div className="bg-black text-white min-h-screen ">

      <section className="bg-black relative w-full h-full border pt-5 border-5">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20   mt-5 rounded-3xl w-full h-full z-10"
          style={{ backgroundImage: `url(${homeBackgroundImage})` }}
        >

        </div>


        <header className="flex justify-evenly items-center    z-20 bg-black bg-opacity-20 relative">
          <img className="w-40" src={netflixLogo} alt="Netflix Logo" />
          <div className="w-3/6  bg-green-500 "></div>
          <div className="flex items-center space-x-4">
            <select
              className="bg-gray-950 h-8 w-28 text-white px-1 py-1 rounded-xl border border-gray-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white h-8 w-24 text-black px-3 py-1 rounded-xl hover:bg-red-700 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-red-700 h-8 w-20 text-white px-3 py-1 rounded-xl hover:bg-red-800 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

        </header>

        <div className="relative flex flex-col items-center justify-center text-center py-48 px-4 z-10">
  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white xl:text-center">
    Unlimited movies, TV <br /> shows and more
  </h1>
  <p className="mt-6 mb-5 text-lg xl:text-xl lg:text-xl text-gray-300 xl:text-center">
    Starts at <span className="font-semibold">₹149</span>. Cancel anytime.
  </p>
  <div className="flex flex-col items-center w-full text-white bg-transparent">
    <p className="xl:text-center">
      Ready to watch? Enter your email to create or restart your membership
    </p>
    <form
      className="flex flex-col sm:flex-row items-center justify-center w-full gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      {user ? (
        <button
          onClick={() => navigate("/premiumslice")}
          type="button"
          className="w-60 h-14 mt-3 text-white px-6 py-3 bg-green-700 font-bold hover:bg-green-700"
        >
          Finish Sign Up
        </button>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 md:w-80 p-3 h-14 bg-transparent text-white-800 border-2 border-gray-400"
            ref={emailRef}
          />
          <button
            type="button"
            onClick={submitt}
            className="w-full sm:w-48 h-14 text-2xl bg-red-700 text-white px-6 py-3 font-bold hover:bg-red-700"
          >
            Get Started
          </button>
        </>
      )}
    </form>
  </div>
</div>




        <div></div>


      </section>


      <section className="py-8  md:px-32 px-8">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>


        <TrendingNow />

      </section>


      <div className="w-full flex flex-col items-start  md:px-32 px-8 py-4">
  <h1 className="text-xl font-bold mb-4">More reasons to join</h1>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950 w-full h-56 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
      <div className="h-36">
        <p className="mb-3 text-2xl">Enjoy on your TV</p>
        <span className="text-white text-sm font-semibold text-start">
          Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
        </span>
      </div>
      <img src={heart} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>

    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950 w-full h-56 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
      <div className="">
        <p className="mb-3 text-2xl">Download your shows to watch offline</p>
        <span className="text-white text-sm font-semibold text-start">
          Save your favourites easily and always have something to watch.
        </span>
      </div>
      <img src={telescope} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>

    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950 w-full h-56 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
      <div className="">
        <p className="mb-3 text-2xl">Watch everywhere</p>
        <span className="text-white text-sm font-semibold text-start">
          Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
        </span>
      </div>
      <img src={laptopp} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>

    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950 w-full h-56 rounded-3xl flex flex-col items-center justify-between text-center px-4 py-4">
      <div className="">
        <p className="mb-3 text-2xl">Create profiles for kids</p>
        <span className="text-white text-sm font-semibold text-start">
          Send kids on adventures with their favourite characters in a space made just for them — free with your membership.
        </span>
      </div>
      <img src={icon} alt="Heart Icon" className="w-20 h-20 flex ms-auto" />
    </div>
  </div>
</div>



<div className="w-full px-8 lg:px-32">
  <h1 className="text-xl font-bold mb-4">Frequently Asked Questions</h1>
  {FAQ &&
    FAQ.map((val, index) => (
      <div key={index} className="w-full">
        <div
          onClick={() => handleAccorrdian(val)}
          className="bg-gray-800 text-2xl h-20 mt-3 w-full flex justify-between px-5 items-center cursor-pointer"
        >
          <p>{val.title}</p>
          <FaPlus />
        </div>

        {/* Only display answer when it's selected */}
        {show.id === val.id && (
          <div className="bg-gray-700 mt-2 text-xl px-5 py-3">
            {/* Render the body with line breaks */}
            {val.body.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        )}
      </div>
    ))}
</div>

<button onClick={handletmdb}>tmdb</button>

    </div>

  );
};

export default HomePage;
