import express, { response } from 'express'
import asyncHandler from 'express-async-handler'
import {OAuth2Client} from 'google-auth-library'

const router=express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT)

const googleSignIn = asyncHandler(async(req,res)=>{
    const {tokenId}=req.body
    client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT}).then(response=>{
        const {email,name,email_verified}=response.payload;
    
        if(email_verified){
            res.json({
                useremail:email,
                username:name,
                email_verified
            })
        }else{
            throw new Error('Google failed to authorize user')
        }
    })
                
})

router.route('/').post(googleSignIn)
export default router