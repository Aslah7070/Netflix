


// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selecetedPremium, setSelectedPremium } from "../../redux/slice";

// const PremiumComponent = () => {


//   const navigate=useNavigate()

//   const demoPlans = [
//     {
//       title: "Mobile",
//       resolution: "480p",
//       price: "149",
//       quality: "Fair",
//       devices: "Mobile phone, tablet",
//       watchDevices: "1",
//       downloadDevices: "1",
//     },
//     {
//       title: "Basic",
//       resolution: "720p",
//       price: "299",
//       quality: "Good",
//       devices: "Mobile phone, tablet, laptop",
//       watchDevices: "1",
//       downloadDevices: "2",
//       mostPopular: true,  
//     },
//     {
//       title: "Standard",
//       resolution: "1080p",
//       price: "499",
//       quality: "Better",
//       devices: "All devices",
//       watchDevices: "2",
//       downloadDevices: "2",
//     },
//     {
//       title: "Premium",
//       resolution: "4K (Ultra HD) + HDR",
//       price: "649",
//       quality: "Best",
//       devices: "TV, computer, mobile phone, tablet",
//       watchDevices: "4",
//       downloadDevices: "6",
//       audio: "Spatial audio (immersive sound)",
//     },
//   ];

//   const dispatch=useDispatch()

 

//   const handleSelected=(price)=>{
    
//     dispatch(setSelectedPremium(price))
//   }
//  const price= useSelector((state)=>state.user.premiumPrice)

//  console.log("price",price);
 

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {demoPlans.map((plan, index) => (
//           <div onClick={()=>handleSelected(plan.price)}
//             key={index}
//             className="max-w-sm rounded-lg shadow-lg border border-gray-200 p-6 bg-white relative"
//           >
            
//             {plan.mostPopular && (
//               <span className="absolute top-0 left-0 w-full bg-gray-800 text-white text-sm font-semibold py-2 text-center rounded-t-lg">
//                 Most Popular
//               </span>
//             )}

        
//             <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg text-white p-4">
//               <h2 className="text-lg font-bold">{plan.title}</h2>
//               <p className="text-sm">{plan.resolution}</p>
//             </div>

           
//             <div className="mt-4">
             
//               <p className="text-gray-500">Monthly price</p>
//               <h3 className="text-xl font-semibold">{plan.price}</h3>

//               <hr className="my-4" />

              
//               <p className="text-gray-500">Video and sound quality</p>
//               <h3 className="font-medium">{plan.quality}</h3>

//               <hr className="my-4" />

         
//               <p className="text-gray-500">Resolution</p>
//               <h3 className="font-medium">{plan.resolution}</h3>

              
//               {plan.audio && (
//                 <>
//                   <hr className="my-4" />
//                   <p className="text-gray-500">Spatial audio</p>
//                   <h3 className="font-medium">{plan.audio}</h3>
//                 </>
//               )}

//               <hr className="my-4" />

//               <p className="text-gray-500">Supported devices</p>
//               <h3 className="font-medium">{plan.devices}</h3>

//               <hr className="my-4" />

             
//               <p className="text-gray-500">
//                 Devices your household can watch at the same time
//               </p>
//               <h3 className="font-medium">{plan.watchDevices}</h3>

//               <hr className="my-4" />

           
//               <p className="text-gray-500">Download devices</p>
//               <h3 className="font-medium">{plan.downloadDevices}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center pt-6">
//         <button onClick={()=>navigate("/paymentpicker")} className="bg-red-600 w-80 h-14">submit</button>
//       </div>
//     </div>
//   );
// };

// export default PremiumComponent;



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedPremium } from "../../redux/slice";

const PremiumComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const demoPlans = [
    {
      title: "Mobile",
      resolution: "480p",
      price: "149",
      quality: "Fair",
      devices: "Mobile phone, tablet",
      watchDevices: "1",
      downloadDevices: "1",
    },
    {
      title: "Basic",
      resolution: "720p",
      price: "299",
      quality: "Good",
      devices: "Mobile phone, tablet, laptop",
      watchDevices: "1",
      downloadDevices: "2",
      mostPopular: true,
    },
    {
      title: "Standard",
      resolution: "1080p",
      price: "499",
      quality: "Better",
      devices: "All devices",
      watchDevices: "2",
      downloadDevices: "2",
    },
    {
      title: "Premium",
      resolution: "4K (Ultra HD) + HDR",
      price: "649",
      quality: "Best",
      devices: "TV, computer, mobile phone, tablet",
      watchDevices: "4",
      downloadDevices: "6",
      audio: "Spatial audio (immersive sound)",
    },
  ];

  const selectedPrice = useSelector((state) => state.user.premiumPrice);

  const handleSelected = (price) => {
    dispatch(setSelectedPremium(price));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {demoPlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => handleSelected(plan.price)}
            className={`max-w-sm rounded-lg shadow-lg border p-6 bg-white relative cursor-pointer transform transition duration-200 ${
              selectedPrice === plan.price
                ? "border-blue-500 scale-105 shadow-xl"
                : "border-gray-200"
            }`}
          >
            {plan.mostPopular && (
              <span className="absolute top-0 left-0 w-full bg-gray-800 text-white text-sm font-semibold py-2 text-center rounded-t-lg">
                Most Popular
              </span>
            )}

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg text-white p-4">
              <h2 className="text-lg font-bold">{plan.title}</h2>
              <p className="text-sm">{plan.resolution}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">Monthly price</p>
              <h3 className="text-xl font-semibold">{plan.price}</h3>

              <hr className="my-4" />

              <p className="text-gray-500">Video and sound quality</p>
              <h3 className="font-medium">{plan.quality}</h3>

              <hr className="my-4" />

              <p className="text-gray-500">Resolution</p>
              <h3 className="font-medium">{plan.resolution}</h3>

              {plan.audio && (
                <>
                  <hr className="my-4" />
                  <p className="text-gray-500">Spatial audio</p>
                  <h3 className="font-medium">{plan.audio}</h3>
                </>
              )}

              <hr className="my-4" />

              <p className="text-gray-500">Supported devices</p>
              <h3 className="font-medium">{plan.devices}</h3>

              <hr className="my-4" />

              <p className="text-gray-500">
                Devices your household can watch at the same time
              </p>
              <h3 className="font-medium">{plan.watchDevices}</h3>

              <hr className="my-4" />

              <p className="text-gray-500">Download devices</p>
              <h3 className="font-medium">{plan.downloadDevices}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={() => navigate("/paymentpicker")}
          className={`w-80 h-14 text-white font-bold rounded-lg transition duration-200 ${
            selectedPrice
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedPrice}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PremiumComponent;

