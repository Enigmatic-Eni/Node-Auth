require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db')
const authRoutes = require('./routes/auth-routes')
const homeRoute = require('./routes/home-route')

connectToDB()

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json())

app.use('/auth', authRoutes);
app.use('/home', homeRoute);

app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`)
});