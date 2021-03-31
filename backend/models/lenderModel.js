import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
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
    adhaar_image:{
        type:String
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

lenderSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  lenderSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {//this.isModified checks if the password is modified during profile update
      next()
    }
  
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
  })


const Lender=mongoose.model('Lender',lenderSchema)

export default Lender