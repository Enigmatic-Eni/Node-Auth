require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db')
const authRoutes = require('./routes/auth-routes')
const homeRoute = require('./routes/home-route')
const adminRoute = require('./routes/admin-route')
const cors = require('cors')

connectToDB()

const app = express();



const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json())

 app.get('/text-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.use('/auth', authRoutes);
app.use('/home', homeRoute);
app.use('/admin', adminRoute);

app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`)
});