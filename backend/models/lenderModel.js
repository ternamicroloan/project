import mongoose from 'mongoose'

const lenderSchema = mongoose.Schema({
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
    verified:{
        type:Boolean,
        default:false,
        required:true
    },
    profile_image:{
        type:String
    },
    about_me:{
        type:String
    }
},{timestamps:true})

const Lender=mongoose.model('Lender',lenderSchema)

export default Lender