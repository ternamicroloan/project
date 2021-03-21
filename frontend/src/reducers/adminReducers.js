export const adminLoginReducer=(state={ },action)=>{
    switch(action.type){
        case 'ADMIN_LOGIN_REQUEST':
            return{loading:true}
        case 'ADMIN_LOGIN_SUCCESS':
            return{loading:false,adminInfo:action.payload}
        case 'ADMIN_LOGIN_FAILED':
            return{loading:false,error:action.payload}
        case 'ADMIN_LOGOUT':
            return{}
        default:
            return state
    }
}

export const lenderListReducer =(state={lenders:[]},action)=>{
    switch(action.type){
        case 'GET_ALL_LENDERS_REQUEST':
            return{loading:true}
        case 'GET_ALL_LENDERS_SUCCESS':
            return{loading:false,lenders:action.payload}
        case 'GET_ALL_LENDERS_FAILED':
            return{loading:false,error:action.payload}
        case 'GET_ALL_LENDERS_RESET':
            return{lenders:[]}
        default:
            return state
        
    }
}

export const studentListReducer =(state={students:[]},action)=>{
    switch(action.type){
        case 'GET_ALL_STUDENTS_REQUEST':
            return{loading:true}
        case 'GET_ALL_STUDENTS_SUCCESS':
            return{loading:false,students:action.payload}
        case 'GET_ALL_STUDENTS_FAILED':
            return{loading:false,error:action.payload}
        case 'GET_ALL_STUDENTS_RESET':
            return{students:[]}
        default:
            return state
        
    }
}

export const studentDeleteReducer = (state={},action)=>{
    switch(action.type){
        case 'DELETE_STUDENT_REQUEST':
            return{loading:true}
        case 'DELETE_STUDENT_SUCCESS':
            return{loading:false,success:true}
        case 'DELETE_STUDENT_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }
}


export const lenderDeleteReducer = (state={},action)=>{
    switch(action.type){
        case 'DELETE_LENDER_REQUEST':
            return{loading:true}
        case 'DELETE_LENDER_SUCCESS':
            return{loading:false,success:true}
        case 'DELETE_LENDER_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const loanListReducer =(state={loans:[]},action)=>{
    switch(action.type){
        case 'GET_ALL_LOANS_REQUEST':
            return{loading:true}
        case 'GET_ALL_LOANS_SUCCESS':
            return{loading:false,loans:action.payload}
        case 'GET_ALL_LOANS_FAILED':
            return{loading:false,error:action.payload}
        case 'GET_ALL_LOANS_RESET':
            return{loans:[]}
        default:
            return state
        
    }
}

export const loanVerifyReducer = (state={},action)=>{
    switch(action.type){
        case 'LOAN_VERIFY_REQUEST':
            return{loading:true}
        case 'LOAN_VERIFY_SUCCESS':
            return{loading:false,success:true}
        case 'LOAN_VERIFY_FAILED':
            return{loading:false,error:action.payload}
        default:
            return state
    }
}