import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
    adhaar_image:{
        type:String
    },
    guardian_adhaar_number:{
        type:Number
    },
    guardian_adhaar_image:{
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

studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {//this.isModified checks if the password is modified during profile update
      next()
    }
  
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
  })

const Student=mongoose.model('Student',studentSchema)

export default Student