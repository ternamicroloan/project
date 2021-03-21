import mongoose from 'mongoose'

const InstallmentSchema=mongoose.Schema({
        amount:{type:Number},
        is_paid:{type:Boolean,default:false},
        payment_details:{
            id:{type:String},
            amount:{type:String},
            currency:{type:String},
            order_id:{type:String},
            method:{type:String},
            email:{type:String},
            contact:{type:String},
            verification:{type:Boolean},
        },
        paid_at:{type:Date},
        expiry:{type:Date}
},{timestamps:true})

const LoanSchema = mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    lender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lender'
    },
    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },
    monthly_emi:{
        type:Number,
        reuired:true
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date
    },
    total_amount:{
        type:Number,
        required:true
    },
    granted:{
        type:Boolean,
        required:true,
        default:false
    },
    on_going:{
        type:Boolean,
        default:false,
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    },
    installments:[InstallmentSchema]
    
},{timestamps:true})

const Loan=mongoose.model('Loan',LoanSchema)

export default Loan