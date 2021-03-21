import Razorpay from 'razorpay'
import crypto from 'crypto'
import express from 'express'
import asyncHandler from 'express-async-handler'
import shortid from 'shortid'
import Loan from '../models/LoanModel.js'
import mongodb from 'mongodb'
const router=express.Router()

var LOAN_ID
var INSTALLMENT_ID

/*
code to get logo on razorpay payment gateway
app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})
*/

const verifyRazorpayPayment = asyncHandler(async(req, res) => {
	//website https url:	https://7a4d0d831db2.ngrok.io https://1df7c2337b95.ngrok.io
	// do a validation
	const secret = 'xyz1abc2pqrs3'

	const {payload}=req.body
	const {payment:{entity}}=payload

	const {id,amount,currency,order_id,method,email,contact}=entity
	var verification=false
	
	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	if (digest === req.headers['x-razorpay-signature']) {

		verification=true

		const loan = await Loan.findById(LOAN_ID)
		
		if(loan){
			
			for(const installment of loan.installments){
				if(mongodb.ObjectID(installment._id).toString() === INSTALLMENT_ID){
					installment["payment_details"]={id,amount,currency,order_id,method,email,contact,verification}
					const updateInstallment=await loan.save()	
				}
			}
			
		}else{
			throw new Error('Something went wrong... Please contact Admin')
		}

	} else {
		// pass it
        throw new Error('Razorpay Verification failed')
	}

	res.json({ status: 'ok' })

})


const createRazorpayOrder=asyncHandler(async (req, res) => {


    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    

    const {installment_amt,installment_id,loan_id}=req.body
	
	LOAN_ID=loan_id
	INSTALLMENT_ID=installment_id

	const payment_capture = 1
	const amount = installment_amt
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)

		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
        res.status(500)
		throw new Error('FAiled to create razorpay order')
	}
})

router.route('/razorpay').post(createRazorpayOrder)
router.route('/verification').post(verifyRazorpayPayment)

export default router