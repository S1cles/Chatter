const express = require('express')
const dotenv =require('dotenv')
const router = require('./routes/authRoute')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const chatRouter = require('./routes/messageRoute')
const socket = require('socket.io')
require('./db')
dotenv.config()

const app = express()
app.use(cors('http://localhost:3000'))
app.use(express.json());
app.use(bodyParser()); 
app.use(fileUpload({}))
app.use('/api',router)
app.use('/api/chat',chatRouter)
const port = process.env.PORT

mongoStart()

const backend = app.listen(port, ()=>console.log(`Started ${port}`))

const io = socket(backend,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
})

global.onlineUsers = new Map()

io.on('connection', (socket)=>{
    global.chatSocket = socket;
    socket.on('add-user' , (userId)=>{
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-message' , (data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('message-recieve', data.message)
        }
    })
    
})