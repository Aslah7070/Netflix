import React, { useState } from 'react'
import ReactSlider from 'react-slider';
const ViewRestrictions = () => {

    const [rating, setRating] = useState(3); // Default rating value

    const ratings = ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', 'A'];
  
    const handleSliderChange = (value) => {
      setRating(value);
    };
  return (
    <div className='w-full h-screen bg-gray-200 flex flex-col items-center '>
    <div className=' w-3/5 h-5/6 space-y-20'>
    <div className='flex py-5 justify-between'> 
     <h1 className='text-5xl '>Viewing Restrictions</h1>
     <img className='w-14' src="" alt="hello" />
     </div>
     <p className='text-3xl'>Profile Maturity Rating for {}</p>
     <p className='text-2xl'>Show titles of all maturity ratings for this profile.</p>

     <div className="w-full max-w-xl ">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          min={0}
          max={ratings.length - 1}
          step={1}
          value={rating}
          onChange={handleSliderChange}
          renderThumb={(props, state) => (
            <div
              {...props}
              className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center shadow-md"
            >
              <span className="text-white text-xs  text-center">{ratings[state.value]}</span>
            </div>
          )}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={` h-2 rounded-full ${
                state.index === 0 ? 'bg-green-300' : 'bg-gray-500'
              }`}
            />
          )}
        />
        {/* Markers */}
        <div className="flex justify-between mt-2">
          {ratings.map((label, index) => (
            <span
              key={index}
              className={`text-xl font-medium ${
                index === rating ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
     <div>
       <input className='h-12 w-96 mr-10' type="text" />
       <button className='text-xl text-blue-600 hover:underline'>Create or reset password</button>
     </div>

     <div className=' flex items-center justify-center'>
       <button className='text-xl bg-blue-600 border w-28 p-2 px-3 me-2  border-black text-white' >Continue</button>
       <button className='text-xl bg-gray-400 border w-28 p-2 px-3  border-black' >Cancel</button>
     </div>
    </div>
   </div>
  )
}

export default ViewRestrictions
