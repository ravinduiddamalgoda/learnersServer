const express = require("express");
const ChatRoute = express.Router();
const ChatCtrl = require("../controller/Chat.ctrl");

ChatRoute.post("/creategroup", ChatCtrl.createGroupChat);
ChatRoute.post("/sendmessage", ChatCtrl.sendMessage);
ChatRoute.get("/searchgroup", ChatCtrl.searchGroups);
ChatRoute.get("/getallgroups", ChatCtrl.allGroups);
ChatRoute.get("/getmessages", ChatCtrl.getMessages);

module.exports = ChatRoute;
