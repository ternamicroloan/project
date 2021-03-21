import React, { useEffect } from  'react'
import {Container,Accordion,Card,Media} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { getLoanByStudentId } from '../actions/loanActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const StudentMyActivity = ({history}) => {

    const dispatch=useDispatch()

    const studentLoanDetails=useSelector(state=>state.studentLoanDetails)
    const {loading,error,loans}=studentLoanDetails
    
    const studentLogin=useSelector(state=>state.studentLogin)
    const {studentInfo} =studentLogin

    const unverifiedLoans=[]
    const pendingLoans=[]
    const ongoingLoans=[]
    const completedLoans=[]


        loans.forEach(loan=>{
            if(!loan.verified){
                unverifiedLoans.push(loan)
            }
            if(loan.on_going){
                ongoingLoans.push(loan)
            }
            if(!loan.granted && loan.verified){
                pendingLoans.push(loan)
            }
            if(loan.completed){
                completedLoans.push(loan)
            }
        })

    useEffect(()=>{
        if(studentInfo){
            dispatch(getLoanByStudentId(studentInfo._id))
        }else{
            history.push('/studentlogin')
        }
    },[dispatch,history,studentInfo])
    


 return(
        <>
            {loading && <Loader/> }
            {error && <Message variant='danger'>{error}</Message>}
            <Container style={{marginTop:'2%'}}>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                                On Going Loans
                            </Accordion.Toggle>
                        </Card.Header>
                            {ongoingLoans.length===0?(
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Media>
                                        <Media.Body>There are no On-Going Loans</Media.Body>
                                    </Media>
                                </Card.Body>
                            </Accordion.Collapse>

                            ):(
                                ongoingLoans.map(loan=>(
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Card style={{ width: '18rem' , margin:'4px'}}>
                                        <Card.Body>
                                            <Card.Title>{loan.heading}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">₹{loan.total_amount}</Card.Subtitle>
                                            <Card.Text>
                                                {loan.description}
                                            </Card.Text>
                                            <Card.Link href={`/loans/${loan._id}`}>View Details</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Accordion.Collapse>

                                ))    
                            )}
                            
                    </Card>
                </Accordion>
            </Container>
            <Container style={{marginTop:'2%'}}>

                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                Pending Loans
                            </Accordion.Toggle>
                        </Card.Header>
                            {pendingLoans.length===0?(
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                    <Media>
                                        <Media.Body>There are no Pending Loans</Media.Body>
                                    </Media>
                                </Card.Body>
                        </Accordion.Collapse>
                            
                            ):(
                                pendingLoans.map(loan=>(
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Card style={{ width: '18rem' , margin:'4px'}}>
                                        <Card.Body>
                                            <Card.Title>{loan.heading}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">₹{loan.total_amount}</Card.Subtitle>
                                            <Card.Text>
                                                {loan.description}
                                            </Card.Text>
                                            <Card.Link href={`/loans/${loan._id}`}>View Details</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                        </Accordion.Collapse>
                                
                                ))    
                            )}
                            
                    </Card>
                </Accordion>
            </Container>
            <Container style={{marginTop:'2%'}}>

                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                                Unverified Loans
                            </Accordion.Toggle>
                        </Card.Header>
                            {unverifiedLoans.length===0?(
                        <Accordion.Collapse eventKey="3">

                                <Card.Body>
                                    <Media>
                                        <Media.Body>There are no Un-verified Loans</Media.Body>
                                    </Media>
                                </Card.Body>
                        </Accordion.Collapse>

                            ):(
                                unverifiedLoans.map(loan=>(
                        <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <Card style={{ width: '18rem' , margin:'4px'}}>
                                        <Card.Body>
                                            <Card.Title>{loan.heading}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">₹{loan.total_amount}</Card.Subtitle>
                                            <Card.Text>
                                                {loan.description}
                                            </Card.Text>
                                            <Card.Link href={`/loans/${loan._id}`}>View Details</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                        </Accordion.Collapse>

                                ))    
                            )}
                            
                    </Card>
                    </Accordion>
                </Container>
            <Container style={{marginTop:'2%'}}>

                    <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                                Completed Loans
                            </Accordion.Toggle>
                        </Card.Header>
                            {completedLoans.length===0?(
                        <Accordion.Collapse eventKey="4">

                                <Card.Body>
                                    <Media>
                                        <Media.Body>There are no Completed Loans</Media.Body>
                                    </Media>
                                </Card.Body>
                        </Accordion.Collapse>

                            ):(
                                completedLoans.map(loan=>(
                        <Accordion.Collapse eventKey="4">
                                <Card.Body >
                                    <Card style={{ width: '18rem' , margin:'4px'}}>
                                        <Card.Body>
                                            <Card.Title>{loan.heading}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">₹{loan.total_amount}</Card.Subtitle>
                                            <Card.Text>
                                                {loan.description}
                                            </Card.Text>
                                            <Card.Link href={`/loans/${loan._id}`}>View Details</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                        </Accordion.Collapse>

                                ))    
                            )}
                            
                    </Card>
                        

                </Accordion>
            </Container>
        </>
    )
}

export default StudentMyActivity