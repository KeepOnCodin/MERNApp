import jwt from "jsonwebtoken";

// function to generate a token
// the token will be sent as a cookie

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "30d"}); // create a token with the user id and the secret key

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // true if in production
        samesite: 'strict', // no cookies sent with cross-site requests
        maxAge: 30 * 24 * 60 * 1000,
     }); // send the token as a cookie

};

export default generateToken; // export the function
