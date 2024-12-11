

const express = require('express');
const cors=require("cors")
const dotenv = require('dotenv');
const connectDB = require('./database/db'); // Adjust the path based on your file structure
const auth=require("./routes/auth.routes")
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,                             
}));
connectDB();

app.use(express.json());
app.use("/",auth)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));




// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWUyNmExOWE2ODA0MmEwMGRkOTUzNGRjOGI0YWIwMyIsIm5iZiI6MTczMzQwMTI1NC40NCwic3ViIjoiNjc1MTlhYTY4MGU1YjhmMGE3NTYwZDcyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.B1ZHsnTzSn5UxRwAVDK8N5Bd33K9bdsik45vfe8dFlA'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/authentication', options)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

