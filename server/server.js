



  const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const auth = require('./routes/auth.routes');
const movie = require('./routes/movies.routes');
const admin = require('./routes/admin.routes');
const errorHandler = require('./middlewares/customClassMiddleware');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://netflix-clone-asl.vercel.app",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", auth);
app.use("/", movie);
app.use("/", admin);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
