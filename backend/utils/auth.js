const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
module.exports = Authenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
   return res.status(401).json({ success: false, message: "Login to access this resource" });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
    res.status(500).json({ success: false,error:error.message });
        
    }

}
//role ha  ye admin ha to ye kro
exports = authorizerole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return  res.status(403).json({ success: false, message: `Role:${req.user.role} is not allowed to access this resource`  });

      
    }
    next();
  };
};