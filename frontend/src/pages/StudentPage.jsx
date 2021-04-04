
import React,{useEffect} from 'react'
import { Container, Card , CardGroup , Button , Jumbotron , Row , Col , ResponsiveEmbed , Image } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import userImage from '../images/student1.jpeg'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getLoanByStudentId } from '../actions/loanActions'

const StudentPage = ({history}) => {

  const dispatch=useDispatch()

  const studentLogin = useSelector(state=>state.studentLogin)
  const {studentInfo}=studentLogin

  
  const studentLoanDetails=useSelector(state=>state.studentLoanDetails)
  const {loading,error,loans}=studentLoanDetails

  const ongoingLoans=[]
  const completedLoans=[]

  loans && loans.forEach(loan=>{
    if(loan.on_going){
        ongoingLoans.push(loan)
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


    return (
        <>
        {loading && <Loader/>}
        {error && <Message>{error}</Message>}
          <Jumbotron>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <h3>Hi, {studentInfo.name}</h3>
                  <blockquote className="blockquote mb-0 card-body">
                    <p>
                    The only thing that will stop you from fulfilling your dreams is you.
                    </p>
                    <footer className="blockquote-footer">
                      <small className="text-muted">Tom Bradley</small>
                    </footer>
                  </blockquote>
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
            <h1>On Going Loans</h1>
            <CardGroup>
              {ongoingLoans.map(loan=>(
                <Card style={{ width: '18rem',margin:'2%' }}>
                <Card.Body>
                  <Card.Title>{loan.heading}</Card.Title>
                  <Card.Text>{loan.description}</Card.Text>
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
            <h1>Completed Loans</h1>
            <CardGroup>
              {completedLoans.map(loan=>(
                <Card style={{ width: '18rem',margin:'2%' }}>
                <Card.Body>
                  <Card.Title>{loan.heading}</Card.Title>
                  <Card.Text>{loan.description}</Card.Text>
                  <Card.Text>
                    Completed On: {new Date(loan.end_date).toLocaleDateString("en-IN")}
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

export default StudentPage
