import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
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
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipcode:{
        type:Number
    },
    mobile_number:{
        type:Number
    },
    adhaar_number:{
        type:Number
    },
    guardian_adhaar_number:{
        type:Number
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    },
    profile_image:{
        type:String
    },
    college_id:{
        type:String,
    },
    college_name:{
        type:String
    },
    college_address:{
        type:String
    },
    year:{
        type:Number
    },
    semester:{
        type:Number
    },
    about_me:{
        type:String
    }
},{timestamps:true})

const Student=mongoose.model('Student',studentSchema)

export default Student