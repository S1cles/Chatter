const express = require('express')
const dotenv =require('dotenv')
const router = require('./routes/authRoute')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
require('./db')
dotenv.config()

const app = express()
app.use(cors('http://localhost:3000'))
app.use(express.json());
app.use(bodyParser()); 
app.use(fileUpload({}))
app.use('/api',router)
const port = process.env.PORT

mongoStart()

app.listen(port, ()=>console.log(`Started ${port}`))