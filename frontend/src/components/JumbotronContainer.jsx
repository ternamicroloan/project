import React from 'react'
import {Jumbotron,Row,Col,Button,Container,Image} from 'react-bootstrap'
import bgImage from '../images/HomeBackground.jpg'

// import Stepper from './Stepper'

const JumbotronContainer = () => {
    return (
        <Jumbotron style={{backgroundImage:`url(${bgImage})`,
            backgroundSize:'cover',backgroundPosition:'center',height:'100vh'
            ,backgroundBlendMode:'overlay',textAlign:'center'}} fluid>
            <Container>
                <h1 className="display-12" style={{textAlign:'center',paddingTop:'5%'}}>This is a peer to peer Lending Platform</h1>
                <p className="lead">A peer to peer lending or P2P Lending platform facilitates borrowing and lending money directly through an online platform making it affordable to get loans online compared to banks. This has poised to change the way India lends and borrows.</p>
                <Row>
                    <Col className='py-6'>
                        <Button variant='outline-primary' href='/studentlogin'>Need a Loan</Button>
                    </Col>
                    <Col className='py-6'>
                        <Button variant='outline-primary' href='/lenderlogin'>Want to invest</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <center>
                        <Image className='md-6' style={{width:'50%'}} src={bgImage}/>
                        </center>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default JumbotronContainer
