const UserService  = require('../service/User.service');
const mail = require('../service/SendEmail');
const notify = require('../service/SendSMS');

const registerUser = async (req, res) => {
    
    try {
        const { username, password , email , phoneNumber , address , gender , firstName , lastName} = req.body;
        const newUser = await UserService.registerUser(username, password, email, phoneNumber , address , gender , firstName, lastName);

        
        // console.log(newUser);
        const subject = 'Welcome to Sarasavi Learners';
        const text = `Welcome ${username} to Sarasavi Learners. We are glad to have you onboard.`;
        await mail.sendmail(email, subject, text);
        const textMsg = `Welcome ${firstName} ${lastName} to Sarasavi Learners.`;
        await notify.sendNotification(phoneNumber, textMsg);
        newUser.password = undefined;
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to register user" , error : error.message});
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
        const id = req.params.id;
        const userProfile = await UserService.getUserProfile(id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(404).json({ message: "User profile not found" });
    }
};

const updateUserProfile = async (req, res) => {
    
    try {
        const id = req.params.id;
        const { password, email, phoneNumber, address  , firstName , lastName} = req.body;
        const updatedUserProfile = await UserService.updateUserProfile(id, password, email, phoneNumber, address , firstName , lastName);
        res.status(200).json(updatedUserProfile);
    } catch (error) {
        res.status(400).json({ message: "Failed to update user profile" });
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await UserService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete the user" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: "No users found" });
    }

}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getUsers
};