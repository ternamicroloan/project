import express from 'express'
import path from 'path'
import studentRoutes from './routes/studentRoutes.js'
import lenderRoutes from './routes/lenderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import loanRoutes from './routes/loanRoutes.js'
import razorpayRoutes from './routes/razorpayRoutes.js'
import googleRoutes from './routes/googleRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app=express()
dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));

app.use(cors())

app.use('/student',studentRoutes)
app.use('/lender',lenderRoutes)
app.use('/admin',adminRoutes)
app.use('/loans',loanRoutes)
app.use('/payment',razorpayRoutes)
app.use('/googlelogin',googleRoutes)
app.use('/upload',uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')))

  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
  app.get('/',(req,res)=>{
    res.send('API is running...') 
  })
}


const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`))