import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    // get my headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({
        message: "Unauthorized: No header found",
      });
    }

    // get the token from the header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Unauthorized: token not found",
      });
    }

    // if I got the token - then I have to decode it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return res.status(403).json({
          });
        }
        // console.log(decoded);
        // assign backend current user to decoded user
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized: Invalid token",
        })
    }


  } catch (error) {
    console.log("Error in Auth middleware", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
