const express = require('express')
const dotenv =require('dotenv')
const router = require('./routes/authRoute')
const  start  = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
app.use(cors('http://localhost:3000'))
app.use(express.json());
app.use(bodyParser()); 
app.use('/api',router)
const port = process.env.PORT

mongoStart()

app.listen(port, ()=>console.log(`Started ${port}`))