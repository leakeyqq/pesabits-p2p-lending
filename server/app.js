// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const loanOfferRoutes = require('./routes/loanOfferRoutes');


dotenv.config();
const app = express();

const allowedOrigins = [
    "http://localhost:3000/",
    "https://pesabits.vercel.app/"
];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true 
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', loanOfferRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
