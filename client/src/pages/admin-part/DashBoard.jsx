



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../axiosInstance/api";
import { setAllPayments, setAmount, setDilyPayments, setMonthlyPayments, setNonPrime, setPrimeUses } from "../../redux/adminSlice";
import ApexChart from "./ApexChart"; 
import ApexChartUsers from "./ApexChartUsers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.user.users);
 
 const movies = useSelector((state) => state.admin.movies);
  const totalAmount = useSelector((state) => state.admin.totlaAmount);
  const dailypayment=useSelector((state)=>state.admin.dailyAmounts)
  const primAaccounts = useSelector((state) => state.admin.primeUsers);
  const nonPrimAaccounts = useSelector((state) => state.admin.nonPrimeUsers);
  const monthlypayment=useSelector((state)=>state.admin.monthlyAmount)
  
  const allPayments = useSelector((state) => state.admin.allPayments);

  console.log("accounts", accounts?.length);
  console.log("movies", movies?.length);
  console.log("totalAmount", totalAmount);
  console.log("allPayments", allPayments);
  console.log("dailypayment", dailypayment);
  console.log("monthlypayment", monthlypayment);

  const finAllPayment = async () => {
    const response = await api.get("/getallpayments");
    console.log("response on payment", response.data);
    const totalAmount = response.data.totalAmount;
    const payments = response.data.payments;

    dispatch(setAllPayments(payments));
    dispatch(setAmount(totalAmount));
  };
  const findtheDailyPayments=async()=>{
   try {
    const response=await api.get("/getdailypayments")
    console.log("response",response.data.totalAmount);
    if(response.status===200){
      dispatch(setDilyPayments(response.data.totalAmount))
    }
 
   } catch (error) {
    console.log("error",error);
    
   }
    
   }

   const findMonthlyPayment=async()=>{

try {
  const response=await api.get("/getmonthlypayments")
  console.log("response on month",response)
  if(response.status===200){
    console.log("response.data.totalAmount",response.data.totalAmount);
    
    dispatch(setMonthlyPayments(response.data.totalAmount))
  }
} catch (error) {
  console.log("error",error);
  
}

   }  

   const findPriem=async()=>{
try {
  const response=await api.get("/findprimeuser")
  console.log("response on find prime",response);
  if(response.status===200&&response.data.prime){
    dispatch(setPrimeUses(response.data.prime))
  }
  if(response.status===200&&response.data.nonPrime){
    dispatch(setNonPrime(response.data.nonPrime))
    
  }
  
} catch (error) {
  console.log("error",error);
  
}
    
   }

  useEffect(() => {
    findPriem()
    finAllPayment();
    findMonthlyPayment()
    findtheDailyPayments()
   
   
  }, []);

  


  // Chart Data Preparation
  const chartData = {
    series: [ totalAmount || 0 ,dailypayment||0,monthlypayment||0],
    labels: [ "Total Profit","Daily Profit","Monthly Profit"],
  };

  const chartUsersData={
    series: [accounts?.length||0,primAaccounts.length||0,nonPrimAaccounts.length||0 ],
    labels: ["Total Users", "Prime Users", "Users",],
  }

  const chartMoviesData={
    series: [accounts?.length||0,primAaccounts.length||0,nonPrimAaccounts.length||0 ],
    labels: ["Total Users", "Prime Users", "Users",],
  }

  return (
    <div>
      <main className="p-6 overflow-y-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">{accounts?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Revenue</h2>
            <p className="text-2xl font-bold text-green-600">₹{totalAmount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Total Movies</h2>
            <p className="text-2xl font-bold text-yellow-600">{movies?.length}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Daily Revenue</h2>
            <p className="text-2xl font-bold text-yellow-600">{dailypayment}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Monthly Profits</h2>
            <p className="text-2xl font-bold text-yellow-600">{monthlypayment}</p>
          </div>
        </div>

       

    

<div className="bg-white flex flex-col items-center w-full rounded-lg shadow mb-6">
  <h2 className="text-lg font-bold mb-4">Statistics</h2>
  <div className="flex flex-col customlg:flex-row justify-between customlg:items-center w-3/4 ">
    <div className="w-full customlg:w-1/2 p-2">
      <ApexChart chartData={chartData} />
    </div>
    <div className="w-full customlg:w-1/2 p-2">
      <ApexChartUsers chartData={chartUsersData} />
    </div>
  </div>
</div>


      
      </main>
    </div>
  );
};

export default Dashboard;
