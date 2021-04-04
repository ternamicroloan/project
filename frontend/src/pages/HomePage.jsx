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
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4} style={{border:'20px'}}>
                            <Card className="text-center mb-2" style={{backgroundColor:'#011338'
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
                            <Card className="text-center mb-2" style={{backgroundColor:'#011338'
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
                            <p className='lead' style={{padding:'10%',top:'50%',textAlign:'justify'}}>
                            Improving access to education should be a top priority globally. 
                            Investing in higher education is a must if a country wants to encourage economic development.
                            Education shapes the next generation of innovators, inventors and experts.
                            Student micro-loans create an education option for students.By enabling education,
                            students around the world have the chance to pursue knowledge and skills,
                            and they are more competitive in the workforce and have the opportunity to break the cycle of generational poverty.
                             When even one person steps away from poverty, it benefits them, their family and their community at large. 
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
                            Peer-to-peer (P2P) lending platforms offer themselves an easy solution to borrow money for short-term requirements.
                            it easier to borrow from P2P lending platforms compare to traditional personal loans from banks and 
                            Non-Banking Financial Companies (NBFCs) as process and disbursement of the loan amount is quick at P2P lending platforms 
                            compared to applying for a personal loan at a bank.
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
                            The benefit of P2P lending is that process is simple to commence borrowing and investment using this platform. Lending can be done with an amount as low as Rs 5,000.
                             This P2P lending platforms also provide analysis of borrower’s profiles that helps in easy decision making before lending.
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



