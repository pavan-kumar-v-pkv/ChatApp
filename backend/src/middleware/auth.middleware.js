import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized! Please login to access this resource.' });
        }
        
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized! Invalid token.' });
        }

        // Token is valid, attach user info to request object
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password field
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized! User not found.' });
        }
        req.user = user; // Attach user info to request object
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware: ", error);
        return res.status(401).json({ message: 'internal server error' });
    }
}