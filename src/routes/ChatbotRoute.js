const express = require("express");
const ChatbotRoute = express.Router();
const ChatbotCtrl = require('../controller/ChatbotController')

ChatbotRoute.post("/response", ChatbotCtrl.GetResponse);

module.exports = ChatbotRoute;