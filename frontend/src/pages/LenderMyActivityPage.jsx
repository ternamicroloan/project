import React,{useEffect} from  'react'
import {Container,Accordion,Card,Media} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getLoanByLenderId, getLoanById } from '../actions/loanActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LenderMyActivityPage = ({history}) => {
    const dispatch=useDispatch()

    const lenderLoanDetails=useSelector(state=>state.lenderLoanDetails)
    const {loading,error,loans}=lenderLoanDetails
    
    const lenderLogin=useSelector(state=>state.lenderLogin)
    const {lenderInfo} =lenderLogin

    const ongoingLoans=[]
    const completedLoans=[]


        loans.forEach(loan=>{
            if(loan.on_going){
                ongoingLoans.push(loan)
            }
            if(loan.completed){
                completedLoans.push(loan)
            }
        })

    useEffect(()=>{
        if(lenderInfo){
            dispatch(getLoanByLenderId(lenderInfo._id))
        }else{
            history.push('/lenderlogin')
        }
    },[dispatch,history,lenderInfo])
    

    const viewDetailsHandler=(id)=>{
        dispatch(getLoanById(id))
        history.push(`/loans/${id}`)
    }


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
                                        <Media>
                                            <Media.Body>
                                                <h4>Student Name: {loan.student.name}</h4>
                                                <h6>{loan.heading}</h6>
                                                <p>{loan.description}</p>
                                                
                                                <Link className='btn btn-light my-3' onClick={()=>viewDetailsHandler(loan._id)}>View Details</Link>
                                                
                                            </Media.Body>
                                        </Media>
                                    </Card.Body>
                            </Accordion.Collapse>

                                ))    
                            )}
                    </Card>
                </Accordion>
            </Container>
            <Container style={{marginTop:'2%'}}>
                <Accordion defaultActiveKey="2">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                Finished Loans
                            </Accordion.Toggle>
                        </Card.Header>
                        {completedLoans.length===0?(
                        <Accordion.Collapse eventKey="2">

                                <Card.Body>
                                    <Media>
                                        <Media.Body>There are no Completed Loans</Media.Body>
                                    </Media>
                                </Card.Body>
                        </Accordion.Collapse>

                            ):(
                                completedLoans.map(loan=>(
                        <Accordion.Collapse eventKey="2">

                                    <Card.Body >
                                        <Media>
                                            <Media.Body>
                                                <h4>Student Name: {loan.student.name}</h4>
                                                <h6>{loan.heading}</h6>
                                                <p>{loan.description}</p>
                                                <Link className='btn btn-light my-3' to={`/loans/${loan._id}`}>View Details</Link>
                                            </Media.Body>
                                        </Media>
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

export default LenderMyActivityPage