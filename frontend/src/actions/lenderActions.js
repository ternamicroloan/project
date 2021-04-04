import axios from 'axios'

export const loginLender =(email,password,email_verified)=>async(dispatch)=>{
    try{
        dispatch({
            type:'LENDER_LOGIN_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/lender/login',{email,password,email_verified},config)

        dispatch({
            type:'LENDER_LOGIN_SUCCESS',
            payload:data
        })

        localStorage.setItem('lenderInfo',JSON.stringify(data))
    }catch(error){
        dispatch({
            type:'LENDER_LOGIN_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const logoutLender =()=>(dispatch)=>{
    localStorage.removeItem('lenderInfo')
    dispatch({type:'LENDER_LOGOUT'})
}

export const signupLender =(lender)=>async(dispatch)=>{
    try {
        dispatch({
            type:'LENDER_SIGNUP_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/lender/signup',lender,config)

        dispatch({
            type:'LENDER_SIGNUP_SUCCESS',
            payload:data
        })

        dispatch({
            type:'LENDER_LOGIN_SUCCESS',
            payload:data
        })

        localStorage.setItem('lenderInfo',JSON.stringify(data))



    } catch (error) {
        dispatch({
            type:'LENDER_SIGNUP_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}


export const getLenderDetails = (id) =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'LENDER_DETAILS_REQUEST'
        })

        const {lenderLogin:{lenderInfo}}=getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${lenderInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/lender/${id}`,config)

        dispatch({
            type:'LENDER_DETAILS_SUCCESS',
            payload:data
        })

    }catch(error){
        dispatch({
            type:'LENDER_DETAILS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const updateLenderProfile =(lender) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:'LENDER_UPDATE_PROFILE_REQUEST'
        })

        const {lenderLogin:{lenderInfo}}=getState()//required for token

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${lenderInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/lender/${lenderInfo?lenderInfo._id:lender.id}`,lender,config)

        dispatch({
            type:'LENDER_UPDATE_PROFILE_SUCCESS',
            payload:data
        })

    } catch (error) {
        dispatch({
            type:'LENDER_UPDATE_PROFILE_FAILED',
            error:error.response && error.response.data.message?error.response.data.message:error.message
        })
        
    }
}
