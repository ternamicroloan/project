import React, {useState}from 'react'
import JumbotronContainer from '../components/JumbotronContainer' 
import {Row,Col,Button,Container,Image, Jumbotron,Card,ResponsiveEmbed} from 'react-bootstrap'
import LoanImage from '../images/loanImage.jpg'
import network from '../images/Network.jpg' 
import Stepper from 'react-stepper-horizontal'
import stepper1 from '../images/stepperSignup.png'
import stepper2 from '../images/stepperDocs.jpg'
import stepper3 from '../images/stepperApply.jpg'
import stepper4 from '../images/stepperDisbursal.jpg'

const HomePage = () => {

    const [step,setStep]=useState(0)
    console.log(step);
    
    const nextStepsHandler =()=>{
        setStep(step+1)
    }

    const previousStepsHandler =()=>{
        setStep(step-1)
    }

    const stepperImages=[stepper1,stepper2,stepper3,stepper4]

    return (
        <>
            <JumbotronContainer/>
            <Jumbotron  style={{padding:"3%",backgroundColor:'moonlight'}}>
                <Container>
                    <Row>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{ width: '18rem',backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="fas fa-dollar-sign"></i>
                                    <Card.Title>0% Interest Loans</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{ width: '18rem',backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="far fa-money-bill-alt"></i>
                                    <Card.Title>Get Loan upto 10000/ INR</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{ width: '18rem',backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="fas fa-lock"></i>
                                    <Card.Title>Secure Payments</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col md={{span:6,order:'first'}} xs={{span:12,order:'last'}}>
                        <Row className='pl-3'>
                            <p className='lead' style={{padding:'10%',top:'50%',textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Row>
                    </Col>
                    <Col md={{span:6,order:'last'}} xs={{span:12,order:'first'}}>
                        <ResponsiveEmbed aspectRatio='16by9'>
                            <Image src={LoanImage} style={{height:'100%'}}fluid/>
                        </ResponsiveEmbed>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Stepper steps={
                    [
                        {title:'Register'},
                        {
                            title:'Upload Documents',
                        },
                    {
                        title:'Apply for loan',
                      
                    },
                    {
                        title:'Loan disbussment',
                        
                    }
                    ]} activeStep={step} />
                    <ResponsiveEmbed aspectRatio='16by9'>
                        <Image  src={stepperImages[step]} style={{marginTop:'5px'}}/>
                    </ResponsiveEmbed>
                    <div style={{display:'flex',marginTop:'10px'}} >
                        <Button className='' onClick={()=>previousStepsHandler()}>Previous</Button>
                        <Button style={{marginLeft:'auto'}} onClick={()=>nextStepsHandler()}>Next</Button>
                    </div>
                    
            </Container>
            <Jumbotron fluid style={{backgroundColor:'white'}}>
                <Container>
                    <Row>
                        <Col>
                            <h3 style={{textAlign:'center'}}>
                                What is a Peer to Peer Lending Platform?
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{textAlign:'center'}}>
                                A peer to peer lending or P2P Lending platform facilitates borrowing and lending money directly through an online platform like Lendbox, making it affordable to get loans online compared to banks. Lendbox is poised to change the way India lends and borrows.
                            </p>            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ResponsiveEmbed aspectRatio='16by9'>
                                <Image style={{mixBlendMode:'darken',margin:'3% 0'}} src={network}/>
                            </ResponsiveEmbed>  
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{textAlign:'center'}}>
                                Investing in consumer credit at scale was previously accessible only by banks. Companies like Lendbox have opened the doors of this asset class to retail and institutional investors. The P2P process is simple - people looking to borrow apply for loans, and their applications are carefully screened. As an investor, you can spread your money across multiple loans in increments as low as ₹500, and receive monthly payments.
                            </p>            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{textAlign:'center'}}>
                                At your discretion, you select the people you want to invest in or get a loan from. At Lendbox, you have the power to choose your terms and enjoy complete transparency.
                            </p>            
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    )
}

export default HomePage



