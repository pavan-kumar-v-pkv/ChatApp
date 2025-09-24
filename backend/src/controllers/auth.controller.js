import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body; // get data from request body
    const name = typeof fullName === 'string' ? fullName.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const pass = typeof password === 'string' ? password : '';

    try {
        if((!name) || (!normalizedEmail) || (!pass)){
            return res.status(400).json({ message: "All fields are required!" });
        }
        // check password length
        if(pass.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long!" });
        }
        // check if email is valid using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(normalizedEmail)){
            return res.status(400).json({ message: "Please enter a valid email address!" });
        }
        // check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if(existingUser){
            return res.status(400).json({ message: "Email already exists! Login instead or use different mail for signup" });
        }

        // create new user
        const hashedPassword = await bcrypt.hash(pass, 10);

        const newUser = new User({
            fullName: name,
            email: normalizedEmail,
            password: hashedPassword
        })

        if (newUser) {
            // generate JWT token for user
            // generateToken(newUser._id, res)
            // await newUser.save();
            // Persist user first, then issue auth token
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ message: "Invalid user details!" });
        }
    }
    catch (error) {
        console.error("Error in signup: ", error);
        res.status(500).json({ message: "Server error!" });
    }
}

export const login = (req, res) => {
    res.send('Login endpoint');
}

export const logout = (req, res) => {
    res.send('Logout endpoint');
}