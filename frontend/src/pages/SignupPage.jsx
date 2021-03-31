import {useDispatch,useSelector} from 'react-redux'
import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { signupStudent } from '../actions/studentActions'
import { signupLender } from '../actions/lenderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const SignupPage = ({history,location}) => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    const dispatch=useDispatch()

    const studentSignUp =useSelector(state=>state.studentSignUp)
    const {loading:studentLoading,error:studentError,studentInfo}=studentSignUp

    
    const lenderSignUp =useSelector(state=>state.lenderSignUp)
    const {loading:lenderLoading,error:lenderError,lenderInfo}=lenderSignUp

    const url = window.location.pathname.split('/')[2]
    useEffect(()=>{
        if(studentInfo){
            history.push('/student')
        }else if(lenderInfo){
            history.push('/lender')
        }
    },[history,studentInfo,lenderInfo])
    
    
    let user={}

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not Match')
        }else{
            if(url==='student'){
                user={name,email,password}
                dispatch(signupStudent(user))
            }else if(url==='lender'){
                user={name,email,password}
                dispatch(signupLender(user))
            } 
        }
    }


    const responseSuccessGoogle = async(response) => {
        const {data}= await axios.post('/googlelogin',{tokenId:response.tokenId})
        const {username,useremail,email_verified}=data
        console.log(email_verified);
        if(email_verified){
            console.log('inside if else');
            if(url==='student'){
                user={name:username,email:useremail,email_verified}
                console.log(user);
                dispatch(signupStudent(user))
            }else if(url==='lender'){
                user={name:username,email:useremail,email_verified}
                dispatch(signupLender(user))
            }
        }else{
            setMessage('Sign UP Failed')
        }
    }

    const responseErrorGoogle =(response)=>{
        console.log(response);
        setMessage('Sign Up Failed..Please try again')
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {(studentLoading || lenderLoading) && <Loader/>}
            {message && <Message variant='danger'>{message}</Message>}
            {(studentError || lenderError) && <Message variant='danger'>{studentError?studentError:lenderError}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='input' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                <Row>
                    <Col md={6}>
                        <Button type='submit' variant='primary' style={{paddingRight:'10px'}}>Sign Up</Button>
                    </Col>
                    <Col md={6}>
                        <GoogleLogin
                        clientId={process.env.GOOGLE_CLIENT}
                        buttonText="Sign Up"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                        theme='dark'
                        />
                    </Col>

                </Row>
                
                <Row style={{paddingTop:'20px'}}>
                    <Col>Already a User ? {url==='student'?<Link to={'/studentlogin'}>Login</Link>:<Link to={'/lenderlogin'}>Login</Link>}</Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SignupPage
