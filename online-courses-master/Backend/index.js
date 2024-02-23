const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const paymentRoutes = require("./Routes/Paymentroutes2")
const jwt = require("jsonwebtoken")
const authRoutes = require('./Routes/userroutes');
const courseRoutes = require("./Routes/Courseroutes")
const bodyParser = require('body-parser');
require("dotenv").config()

const app= express()
app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then
(()=>console.log("DB CONNECTED8"))



  

app.use('/', authRoutes);
app.use("/",courseRoutes);
 app.use("/",paymentRoutes);


const PORT = process.env.PORT||4040
console.log(PORT)
app.listen(PORT,()=>{
     console.log("server running",PORT)
})











