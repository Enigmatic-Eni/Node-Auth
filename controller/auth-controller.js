const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register controller
const registerUser = async(req, res)=>{
    try{
        // extract user information fromthe req.body
        const {username, password, email, role} = req.body;
        
        // check if user already exists in the database
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message : "User with the same email or password already exists."
            })
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user and save in the database
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || "user"
        })

        await newUser.save()

        if(newUser){
            res.status(201).json({
                success: true,
                message : "User registered successfully"
            })
        }else{
            res.status(400).json({
                success: false,
                message : "Unable to register user, please try again"
            })
        }
    }catch(e){
       console.log(e);
       res.status(500).json({
        success : false,
        message : "Something went wrong, Please try again"
       }); 
       

    }
}

// login controller 
const loginUser = async(req, res)=>{
    try{
        const {username, password} = req.body;

        //check if user currently exists
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({                
                success : false,
                message : `User doesn't Exist`
        })
        }

        // check if password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username: user.username,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        })
        res.status(200).json({
            success: true,
            message : "User Logged In successfully",
            accessToken
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Incorrect email or password"
        });
    }
};

module.exports = {registerUser, loginUser}