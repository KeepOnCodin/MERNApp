import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


const protect = asyncHandler(async (req, res, next) => { // protect the route
    let token;

    token = req.cookies.jwt; // get the token from the cookie

    if (token) { // if token exists
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token
            req.user = await User.findById(decoded.id).select("-password"); // find the user by id and add the user data to the request object
            next(); // move on to the next middleware
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else { // if token does not exist
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}
);

export { protect }; // export the middleware