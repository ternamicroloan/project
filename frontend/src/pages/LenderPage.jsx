import React ,{useEffect} from 'react'
import { Container, Card,CardGroup , ButtonGroup  , Jumbotron , Row , Col , ResponsiveEmbed , Image , Media ,Button} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import userImage from '../images/lender1.jpeg'
import Message from '../components/Message'
import { grantLoan,getLoanByLenderId } from '../actions/loanActions'
import {getAllLoan} from '../actions/adminActions'
import Loader from '../components/Loader'


const LenderPage = ({history}) => {

    const dispatch=useDispatch()

    const lenderLogin = useSelector(state=>state.lenderLogin)
    const {lenderInfo}=lenderLogin

    const loanList=useSelector(state=>state.loanList)
    const {loans,error,loading}=loanList

    const lenderLoanDetails=useSelector(state=>state.lenderLoanDetails)
    const {loading:lenderLoading,error:lenderError,loans:lenderLoans}=lenderLoanDetails
    

    const available_loans =[] 
    loans && loans.forEach(loan=>{
        if(loan.verified===true && loan.granted!==true){
            available_loans.push(loan)
        }
    })

    
    const ongoingLoans=[]
    lenderLoans.forEach(loan=>{
        if(loan.on_going){
            ongoingLoans.push(loan)
        }
    })


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

    const viewDetailsHandler = (id) =>{
        history.push(`/loans/${id}`)
    }


    useEffect(()=>{
        if(lenderInfo){
            dispatch(getAllLoan())
            dispatch(getLoanByLenderId(lenderInfo._id))
        }else{
            history.push('/lenderlogin')
        }
    },[dispatch,history,lenderInfo])
    


    return (
        <>
        {(loading || lenderLoading) && <Loader />}
        {(error || lenderError) && <Message variant='danger'>{error}</Message>}
            <Jumbotron>
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                        <h3>Hi, {lenderInfo.name}</h3>
                        <p>
                            Investment in Knowledge pays the best interest.
                        </p>
                        </Col>
                        <Col xs={12} md={6}>
                        <ResponsiveEmbed aspectRatio="16by9" style={{boxShadow:'8px 8px 16px grey'}}>
                            <Image src={userImage} />
                        </ResponsiveEmbed>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container fluid>
                <h1>Loans for granting</h1>
                {available_loans.length===0?<Message variant='info'>No loans available to grant right now .. Please come back later!!!</Message>:
                available_loans.map(loan=>(
                <Jumbotron>
                    <Media>
                        <Media.Body>
                            <h5>{loan.student.name}</h5>
                            <h6>{loan.heading}</h6>
                            <p>{loan.description}</p>
                            <ButtonGroup>
                                <Button variant="success" onClick={()=>acceptHandler(loan._id,loan.monthly_emi,loan.duration)}>Accept</Button>
                                <Button variant="outline-danger">Reject</Button>
                                <Button variant="link" onClick={()=>viewDetailsHandler(loan._id)}>View Details</Button>
                            </ButtonGroup>
                        </Media.Body>
                    </Media>
                </Jumbotron>
                ))
                
            }
            <h1>On Going Loans</h1>
            <CardGroup>
              {ongoingLoans.length===0?<Message variant='info'>There are no on-going Loans!!</Message>:
              ongoingLoans.map(loan=>(
                <Card style={{ width: '18rem',margin:'2%' }}>
                <Card.Body>
                  <Card.Title>Student_name: {loan.student.name}</Card.Title>
                  <Card.Title>Heading: {loan.heading}</Card.Title>
                  <Card.Text>Description: {loan.description}</Card.Text>
                  <Card.Text>
                    Installments Remaining: {loan.installments.reduce((total,inst)=>(
                      inst.is_paid?total:total=total+1
                    ),0)}
                  </Card.Text>
                  <Button variant="outline-primary" size="sm" href={`/loans/${loan._id}`}>View Details</Button>
                </Card.Body>
              </Card>
              ))}
            </CardGroup>
            
                
            </Container>
        </>
    )
}

export default LenderPage
