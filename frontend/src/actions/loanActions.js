import axios from 'axios'

export const createLoan =(loan)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'LOAN_CREATE_REQUEST'
        })

        const {studentLogin:{studentInfo}}=getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${studentInfo.token}`
            }
        }

        const {data}=await axios.post('/loans',loan,config)

        dispatch({
            type:'LOAN_CREATE_SUCCESS',
            payload:data
        })
    }catch(error){
        dispatch({
           type:'LOAN_CREATE_FAILED',
           payload:error.response && error.response.data.message?error.response.data.message:error.message 
        })
    }
}

export const getLoanByStudentId =(student_id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'STUDENT_LOAN_DETAILS_REQUEST'
        })

        const {studentLogin:{studentInfo}} = getState()


        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${studentInfo.token}`
            }
        }

        const {data}=await axios.get(`/loans/student/${student_id}`,config)

        dispatch({
            type:'STUDENT_LOAN_DETAILS_SUCCESS',
            payload:data
        })
    }catch(error){
        dispatch({
            type:'STUDENT_LOAN_DETAILS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message 
        })
    }
}

export const getLoanById = (loan_id) =>async(dispatch)=>{
    try{
        dispatch({
            type:'LOAN_DETAILS_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} =await axios.get(`/loans/${loan_id}`,config)

        dispatch({
            type:'LOAN_DETAILS_SUCCESS',
            payload:data
        })
    }catch(error){
        dispatch({
            type:'LOAN_DETAILS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message 
        })
    }
}

export const grantLoan = (loan)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'LOAN_GRANT_REQUEST'
        })
    
        const {lenderLogin:{lenderInfo}}=getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${lenderInfo.token}`

            }
        }
    
        const {data}=await axios.put(`/loans/${loan.id}/granted`,loan,config)
    
        dispatch({
            type:'LOAN_GRANT_SUCCESS',
            payload:data
        })
    
        }catch(error){
        dispatch({
            type:'LOAN_GRANT_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })    
        }
}

export const getLoanByLenderId =(lender_id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'LENDER_LOAN_DETAILS_REQUEST'
        })

        const {lenderLogin:{lenderInfo}}=getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${lenderInfo.token}`
            }
        }

        const {data}=await axios.get(`/loans/lender/${lender_id}`,config)

        dispatch({
            type:'LENDER_LOAN_DETAILS_SUCCESS',
            payload:data
        })
    }catch(error){
        dispatch({
            type:'LENDER_LOAN_DETAILS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message 
        })
    }
}

export const updateInstallment =(loan_id,installment_id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'INSTALLMENT_UPDATE_REQUEST'
        })

        const {studentLogin:{studentInfo}}=getState()


        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${studentInfo.token}`
            }
        }

        const {data}=await axios.put(`/loans/${loan_id}/installments/${installment_id}`,config)

        dispatch({
            type:'INSTALLMENT_UPDATE_SUCCESS',
            payload:data
        })
    }catch(error){
        dispatch({
            type:'INSTALLMENT_UPDATE_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message 
        })
    }
}

export const updateLoan = (loan_id)=>async(dispatch)=>{
    try{
        dispatch({
            type:'LOAN_COMPLETE_REQUEST'
        })
    
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const {data}=await axios.put(`/loans/${loan_id}/completed`,config)
    
        dispatch({
            type:'LOAN_COMPLETE_SUCCESS',
            payload:data
        })
    
        }catch(error){
        dispatch({
            type:'LOAN_COMPLETE_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })    
        }    
}