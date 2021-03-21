import axios from 'axios'

export const loginAdmin =(email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:'ADMIN_LOGIN_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/admin/login',{email,password},config)

        dispatch({
            type:'ADMIN_LOGIN_SUCCESS',
            payload:data
        })

        

        localStorage.setItem('adminInfo',JSON.stringify(data))

    }catch(error){
        dispatch({
            type:'ADMIN_LOGIN_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const logoutAdmin =()=>(dispatch)=>{
    localStorage.removeItem('adminInfo')
    dispatch({type:'GET_ALL_STUDENTS_RESET'})
    dispatch({type:'GET_ALL_LENDERS_RESET'})
    dispatch({type:'ADMIN_LOGOUT'})
}

export const getAllLender = () =>async(dispatch)=>{
    try{
        dispatch({
            type:'GET_ALL_LENDERS_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.get(`/admin/lenders`,config)

        dispatch({
            type:'GET_ALL_LENDERS_SUCCESS',
            payload:data
        })

    }catch(error){
        dispatch({
            type:'GET_ALL_LENDERS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const getAllStudent = () =>async(dispatch)=>{
    try{
        dispatch({
            type:'GET_ALL_STUDENTS_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.get(`/admin/students`,config)

        dispatch({
            type:'GET_ALL_STUDENTS_SUCCESS',
            payload:data
        })

    }catch(error){
        dispatch({
            type:'GET_ALL_STUDENTS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const deleteStudent =(id)=>async(dispatch)=>{
    try{
    dispatch({
        type:'DELETE_STUDENT_REQUEST'
    })

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    await axios.delete(`/admin/students/${id}`,config)

    dispatch({
        type:'DELETE_STUDENT_SUCCESS',
    })

    }catch(error){
    dispatch({
        type:'DELETE_STUDENT_FAILED',
        payload:error.response && error.response.data.message?error.response.data.message:error.message
    })    
    }
}

export const deleteLender =(id)=>async(dispatch)=>{
    try{
    dispatch({
        type:'DELETE_LENDER_REQUEST'
    })

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    await axios.delete(`/admin/lenders/${id}`,config)

    dispatch({
        type:'DELETE_LENDER_SUCCESS',
    })

    }catch(error){
    dispatch({
        type:'DELETE_LENDER_FAILED',
        payload:error.response && error.response.data.message?error.response.data.message:error.message
    })    
    }
}

export const getAllLoan = () =>async(dispatch)=>{
    try{
        dispatch({
            type:'GET_ALL_LOANS_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.get(`/admin/loans`,config)

        dispatch({
            type:'GET_ALL_LOANS_SUCCESS',
            payload:data
        })

    }catch(error){
        dispatch({
            type:'GET_ALL_LOANS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const verifyLoan = (loan)=>async(dispatch)=>{
    try{
        dispatch({
            type:'LOAN_VERIFY_REQUEST'
        })
    
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        await axios.put(`/admin/loans/${loan.id}/verified`,loan,config)
    
        dispatch({
            type:'LOAN_VERIFY_SUCCESS',
        })
    
        }catch(error){
        dispatch({
            type:'LOAN_VERIFY_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })    
        }
}