const isAdminUser = (req, res, next) =>{
    // we used userInfo because authMiddleware will run first and all user details is decoded and stored in the userInfo variable
    if(req.userInfo.role !=="admin"){
       return res.status(403).json({
        success : false,
        message: "Access denied! Must be an admin user"
       }) 
    }

    next();
}

module.exports = isAdminUser;