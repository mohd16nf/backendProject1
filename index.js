const express = require('express')
const fs = require('fs')

// imports 
 const userRouter = require('./routes/user')
 const {connectMongoDb} = require('./connections')
 const {logReqRes} = require('./middleware')

const PORT = 8000;

const app = express()
connectMongoDb('mongodb://localhost:27017/practiceDB')

app.use(logReqRes('log.txt'))

app.use('/user', userRouter)
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, ()=>{
    console.log(`Server linstening at port ${PORT}`)
})