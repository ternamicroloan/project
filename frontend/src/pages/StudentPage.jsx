import React from 'react'
import { Container, Card , CardGroup , Button , Jumbotron , Row , Col , ResponsiveEmbed , Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import userImage from '../images/person1.jpg'

const StudentPage = () => {
  const studentLogin = useSelector(state=>state.studentLogin)
  const {studentInfo}=studentLogin

    return (
        <>
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <h3>Hi, {studentInfo.name}</h3>
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
            <CardGroup>
              <Card style={{ width: '18rem',margin:'2%' }}>
                <Card.Body>
                  <Card.Title>Loan 1</Card.Title>
                  <Card.Subtitle className="mb-6 text-muted">Description</Card.Subtitle>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi minima natus harum vero, possimus laudantium porro exercitationem quasi ad aliquam corrupti deserunt delectus earum iusto itaque facere necessitatibus quibusdam.
                  </Card.Text>
                  <Card.Text>
                    Installments Remaining: num
                  </Card.Text>
                  <Button variant="outline-primary" size="sm" href="#">View Details</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem' ,margin:'2%'}}>
                <Card.Body>
                  <Card.Title>Loan 2</Card.Title>
                  <Card.Subtitle className="mb-6 text-muted">Description</Card.Subtitle>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi minima natus harum vero, possimus laudantium porro exercitationem quasi ad aliquam corrupti deserunt delectus earum iusto itaque facere necessitatibus quibusdam.
                  </Card.Text>
                  <Card.Text>
                    Installments Remaining: num
                  </Card.Text>
                  <Button variant="outline-primary" size="sm" href="#">View Details</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem' ,margin:'2%'}}>
                <Card.Body>
                  <Card.Title>Loan 3</Card.Title>
                  <Card.Subtitle className="mb-6 text-muted">Description</Card.Subtitle>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi minima natus harum vero, possimus laudantium porro exercitationem quasi ad aliquam corrupti deserunt delectus earum iusto itaque facere necessitatibus quibusdam.
                  </Card.Text>
                  <Card.Text>
                    Installments Remaining: num
                  </Card.Text>
                  <Button variant="outline-primary" size="sm" href="#">View Details</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Container>
        </>
    )
}

export default StudentPage
