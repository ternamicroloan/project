import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { loginStudent} from '../actions/studentActions'
import {loginLender} from '../actions/lenderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { loginAdmin,getAllStudent,getAllLender } from '../actions/adminActions'

const LoginPage = ({history,location}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const dispatch = useDispatch()

    const studentLogin=useSelector(state=>state.studentLogin)
    const{loading:studentLoading,error:studentError,studentInfo}=studentLogin

    const lenderLogin=useSelector(state=>state.lenderLogin)
    const{loading:lenderLoading,error:lenderError,lenderInfo}=lenderLogin

    const adminLogin=useSelector(state=>state.adminLogin)
    const {loading:adminLoading,error:adminError,adminInfo}=adminLogin

    const url=window.location.pathname

    useEffect(()=>{
        if(studentInfo){
            history.push('/student')
        }else if(lenderInfo){
            history.push('/lender')
        }else if(adminInfo){
            history.push('/admin')
        }
    },[history,studentInfo,lenderInfo,adminInfo,dispatch])

    const submitHandler =(e)=>{
        e.preventDefault()
        if(url==='/studentlogin'){
            dispatch(loginStudent(email,password))
        }else if(url==='/lenderlogin'){
            dispatch(loginLender(email,password))
        }else if(url==='/adminlogin'){
            dispatch(loginAdmin(email,password))
        }

        
    }



    return (
        <>
            <FormContainer>
                <h1>Login</h1>
                {(studentError ||  lenderError || adminError) && <Message variant='danger'>Invalid Email or Password</Message>}
                {(studentLoading || lenderLoading || adminLoading) && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant='primary'>Login</Button>
                    <Row style={{paddingTop:'20px'}}>
                        <Col>Not a User? 
                            {url==='/studentlogin'?<Link to={'/signup/student'}>Register</Link>:<Link to={'/signup/lender'}>Register</Link>}
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </>
    )
    }

export default LoginPage
