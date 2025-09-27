import Message from '../models/Message.js'
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';

export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select('-password -email -createdAt -updatedAt -__v');
        res.status(200).json(filteredUsers);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id:userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 }); // Sort by creation time in ascending order

        res.status(200).json({
            messages: messages || [],
            user: await User.findById(userToChatId).select('-password -email -createdAt -updatedAt -__v') || {}
        })
    } catch (error) {
        console.log("Error in getMessageByUserId: ", error);
        res.status(500).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // if(!text  !image) {
        //     return res.status(400).json({ message: "Message text or image is required!" });
        // }

        let imageUrl;
        if(image) {
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId: senderId,
            receiverId,
            text, 
            image: imageUrl,
        })
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        console.log("Error in sendMessage: ", error);
        res.status(500).json({ error: error.message });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // find all the messaged where the logged in user is either sender or receiver
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId },
            ]
        })

        const chatPartnerIds = [...new Set(messages.map(msg => msg.senderId.toString() == loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds }}).select('-password -email -createdAt -updatedAt -__v');
        res.status(200).json(chatPartners || []);
    } catch (error) {
        console.log("Error in getChatPartners: ", error);
        res.status(500).json({ error: error.message });
    }
};