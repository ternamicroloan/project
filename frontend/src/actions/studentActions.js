import axios from 'axios'

export const loginStudent =(email,password,email_verified)=>async(dispatch)=>{
    try{
        dispatch({
            type:'STUDENT_LOGIN_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/student/login',{email,password,email_verified},config)

        dispatch({
            type:'STUDENT_LOGIN_SUCCESS',
            payload:data
        })

        localStorage.setItem('studentInfo',JSON.stringify(data))
    }catch(error){
        dispatch({
            type:'STUDENT_LOGIN_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const logoutStudent =()=>(dispatch)=>{
    localStorage.removeItem('studentInfo')
    dispatch({type:'STUDENT_DETAILS_RESET'})
    dispatch({type:'STUDENT_LOGOUT'})
}

export const signupStudent =(student)=>async(dispatch)=>{

    try {
        dispatch({
            type:'STUDENT_SIGNUP_REQUEST'
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/student/signup',student,config)
        console.log(data);
        dispatch({
            type:'STUDENT_SIGNUP_SUCCESS',
            payload:data
        })

        dispatch({
            type:'STUDENT_LOGIN_SUCCESS',
            payload:data
        })

        localStorage.setItem('studentInfo',JSON.stringify(data))



    } catch (error) {
        dispatch({
            type:'STUDENT_SIGNUP_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const getStudentDetails = (id) =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:'STUDENT_DETAILS_REQUEST'
        })

        const {studentLogin:{studentInfo}}=getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${studentInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/student/${id}`,config)

        dispatch({
            type:'STUDENT_DETAILS_SUCCESS',
            payload:data
        })

    }catch(error){
        dispatch({
            type:'STUDENT_DETAILS_FAILED',
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const updateStudentProfile =(student) => async(dispatch,getState)=>{
    
    try {
        dispatch({
            type:'STUDENT_UPDATE_PROFILE_REQUEST'
        })


        const {studentLogin:{studentInfo}}=getState()//required for token
        
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${studentInfo.token}`
            }
        }


        //If logged in as admin the id will be present in student object provided as props to function else it will be present in studentInfo
        const {data} = await axios.put(`/api/student/${studentInfo?studentInfo._id:student.id}`,student,config)
        
        dispatch({
            type:'STUDENT_UPDATE_PROFILE_SUCCESS',
            payload:data
        })

    } catch (error) {
        dispatch({
            type:'STUDENT_UPDATE_PROFILE_FAILED',
            error:error.response && error.response.data.message?error.response.data.message:error.message
        })
        
    }
}