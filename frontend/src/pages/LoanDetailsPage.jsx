import React,{useEffect} from 'react'
import {Container,Row,Col,ListGroup,Card,ListGroupItem, Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getLoanById, updateInstallment, updateLoan } from '../actions/loanActions'
import axios from 'axios'

const LoanDetailsPage = ({history}) => {



    const dispatch=useDispatch()
    

    const loanDetails=useSelector(state=>state.loanDetails)
    const {loading,error,loan}=loanDetails   

    const studentLogin =useSelector(state=>state.studentLogin)
    const {studentInfo}=studentLogin

    const lenderLogin =useSelector(state=>state.lenderLogin)
    const {lenderInfo}=lenderLogin

    const adminLogin =useSelector(state=>state.adminLogin)
    const {adminInfo}=adminLogin

    const installmentUpdate =useSelector(state=>state.installmentUpdate)
    const {success}=installmentUpdate
    
    useEffect(()=>{
        const id=window.location.pathname.split('/')[2]

        if(!studentInfo && !lenderInfo && !adminInfo){
            history.push('/')
        }else if(!loan){
            dispatch(getLoanById(id))
        }else if(success){
            dispatch(updateLoan(loan._id))
        }else{ 
            return
        }
               
    },[loan,dispatch,history,studentInfo,lenderInfo,adminInfo,success])



    const loadScript=(src)=> {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const __DEV__ = document.domain === 'localhost'


    const displayRazorpay= async(installment_amt,installment_id,loan_id)=> {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}else{
        }

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

		const {data} = await axios.post('/payment/razorpay',{installment_amt,installment_id,loan_id},config)

		const options = {
			key: __DEV__ ? 'rzp_test_lruq7Zad1wsULF' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Installment Payment',
			//description: '',
			//image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				alert('Payment Successfull...Please Refresh to see changes..!!!')
				dispatch(updateInstallment(loan_id,installment_id))
			},
			prefill: {
                name:studentInfo.name,
                email:studentInfo.email,
                contact:studentInfo.mobile_number
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}



    return (
        
        <Container>
            
          
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            <Row className='mt-5'>
                {loan && loan.verified ? <Message variant='success'>Loan Verification Done</Message>:<Message variant='danger'>Loan Un-verified</Message>}
            </Row>
                {/** THE FOLLOWING CONTENTS TO BE DISPLAYED WHEN STUDENT OR LENDER IS LOGGED IN  */}
                {((studentInfo || lenderInfo) && loan) && (
                <>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                            <h2>Loan Details</h2>
                            <p><strong>LOAN_ID: </strong>{loan._id}</p>
                            <p><strong>Heading: </strong> {loan.heading}</p>
                            <p><strong>Description: </strong> {loan.description}</p>
                            <p><strong>Amount: </strong> ₹{loan.total_amount}</p>
                            <p><strong>Duration: </strong> {loan.duration} Months</p>
                            <p><strong>Applied For Loan On: </strong> {new Date(loan.createdAt).toLocaleDateString("en-IN")}</p>
                            <p><strong>Status: </strong> {loan.completed?<Message variant='info'>Completed</Message>:loan.on_going?<Message variant='success'>On Going</Message>:<Message variant='info'>Loan not Granted yet</Message>}</p>
                            </ListGroupItem>
                            
                        </ListGroup>
                    </Col>
                    {studentInfo?(
                        <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2>Lender Details</h2>            
                                </ListGroupItem>
                                {loan.lender?(
                                    <>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Name</Col>
                                            <Col>{loan.lender.name}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Email</Col>
                                            <Col>{loan.lender.email_address}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Contact</Col>
                                            <Col>{loan.lender.mobile_number}</Col>
                                        </Row>
                                    </ListGroupItem>
                                </>
                                ):<Message variant='danger'>Loan not granted yet</Message>}
                                
                            </ListGroup>
                        </Card>
                    </Col>
                    ):(
                        <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2>Student Details</h2>            
                                </ListGroupItem>
                                {loan.student?(
                                    <>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Name</Col>
                                            <Col>{loan.student.name}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Email</Col>
                                            <Col>{loan.student.email_address}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Contact</Col>
                                            <Col>{loan.student.mobile_number}</Col>
                                        </Row>
                                    </ListGroupItem>
                                </>
                                ):<Message variant='danger'>Student Info not availabe ... Please contact Admin</Message>}
                                
                            </ListGroup>
                        </Card>
                    </Col>
                    )}
                    
                </Row>
                <Row>
                            <Col>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h2>Installment Details</h2>
                                    </ListGroupItem>
                                        {loan.installments.length===0?<Message variant='info'>Loan not started yet</Message>:(
                                                loan.installments.map(installment=>(
                                                    <ListGroupItem key={installment._id}>
                                                        <span className='d-flex'>
                                                            <p><strong>Amount: </strong>₹{installment.amount}</p>
                                                            <p className='ml-auto'><strong>Expires On: </strong>{new Date(installment.expiry).toLocaleDateString('en-IN')}</p>
                                                        </span>
                                                        <p><strong>isPaid: </strong> {installment.is_paid?'Paid':'Not Paid'}</p>
                                                        <p><strong>Payment Method: </strong> {installment.is_paid ? installment.payment_details.method:''}</p>
                                                        <p><strong>Paid At: </strong> {installment.is_paid?new Date(installment.paid_at).toLocaleDateString("en-IN"):''}</p>
                                                        {studentInfo && (installment.is_paid ? <p><strong>Transaction ID: </strong>{installment.payment_details.order_id}</p>:
                                                        <Button onClick={()=>displayRazorpay(installment.amount,installment._id,loan._id)}>Pay Now</Button>)}
                                                    </ListGroupItem>
                                                ))
                                            )
                                        }

                                </ListGroup>
                            </Col>
                        </Row>
            </>
                )}
            {/**THE FOLLOWING CONTENTS TO BE DISPLAYED WHEN ADMIN IS LOGGED IN */}
                {(adminInfo && loan) && (
                    <>
                        <Row>
                            <Col>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                    <h2>Loan Details</h2>
                                    <p><strong>LOAN_ID: </strong>{loan._id}</p>
                                    <p><strong>Heading: </strong> {loan.heading}</p>
                                    <p><strong>Description: </strong> {loan.description}</p>
                                    <p><strong>Amount: </strong> ₹{loan.total_amount}</p>
                                    <p><strong>Duration: </strong> {loan.duration} Months</p>
                                    <p><strong>Applied For Loan On: </strong> {loan.createdAt}</p>
                                    <p><strong>Status: </strong> {loan.completed?<Message variant='info'>Completed</Message>:loan.on_going?<Message variant='success'>On Going</Message>:<Message variant='info'>Loan not Granted yet</Message>}</p>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <h2>Lender Details</h2>            
                                        </ListGroupItem>
                                        {loan.lender?
                                            (
                                                <>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Name</Col>
                                                            <Col>{loan.lender.name}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Email</Col>
                                                            <Col>{loan.lender.email_address}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Contact</Col>
                                                            <Col>{loan.lender.mobile_number}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                </>
                                            ):<Message variant='danger'>Loan not granted yet</Message>
                                
                                        }
                                    </ListGroup>
                                </Card>
                            </Col>
                            
                            <Col md={6}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <h2>Student Details</h2>            
                                        </ListGroupItem>
                                        {loan.student?(
                                            <>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col>Name</Col>
                                                        <Col>{loan.student.name}</Col>
                                                    </Row>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col>Email</Col>
                                                        <Col>{loan.student.email_address}</Col>
                                                    </Row>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col>Contact</Col>
                                                        <Col>{loan.student.mobile_number}</Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </>
                                        ):<Message variant='danger'>Student Info not availabe ... Please contact Admin</Message>
                                        }
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h2>Installment Details</h2>
                                    </ListGroupItem>
                                        {loan.installments.length===0?<Message variant='info'>Loan not started yet</Message>:(
                                                loan.installments.map(installment=>(
                                                    <ListGroupItem  key={installment._id}>
                                                        <span className='d-flex'>
                                                            <p><strong>Amount: </strong>₹{installment.amount}</p>
                                                            <p className='ml-auto'><strong>Expires On: </strong>{new Date(installment.expiry).toLocaleDateString('en-IN')}</p>
                                                        </span>
                                                        <p><strong>isPaid: </strong> {installment.is_paid?'Paid':'Not Paid'}</p>
                                                        <p><strong>Payment Method: </strong> {installment.is_paid?installment.payment_method:''}</p>
                                                        <p><strong>Paid At: </strong> {installment.is_paid?new Date(installment.paid_at).toLocaleDateString("en-IN"):''}</p>
                                                    </ListGroupItem>
                                                ))
                                            )
                                        }

                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )}                
            
            
        </Container>
    )
}

export default LoanDetailsPage
