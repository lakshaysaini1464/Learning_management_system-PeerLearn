import jwt from 'jsonwebtoken';

const isAuthenticatd = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY); // Synchronous by default
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    // Attach user ID to the request
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export default isAuthenticatd;
