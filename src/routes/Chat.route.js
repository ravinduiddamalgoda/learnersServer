const express = require("express");
const ChatRoute = express.Router();
const ChatCtrl = require("../controller/Chat.ctrl");

ChatRoute.post("/creategroup", ChatCtrl.createGroupChat);
ChatRoute.post("/sendmessage", ChatCtrl.sendMessage);
ChatRoute.post("/searchgroup", ChatCtrl.searchGroups);
ChatRoute.get("/getallgroups", ChatCtrl.allGroups);
ChatRoute.post("/getmessages", ChatCtrl.getMessages);
ChatRoute.post("/updatemessage", ChatCtrl.updateMessage);
ChatRoute.delete("/deletemessage/:messageId", ChatCtrl.deleteMessage);

module.exports = ChatRoute;
