import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    // create a token
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ userId: userId }, JWT_SECRET, {
        expiresIn: '7d' // token will expire in 7 days
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // cookie cannot be accessed by client-side JS, prevent XSS attacks
        secure: process.env.NODE_ENV === 'production' ? true : false, // cookie will be sent only over HTTPS in production
        sameSite: 'strict' // cookie will be sent only for same site requests, prevent CSRF attacks
    })

    return token;
}