const UserService  = require('../service/User.service');

const registerUser = async (req, res) => {
    try {
        const newUser = await UserService.registerUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to register user" });
    }
};
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await UserService.loginUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserService.getUserProfile(req.user.id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(404).json({ message: "User profile not found" });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const updatedUserProfile = await UserService.updateUserProfile(req.user.id, req.body);
        res.status(200).json(updatedUserProfile);
    } catch (error) {
        res.status(400).json({ message: "Failed to update user profile" });
    }
};

const deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.user.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete the user" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
};