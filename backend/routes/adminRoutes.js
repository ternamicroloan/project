import express from 'express'
import asyncHandler from 'express-async-handler'
import Lender from '../models/lenderModel.js'
import Student from '../models/studentModel.js'
import Admin from '../models/adminModel.js'
import Loan from '../models/LoanModel.js'

const router=express.Router()
//@desc Auth Admin & get token
//@route Post /admin/login
//@access Public 

const authAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user = await Admin.findOne({email_address:email})

    if(user && user.password===password){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email_address,
            mobile_number:user.mobile_number,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or passwrod')
    }
})

//@desc GET all students
//@route GET/admin/students
//@access Private/Admin

const getAllStudents= asyncHandler(async(req,res)=>{

    const user= await Student.find()
    res.json(user)
})

//@desc GET all lenders
//@route GET/admin/lenders
//@access Private/Admin

const getAllLenders= asyncHandler(async(req,res)=>{

    const user=await Lender.find()
    res.json(user)
})

//@desc DELETE student
//@route DELETE/admin/students/:id
//@access Private/Admin

const deleteStudent=asyncHandler(async(req,res)=>{
    const user=await Student.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'User removed'})
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})

//@desc DELETE lender
//@route DELETE/admin/lenders/:id
//@access Private/Admin

const deleteLender =asyncHandler(async(req,res)=>{
    const user=await Lender.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'User removed'})
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})

//@desc GET all loans
//@route GET/admin/loans
//@access Private/Admin

const getAllLoans = asyncHandler(async(req,res)=>{
    const loans=await Loan.find({}).populate('student','name email_address mobile_number').populate('lender','name email_address mobile_number')
    res.json(loans)
})

//@desc Update Loan status to verified
//@route PUT admin/loans/:id
//@access Private/Admin

const updateLoanToVerified =asyncHandler(async(req,res)=>{
    
    console.log(req.params.id);
    console.log(req.body.verified);
    const loan =await Loan.findById(req.params.id)
    if(loan){
        loan.granted=req.body.granted || loan.granted
        loan.completed=req.body.completed || loan.completed
        loan.on_going=req.body.on_going || loan.on_going
        loan._id=req.body.id || loan._id
        loan.student=req.body.student || loan.student
        loan.lender=req.body.lender || loan.lender
        loan.heading=req.body.heading || loan.heading
        loan.description=req.body.description || loan.description
        loan.total_amout=req.body.total_amout || loan.total_amout
        loan.duration=req.body.duration || loan.duration
        loan.monthly_emi=req.body.monthly_emi || loan.monthly_emi
        loan.installment =req.body.installment || loan.installment
        if(req.body.verified===true || req.body.verified===false){
            loan.verified=req.body.verified 
        } 
        const updateLoan =await loan.save()
        res.json(updateLoan)
    }else{
        res.status(404)
        throw new Error('Loan not found to update verified status')
    }
})


router.route('/students').get(getAllStudents)
router.route('/students/:id').delete(deleteStudent)
router.route('/lenders').get(getAllLenders)
router.route('/lenders/:id').delete(deleteLender)
router.route('/login').post(authAdmin)
router.route('/loans').get(getAllLoans)
router.route('/loans/:id/verified').put(updateLoanToVerified)

export default router


