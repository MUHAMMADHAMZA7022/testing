// Create Token and saving in cookie

const sendToken = (res, user, statusCode, message) => {
        const token = user.getJWTToken();
      
        const options = {
          httpOnly: true,
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
        };
      
      
      
        res
          .status(statusCode)
          .cookie("token", token, options)
          .json({ success: true, message, user ,token});
      };
module.exports = sendToken;