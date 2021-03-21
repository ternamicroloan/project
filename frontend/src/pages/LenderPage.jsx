import React from 'react'
import { Container, Card , ButtonGroup  , Jumbotron , Row , Col , ResponsiveEmbed , Image , Media ,Button,Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import userImage from '../images/person1.jpg'

const LenderPage = () => {

    const lenderLogin = useSelector(state=>state.lenderLogin)
    const {lenderInfo}=lenderLogin

    return (
        <>
            <Jumbotron>
                <Container>
                    <Row>
                        <Col>
                        <h3>Hi, {lenderInfo.name}</h3>
                        <p>
                            Investment in Knowledge pays the best interest.
                        </p>
                        </Col>
                        <Col>
                        <ResponsiveEmbed aspectRatio="16by9">
                            <Image src={userImage} />
                        </ResponsiveEmbed>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container fluid>
                <Jumbotron>
                    <Media>
                        <Media.Body>
                            <h5>Student_name</h5>
                            <h6>Loan_title</h6>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae nesciunt necessitatibus perspiciatis debitis, exercitationem blanditiis accusamus voluptatibus quia saepe. Necessitatibus excepturi consectetur earum quidem veniam dolore tempore, repudiandae deserunt!
                            </p>
                            <ButtonGroup>
                                <Button variant="success">Accept</Button>
                                <Button variant="outline-danger">Reject</Button>
                                <Button variant="link">View Details</Button>
                            </ButtonGroup>
                        </Media.Body>
                    </Media>
                </Jumbotron>
                <Jumbotron>
                    <Media>
                        <Media.Body>
                            <h5>Student_name</h5>
                            <h6>Loan_title</h6>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae nesciunt necessitatibus perspiciatis debitis, exercitationem blanditiis accusamus voluptatibus quia saepe. Necessitatibus excepturi consectetur earum quidem veniam dolore tempore, repudiandae deserunt!
                            </p>
                            <ButtonGroup>
                                <Button variant="primary">Accept</Button>
                                <Button variant="secondary">Reject</Button>
                                <Button variant="link">View Details</Button>
                            </ButtonGroup>
                        </Media.Body>
                    </Media>
                </Jumbotron>
                <Jumbotron>
                    <Media>
                        <Media.Body>
                            <h5>Student_name</h5>
                            <h6>Loan_title</h6>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quae nesciunt necessitatibus perspiciatis debitis, exercitationem blanditiis accusamus voluptatibus quia saepe. Necessitatibus excepturi consectetur earum quidem veniam dolore tempore, repudiandae deserunt!
                            </p>
                            <ButtonGroup>
                                <Button variant="primary">Accept</Button>
                                <Button variant="secondary">Reject</Button>
                                <Button variant="link">View Details</Button>
                            </ButtonGroup>
                        </Media.Body>
                    </Media>
                </Jumbotron>
            </Container>
        </>
    )
}

export default LenderPage
