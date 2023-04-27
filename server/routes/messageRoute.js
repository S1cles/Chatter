const { addMessage, getMessages } = require("../controllers/messageController");
const { private } = require('../middlewares/verifyToken')
const chatRouter = require("express").Router();

chatRouter.post("/addMessage",private, addMessage);
chatRouter.post("/getMessage",private, getMessages);

module.exports = chatRouter;