import jwt from 'jsonwebtoken'
import Student from '../models/studentModel.js'
import Lender from '../models/lenderModel.js'
import asyncHandler from 'express-async-handler'

export const protectStudent =asyncHandler(async(req,res,next)=>{
    let token =req.headers.authorization
    if(token && token.startsWith('Bearer')){
        try{
            const decoded= jwt.verify(token.split(' ')[1],process.env.JWT_SECRET)
            req.user=await Student.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export const protectLender=asyncHandler(async(req,res,next)=>{
    let token=req.headers.authorization
    if(token && token.startsWith('Bearer')){
        try{
            const decoded =jwt.verify(token.split(' ')[1],process.env.JWT_SECRET)
            req.user = await Lender.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    
})