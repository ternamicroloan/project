import {useDispatch,useSelector} from 'react-redux'
import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { signupStudent } from '../actions/studentActions'
import { signupLender } from '../actions/lenderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SignupPage = ({history,location}) => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [mobileNumber,setMobileNumber]=useState(0)
    const [collegeID,setCollegeID]=useState('')
    const [adhaarNumber,setAdhaarNumber]=useState('')
    const [guardianAdhaarNumber,setGuardianAdhaarNumber]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [zipCode,setZipCode]=useState(0)
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
                user={name,email,password,mobileNumber,collegeID,adhaarNumber,guardianAdhaarNumber,address,city,state,zipCode}
                dispatch(signupStudent(user))
            }else if(url==='lender'){
                user={name,email,password,mobileNumber,adhaarNumber,address,city,state,zipCode}
                dispatch(signupLender(user))
            } 
        }
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
                    <Form.Group as={Col}>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type='integer' placeholder='Enter Mobile No.' value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='input' placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)}  />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select"  value={state} onChange={(e)=>setState(e.target.value)} >
                            <option value=''>Choose...</option>
                            <option value='Maharashtra'>Maharashtra</option>
                            <option value='Delhi'>Delhi</option>
                            <option value='Karnataka'>Karnataka</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control  type='integer' placeholder='ZipCode' value={zipCode} onChange={(e)=>setZipCode(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                {url==='student'?(<>
                    <Form.Group>
                        <Form.Label>College ID</Form.Label>
                        <Form.Control type='input' placeholder='Enter College ID' value={collegeID} onChange={(e)=>setCollegeID(e.target.value)}  />
                    </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Adhaar Number</Form.Label>
                        <Form.Control type='text' placeholder='Enter student Adhaar No.' value={adhaarNumber} onChange={(e)=>setAdhaarNumber(e.target.value)}  />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Guardian Adhaar Number</Form.Label>
                        <Form.Control type='text' placeholder='Enter guardian Adhaar No.' value={guardianAdhaarNumber} onChange={(e)=>setGuardianAdhaarNumber(e.target.value)}  />
                    </Form.Group>
                </Form.Row>
                </>
                ):(<Form.Group>
                    <Form.Label>Adhaar Number</Form.Label>
                    <Form.Control type='text' placeholder='Enter Adhaar No.' value={adhaarNumber} onChange={(e)=>setAdhaarNumber(e.target.value)}  />
                </Form.Group>)}
                
                <Button type='submit' variant='primary'>Sign Up</Button>
                <Row style={{paddingTop:'20px'}}>
                    <Col>Already a User ? {url==='student'?<Link to={'/studentlogin'}>Login</Link>:<Link to={'/lenderlogin'}>Login</Link>}</Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SignupPage
