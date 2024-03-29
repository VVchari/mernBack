const express = require('express')
const app = express()
const mongoDB=require('./db')

mongoDB();

app.get('/', (req, res)=> {
  res.send('Hello world')
})
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://mernback-em0b.onrender.com/")
  res.header("Access-Control-Allow-Headers",
  "Orgin,X-Requested-With,Content-Type,Accept")
  next()
})
app.use(express.json())
app.use('/api',require("./Routes/User"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(5000,()=>{
    console.log("Server is running")
})
