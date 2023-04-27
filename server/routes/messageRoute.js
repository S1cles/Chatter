const { addMessage, getMessages } = require("../controllers/messageController");
const chatRouter = require("express").Router();

chatRouter.post("/addMessage", addMessage);
chatRouter.post("/getMessage", getMessages);

module.exports = chatRouter;