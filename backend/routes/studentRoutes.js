import express from 'express'
import asyncHandler from 'express-async-handler'
import Student from '../models/studentModel.js'

const router=express.Router()


//@desc Auth Student & get token
//@route Post /student/login
//@access Public 

const authStudent=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user = await Student.findOne({email_address:email})

    if(user && user.password===password){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email_address,
            college_id:user.college_id,
            address:user.address,
            city:user.city,
            state:user.state,
            zipcode:user.zipcode,
            mobile_number:user.mobile_number,
            adhaar_number:user.adhaar_number,
            guardian_adhaar_number:user.guardian_adhaar_number,
            verified:user.verified,
            image:user.profile_image
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or passwrod')
    }
})

//@desc Register Student
//@route Post /student/signup
//@access Public

const signupStudent=asyncHandler(async(req,res)=>{
    const {name,email,password,mobileNumber,collegeID,adhaarNumber,guardianAdhaarNumber,address,city,state,zipCode}=req.body
    const userExists=await Student.findOne({email_address:email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const new_user=await Student.create({name,email_address:email,password,college_id:collegeID,address,city,state,zipcode:zipCode,mobile_number:mobileNumber,adhaar_number:adhaarNumber,guardian_adhaar_number:guardianAdhaarNumber,verified:false,image:''})

    

    if(new_user){
        res.status(201).json({
            _id:new_user._id,
            name:new_user.name,
            email:new_user.email_address,
            college_id:new_user.college_id
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

//@desc GET student by id
//@route GET /student/:id
//@access Private

const getStudentById=asyncHandler(async(req,res)=>{
    const user=await Student.findById(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

//@desc Update student by id
//@route PUT /student/:id
//@access Private
const updateStudentProfile=asyncHandler(async(req,res)=>{
    
    const user = await Student.findById(req.params.id)
    
    if(user){
        user.name =req.body.name || user.name
        user.email_address=req.body.email || user.email_address
        user.address=req.body.address || user.address
        user.city =req.body.city || user.city
        user.state=req.body.state || user.state
        user.zipcode=req.body.zipCode || user.zipcode
        user.mobile_number =req.body.mobile || user.mobile_number
        user.adhaar_number =req.body.adhaarNumber || user.adhaar_number
        user.guardian_adhaar_number =req.body.guardianAdhaarNumber || user.guardian_adhaar_number
        user.college_id =req.body.collegeId || user.college_id
        user.college_address =req.body.collegeAddress || user.college_address
        user.college_name = req.body.collegeName || user.college_name
        user.year =req.body.year || user.year
        user.semester =req.body.semester || user.semester
        user.about_me =req.body.aboutMe || user.about_me 
        if(req.body.password){
            user.password=req.body.password 
        }
        if(req.body.verified===true || req.body.verified===false){
            user.verified=req.body.verified
        }
        //save updated user
        const updatedUser=await user.save()
        //return update user
        res.json(updatedUser)
    }else{
        res.status(404)
        throw new Error('User Not Found')
        
    }
})

router.post('/login',authStudent)
router.post('/signup',signupStudent)
router.route('/:id').get(getStudentById).put(updateStudentProfile)
export default router