const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const taskRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoutes')
const connectDb = require('./config/dbConnection')
const errorHandler = require('./middleware/errorHandler')


connectDb()

const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)



app.listen(port,()=>{
    console.log(`server ${port} is online...`)
})