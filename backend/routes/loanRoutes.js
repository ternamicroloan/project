import express from 'express'
import asyncHandler from 'express-async-handler'
import Loan from '../models/LoanModel.js'
import mongodb from 'mongodb'
import {protectStudent,protectLender} from '../middleware/authMiddleware.js'
const router=express.Router()

//@desc Create new Loan
//@route Post/loans
//@access Private
const createNewLoan=asyncHandler(async(req,res)=>{
    const {student,heading,description,duration,total_amount,monthly_emi,granted,on_going,completed,verified}=req.body
    
    if(heading && total_amount){
        const loan=new Loan({
            student,
            heading,
            description,
            duration,
            total_amount,
            monthly_emi,
            granted,
            on_going,
            completed,
            verified
        })

        const createdLoan=await loan.save()
        res.status(200).json(createdLoan)
    }else{
        res.status(400)
        throw new Error('Backend Server Error')
    }
})

//@desc Get Loan by id
//@route GET/loans/:id
//@access Private

const getLoanById = asyncHandler(async(req,res)=>{
    const loan= await Loan.findById(req.params.id).populate('student','name email_address mobile_number').populate('lender','name email_address mobile_number') // populate will expand the fields using object_id's
    if(loan){
        res.json(loan)
    }else{
        res.status(404)
        throw new Error('Loan not found')
    }
})


//@desc Update Loan status to granted
//@route PUT /loans/:id/granted
//@acess Private

const updateLoanToGranted =asyncHandler(async(req,res)=>{
    const {lender,installments,granted,on_going}=req.body
    console.log(`In routes: ${lender,installments,granted,on_going}`)
    const loan =await Loan.findById(req.params.id)
    if(loan){
        
        loan.completed=req.body.completed || loan.completed
        loan.student=req.body.student || loan.student
        loan.heading=req.body.heading || loan.heading
        loan.description=req.body.description || loan.description
        loan.total_amout=req.body.total_amout || loan.total_amout
        loan.duration=req.body.duration || loan.duration
        loan.monthly_emi=req.body.monthly_emi || loan.monthly_emi
        loan.start_date=Date.now()
        if(on_going===true || on_going===false){
            loan.on_going=on_going
        }
        if(granted===true || granted===false){
            loan.granted=granted
        }
        if(!loan.lender){
            loan["lender"]=lender
        }
        if(installments.length!==0){
            const date=loan.start_date
            installments.map(installment=>{
                var expiry_date = new Date(date.setMonth(date.getMonth()+1)) 
                //var payment_details={id:'',amount:'',currency:'',order_id:'',method,email:'',contact:'',verification}
                loan.installments.push({amount:installment.amount,is_paid:false,payment_details:{},expiry:expiry_date})
            })
        }
        
        const updateLoan=await loan.save()
        res.json(updateLoan)
    }else{
        res.status(404)
        throw new Error('Loan not found to update grant status')
    }
})

//@desc Update Loan status to completed
//@route PUT /loans/:id/completed
//@acess Private

const  updateLoanToCompleted =asyncHandler(async(req,res)=>{
    const loan =await Loan.findById(req.params.id)
    var checker=false
    for(const installment of loan.installments){
        if(installment.is_paid){
            checker=true
        }else{
            checker=false
        }
    }

    if(loan && checker){
        loan.completed=true
        loan.on_going=false
        loan.end_date=Date.now()

        const updateLoan=await loan.save()
        res.json(updateLoan)
    }else{
        res.status(404)
        if(!checker){
            throw new Error('All installments not paid yet!!')
        }else{
            throw new Error('Loan not found to update completed status') 
        }
    }
})


//@desc Update installments to paid
//route PUT /loans/:id/installments/:id1
//@access Private

const updateInstallmentToPaid =asyncHandler(async(req,res)=>{
    const loanId=req.params.id
    const installmentId=req.params.id1
    const loan =await Loan.findById(loanId)
    if(loan && installmentId){

        for(const installment of loan.installments){
            if(mongodb.ObjectID(installment._id).toString() === installmentId && installment.payment_details.verification===true){
                installment["paid_at"]=Date.now()
                installment.is_paid=true
                const updateInstallment=await loan.save()	
                res.json(updateInstallment)
            }
        }
    }else{
        res.status(404)
        throw new Error('Loan not found for installment update')
    }    
})


//@desc GET loans of a student
//route GET/loans/student/:id
//@access Private
const getLoansByStudentId = asyncHandler(async(req,res)=>{
    const loans= await Loan.find({student:req.params.id}).populate('lender','name')
    res.json(loans) 
})


//@desc GET loans of a lender
//route GET/loans/lender/:id
//@access Private
const getLoansByLenderId =asyncHandler(async(req,res)=>{
    const loans = await Loan.find({lender:req.params.id}).populate('student','name')
    res.json(loans)
})

router.route('/').post(protectStudent,createNewLoan)
router.route('/:id').get(getLoanById)
router.route('/:id/granted').put(protectLender,updateLoanToGranted)
router.route('/:id/completed').put(updateLoanToCompleted)
router.route('/:id/installments/:id1').put(updateInstallmentToPaid)
router.route('/student/:id').get(protectStudent,getLoansByStudentId)
router.route('/lender/:id').get(protectLender,getLoansByLenderId)

export default router