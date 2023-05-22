const express= require("express")
const {connection}= require("./config/db")
const cookieParser = require("cookie-parser")
const app= express()
const userRoute= require("./routes/authRoutes")
const productRoute= require("./routes/productRoutes")
require("dotenv").config()
app.use(express.json())
app.use(cookieParser())


app.use("/",userRoute)
app.use("/",productRoute)
const PORT= process.env.PORT



app.listen(PORT,async()=>{
	try {
  await connection
  console.log("Db COnnected")		
	} catch (error) {
		console.log("DB Not Connected")
	}
	console.log(`App is running on Port ${PORT}`)
})



