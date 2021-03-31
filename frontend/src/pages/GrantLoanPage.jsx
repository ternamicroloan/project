import React,{useEffect} from 'react'
import { Container,  ButtonGroup  , Jumbotron , Media ,Button} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllLoan} from '../actions/adminActions'
import { grantLoan } from '../actions/loanActions'

const GrantLoanPage = ({history}) => {

    const dispatch=useDispatch()

    const loanList=useSelector(state=>state.loanList)
    const {loans,error,loading}=loanList

    const lenderLogin =useSelector(state=>state.lenderLogin)
    const {lenderInfo}=lenderLogin


    const available_loans =[] 
    loans && loans.forEach(loan=>{
        if(loan.verified===true && loan.granted!==true){
            available_loans.push(loan)
        }
    })

    useEffect(()=>{
        if(!lenderInfo){
            history.pushState('/lenderlogin')
        }else{
            dispatch(getAllLoan())
        }
    },[dispatch,history,lenderInfo])

    const viewDetailsHandler = (id) =>{
        history.push(`/loans/${id}`)
    }

    const acceptHandler =(id,emi,duration) =>{

       const installments=[]
       for(var i=0;i<duration;i++){
            installments.push({amount:emi,is_paid:false,payment_details:{}})
       }

       const granted=true
       const on_going=true
       const lender=lenderInfo._id
       const loan={id,lender,installments,granted,on_going}

        dispatch(grantLoan(loan))
    }

    return (
        <Container >
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {loans && available_loans.length===0?<Message variant='info'>No loans available to grant right now .. Please come back later!!!</Message>:''}
            {loans && (
                <>
                {available_loans.map(loan=>(
                    
                            <Jumbotron className='mt-3' key={loan._id}>
                                <Media>
                                    <Media.Body>
                                        <span className='d-flex'>
                                        <h5>{loan.student.name}</h5>
                                        <h5 className='ml-auto'>₹{loan.total_amount}</h5>
                                        </span>
                                        <h6>{loan.heading}</h6>
                                        <p>{loan.description}</p>
                                        <ButtonGroup>
                                            <Button variant="success" className='mr-3' onClick={()=>acceptHandler(loan._id,loan.monthly_emi,loan.duration)}>Accept</Button>
                                            <Button variant="outline-danger">Reject</Button>
                                            <Button variant="link" onClick={()=>viewDetailsHandler(loan._id)}>View Details</Button>
                                        </ButtonGroup>
                                    </Media.Body>
                                </Media>

                            </Jumbotron>
                )
                )}
        
            </>
            )}
                
            </Container>
        
    )
}

export default GrantLoanPage
