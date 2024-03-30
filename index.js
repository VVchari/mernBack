const express = require('express')
const app = express()
const mongoDB=require('./db')
const cors = require('cors')
mongoDB();

app.get('/', (req, res)=> {
  res.send('Hello world')
})
app.use(cors())
app.use(express.json())
app.use('/api',require("./Routes/User"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(5000,()=>{
    console.log("Server is running")
})
