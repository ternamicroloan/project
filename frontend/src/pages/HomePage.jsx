import React, {useState}from 'react'
import JumbotronContainer from '../components/JumbotronContainer' 
import {Row,Col,Button,Container,Image, Jumbotron,Card,ResponsiveEmbed} from 'react-bootstrap'
import LoanImage from '../images/loanImage.jpg'
import network from '../images/Network_8x.jpg' 
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
                <Container fluid>
                    <Row>
                        <Col xs={12} md={4} >
                            <Card className="text-center mb-2" style={{backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="fas fa-dollar-sign"></i>
                                    <Card.Title>0% Interest Loans</Card.Title>
                                    <Card.Text>
                                        you don't have to pay any interest on any loan amount you opt for
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="far fa-money-bill-alt"></i>
                                    <Card.Title>Get Loan upto 50000/ INR</Card.Title>
                                    <Card.Text>
                                        Fulfill minimum eligibility criteria and recieve instant disbursment of upto 50000 rs from available lenders
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{backgroundColor:'#011338'
                            ,color:'white',boxShadow:'5px 5px 10px grey' }}>
                                <Card.Body>
                                    <i style={{fontSize:'30px'}} class="fas fa-lock"></i>
                                    <Card.Title>Secure Payments</Card.Title>
                                    <Card.Text>
                                        Handle your payments securely using razorpay payment gateway
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
                            <p className='lead' style={{padding:'10%',top:'50%',textAlign:'justify'}}>
                            Improving access to schooling ought to be a first concern worldwide. 
                            Putting resources into advanced education is an absolute necessity if a nation needs to support financial 
                            advancement. Training shapes the up and coming age of trend-setters, innovators and 
                            specialists. Understudy miniature advances make training choice for students.By empowering 
                            instruction, understudies all throughout the planet get the opportunity to seek after information and abilities, 
                            what's more, they are more serious in the labor force and have the chance to break the 
                            pattern of generational neediness. When even one individual advances from neediness, it 
                            benefits them, their family and their local area on the loose.
                            </p>
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
                            Distributed loaning stages offer a simple strategy to get an amount of cash for a brief time-frame. 
                            It is easier to lend loan from one Peer to another.
                            Loaning stages when contrasted with individual credits from banks and Non-Banking Financial Companies as interaction and payment of the advance sum is speedy at Peer to Peer loaning stages contrasted with applying for an individual advance at a bank
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
                            The good thing about Peer to Peer disposition is that method is easy to start borrowing and investment in this platform.
                            Disposition is through with associate quantity as low as 5,000 Rupees.
                            This Peer to Peer disposition platforms conjointly give analysis of borrower’s profiles that helps in straightforward deciding before disposition.
                            At your discretion, you decide on the folks you would like to speculate in or get a loan from.
                            As a student you've got the facility to settle on your terms and luxuriate in complete transparency.
                            </p>            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{textAlign:'center'}}>
                                At your discretion, you select the people you want to invest in or get a loan from. As a student you have the power to choose your terms and enjoy complete transparency.
                            </p>            
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </>
    )
}

export default HomePage



