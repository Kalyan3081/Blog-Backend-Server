import jwt from "jsonwebtoken";
import Token from "../model/TokenModel.js";
const { TokenExpiredError } = jwt;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function generateToken(user) {
    return jwt.sign(
        { userId: user._id },
        SECRET_KEY,
        { expiresIn: "1y" } // Correct expiration format
    );
}

/**
 * this middleware we are using because only the auth user can post the blogs so for that we need to extract the token from the header and verify it 
 *
 */
export async function authenticateMiddleware(req, res, next) {
    const token = req.headers.authorization;
    // if (!token) {
    //     return res.status(401).json({ success: false, message: "No token provided!" });
    // }
    try {
        const claims = jwt.verify(token, SECRET_KEY);

        // Check if the token exists in the database
        const tokenInstance = await Token.findOne({ userId: claims.userId });
        if (!tokenInstance || tokenInstance.token !== token) {
            return res.status(401).json({ success: false, message: "Invalid user! Please log in again." });
        }

        req.userId = claims.userId;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            console.log("Token expired");
            return res.status(401).json({ success: false, message: "Login expired! Please log in again." });
        }
        return res.status(401).json({ success: false, message: "Invalid token!" });
    }
}