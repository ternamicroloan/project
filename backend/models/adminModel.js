import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email_address:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile_number:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Admin=mongoose.model('Admin',adminSchema)

export default Admin