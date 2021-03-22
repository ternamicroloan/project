import express from 'express'
import asyncHandler from 'express-async-handler'
import Lender from '../models/lenderModel.js'
import generateToken from '../utils/generateToken.js'
import {protectLender} from '../middleware/authMiddleware.js'

const router=express.Router()



//@desc Auth Lender & get token
//@route Post /lender/login
//@access Public
const authLender=asyncHandler(async(req,res)=>{
    const {email,password,email_verified}=req.body //email_verified will be present if user signs up using google

    const user = await Lender.findOne({email_address:email})
    if((user && user.password===password) || email_verified){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email_address,
            address:user.address,
            city:user.city,
            state:user.state,
            zipcode:user.zipcode,
            mobile_number:user.mobile_number,
            adhaar_number:user.adhaar_number,
            verified:user.verified,
            image:user.profile_image,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or password')
    }
})

//@desc Register Lender
//@route Post /lender/signup
//@access Public

const signupLender=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    const userExists=await Lender.findOne({email_address:email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }


    let google_password=''
    if(!password){
        google_password=email+process.env.JWT_SECRET//randomly create password which required field when creating new user
    }

    const new_user=await Lender.create({name,email_address:email,password:password?password:google_password})
    
    if(new_user){
        res.status(201).json({
            _id:new_user._id,
            name:new_user.name,
            email:new_user.email_address,
            token:generateToken(new_user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

//@desc GET lender by id
//@route GET /lender/:id
//@access Private

const getLenderById=asyncHandler(async(req,res)=>{
    const user=await Lender.findById(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

//@desc Update lender by id
//@route PUT /lender/:id
//@access Private
const updateLenderProfile=asyncHandler(async(req,res)=>{
    
    const user = await Lender.findById(req.params.id)
    if(user){
        user.name =req.body.name || user.name
        user.email_address=req.body.email || user.email_address
        user.address=req.body.address || user.address
        user.city =req.body.city || user.city
        user.state=req.body.state || user.state
        user.zipcode=req.body.zipCode || user.zipcode
        user.mobile_number =req.body.mobile || user.mobile_number
        user.adhaar_number =req.body.adhaarNumber || user.adhaar_number
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
        res.json({
            updatedUser,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User Not Found')
        
    }
})


router.route('/login').post(authLender)
router.route('/signup').post(signupLender)
router.route('/:id').get(protectLender,getLenderById).put(protectLender,updateLenderProfile)

export default router