export const loanCreateReducer=(state={},action)=>{
    switch(action.type){
        case 'LOAN_CREATE_REQUEST':
            return{
                loading:true
            }
        case 'LOAN_CREATE_SUCCESS':
            return{
                loading:false,
                success:true,
                loan:action.payload
            }
        case 'LOAN_CREATE_FAILED':
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const studentLoanDetailsReducer =(state={loans:[]},action)=>{
    switch(action.type){
        case 'STUDENT_LOAN_DETAILS_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'STUDENT_LOAN_DETAILS_SUCCESS':
            return{
                loading:false,
                loans:action.payload
            }
        case 'STUDENT_LOAN_DETAILS_FAILED':
            return{
                loading:false,
                error:action.payload
            }
        case 'STUDENT_LOAN_DETAILS_RESET':
            return {loans:[]}
        default:
            return state
    }
}

export const loanDetailsReducer =(state={},action)=>{
    switch(action.type){
        case 'LOAN_DETAILS_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'LOAN_DETAILS_SUCCESS':
            return{
                loading:false,
                loan:action.payload
            }
        case 'LOAN_DETAILS_FAILED':
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const loanGrantReducer =(state={},action)=>{
    switch(action.type){
        case 'LOAN_GRANT_REQUEST':
            return{loading:true}
        case 'LOAN_GRANT_SUCCESS':
            return{loading:false,success:true,loan:action.payload}
        case 'LOAN_GRANT_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const lenderLoanDetailsReducer =(state={loans:[]},action)=>{
    switch(action.type){
        case 'LENDER_LOAN_DETAILS_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'LENDER_LOAN_DETAILS_SUCCESS':
            return{
                loading:false,
                loans:action.payload
            }
        case 'LENDER_LOAN_DETAILS_FAILED':
            return{
                loading:false,
                error:action.payload
            }
        case 'LENDER_LOAN_DETAILS_RESET':
            return {loans:[]}
        default:
            return state
    }
}

export const installmentUpdateReducer =(state={},action)=>{
    switch(action.type){
        case 'INSTALLMENT_UPDATE_REQUEST':
            return{loading:true}
        case 'INSTALLMENT_UPDATE_SUCCESS':
            return{loading:false,success:true,loan:action.payload}
        case 'INSTALLMENT_UPDATE_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }    
}

export const loanCompleteReducer =(state={},action)=>{
    switch(action.type){
        case 'LOAN_COMPLETE_REQUEST':
            return{loading:true}
        case 'LOAN_COMPLETE_SUCCESS':
            return{loading:false,success:true,loan:action.payload}
        case 'LOAN_COMPLETE_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }    
}