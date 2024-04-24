const Group = require("../models/Group");

const createGroupChat = async (name, admin) => {

    try {
  
        const groupChat = await Group.create({
            name: req.body.name,
            admin: admin,
        });
        res.status(200).json("Group created successfully.", groupChat);
  
    } catch (error) {
  
        res.status(400);
        throw new Error(error.message);
  
      }

}