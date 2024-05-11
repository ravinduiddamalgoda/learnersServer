const express = require("express");
const ChatbotRoute = express.Router();
const ChatbotCtrl = require('../controller/ChatbotController')

ChatbotRoute.get("/response", ChatbotCtrl.GetResponse);

module.exports = ChatbotRoute;