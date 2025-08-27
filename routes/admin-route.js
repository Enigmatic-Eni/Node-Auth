const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware')

router.get('/index', authMiddleware, adminMiddleware, (req, res) =>{ 
     const { userId, username, role } = req.userInfo;
  
    res.json({
        message : "Welcome to the admin route",
        user:{
            _id: userId,
            username,
            role
        }
    });
});

module.exports = router;