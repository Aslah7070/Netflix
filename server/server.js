

const express = require('express');
const cors=require("cors")
const dotenv = require('dotenv');
const connectDB = require('./database/db'); 
const auth=require("./routes/auth.routes")
const movie=require("./routes/movies.routes")
const errorHandler=require("./middlewares/customClassMiddleware")
dotenv.config();
const cookieParser=require("cookie-parser")

const app = express();
app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,                             
}));
connectDB();
app.use(cookieParser())
app.use(express.json());
app.use("/",auth)
app.use("/",movie)

app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



