const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
// const { mongoDBconnect } = require("./config/dbs")  
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
dotenv.config({path:"./config/config.env"})
const { mongoDBconnect } = require("./config/dbs")

mongoDBconnect()
const app = express()
app.use(cors())
app.use(bodyParser.json({
    limit:"30mb"
}))
app.use(morgan("dev"))

app.get("/",(req,res)=>{
    try {
        res.send("Hello I am your Server")
    } catch (error) {
        console.log(error)
    }
})

app.use('/auth',authRouter)

app.use('/user',userRouter)

app.listen(process.env.PORT,()=>{console.log("yourr server is running")})