import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

/**
 * Get users for sidebar (excluding logged-in user)
 */
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Fetch messages between logged-in user and selected user
 */
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 }); // ✅ Fix: Sort messages by time (oldest to newest)

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Send a new message (with optional image upload)
 */
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        console.log("Received image:", image ? "Yes" : "No");

        let imageUrl = null;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: "chat_images", // ✅ Optional: Organize images
                });
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(400).json({ message: "Image upload failed" });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        console.log("Message saved successfully:", newMessage);

        // Realtime messaging feature
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
            console.log("Realtime message sent to socket:", receiverSocketId);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
