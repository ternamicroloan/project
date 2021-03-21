import mongoose from 'mongoose'
import dotenv from 'dotenv'
import students from './data/students.js'
import lenders from './data/lenders.js'
import admin from './data/admin.js'
import Student from './models/studentModel.js'
import Lender from './models/lenderModel.js'
import connectDB from './config/db.js'
import Admin from './models/adminModel.js'
import Loan from './models/LoanModel.js'
dotenv.config()
connectDB()

const importData =async()=>{
    try{
        await Lender.deleteMany()
        await Student.deleteMany()
        await Admin.deleteMany()
       // await Loan.deleteMany()

        await Student.insertMany(students)
        await Lender.insertMany(lenders)
        await Admin.insertMany(admin)

        console.log('Data imported');
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData =async()=>{
    try{
        await Lender.deleteMany()
        await Student.deleteMany()
        await Admin.deleteMany()
        await Loan.deleteMany()
        console.log('Data destroyed');
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}