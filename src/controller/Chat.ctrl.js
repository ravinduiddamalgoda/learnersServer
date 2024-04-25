const Group = require("../models/Group");
const Message = require("../models/Message");

const createGroupChat = async (req, res) => {   
    if (!req.body.admin) {
        console.log("Create group chat")
      return res.status(400).send({ message: "Group must have an Admin." });
    }
    
    if (!req.body.name) {
      return res.status(400).send({ message: "Group name is required." });
    }

    try {
        const groupChat = await Group.create({
            name: req.body.name,
            admin: req.body.admin,
        });
        return res.status(200).json({message: "Group created successfully.", groupChat});

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const allGroups = async (req, res) => {
    try {

        const groups = await Group.find();
        console.log(groups)
        groups.length > 0 ? res.status(200).json({ message: "Found groups.", groups }) : res.status(400).json({ message: "No groups found." });  
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendMessage = async (req,res) => {
    if (!req.body.content) {
        return res.status(400).send({ message: "No message content." });
    }
    if (!req.body.sender) {
        return res.status(400).send({ message: "No message content." });
    }
    if (!req.body.group) {
        return res.status(400).send({ message: "No message content." });
    }

    try {

        const message = await Message.create({
            content: req.body.content,
            sender: req.body.sender,
            group: req.body.group,
        });

        const group = await Group.findOneAndUpdate(
            { _id: req.body.group },
            { $push: { messages: message._id } },
            { new: true }
        );

        if (!group) {
            return res.status(404).json({ message: "Group not found." });
        }

        res.status(200).json({ message: "Message sent successfully.", message });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

const searchGroups = async (req, res) => {
    console.log(req.body)
    if (!req.body || !req.body.keywords) {
        console.log('no keywords')
        return res.status(400).send({ message: "Keywords are required." });
    }

    try {
        const keywords = req.body.keywords.map(keyword => keyword.trim()); 
        const regexPattern = keywords.join('|');
        const regex = new RegExp(regexPattern, 'i');

        const groups = await Group.find({ name: { $regex: regex } });

        if (groups.length === 0) {
            return res.status(404).json({ message: "No groups found matching the keywords." });
        }

        res.status(200).json({ message: "Groups found.", groups });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    if (!req.body.group) {
        return res.status(400).send({ message: "No group id." });
    }

    try {
        const groupId = req.body.group;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: "Group not found." });
        }

        const messageIds = group.messages;

        const messages = await Promise.all(messageIds.map(async messageId => {
            const message = await Message.findById(messageId);
            return message;
        }));

        res.status(200).json({ message: "Messages retrieved successfully.", messages, groupId });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    const messageId = req.params.messageId; 

    try {
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).send({ message: "Message not found." });
        }

        const group = await Group.findById(deletedMessage.group);
        if (!group) {
            return res.status(404).send({ message: "Group not found." });
        }

        group.messages.pull(messageId); 
        await group.save();

        res.status(200).send({ message: "Message deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMessage = async (req, res) => {
    const { messageId, content } = req.body;

    if (!messageId || !content) {
        return res.status(400).send({ message: "Message ID and content are required." });
    }

    try {

        const updatedMessage = await Message.findByIdAndUpdate(messageId, { content });

        if (!updatedMessage) {
            return res.status(404).send({ message: "Message not found." });
        }

        res.status(200).json(updatedMessage);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGroupChat,
    allGroups,
    sendMessage,
    searchGroups,
    getMessages,
    deleteMessage,
    updateMessage,
};