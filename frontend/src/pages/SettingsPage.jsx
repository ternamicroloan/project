import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col,Container, Jumbotron ,CardText,CardTitle, ButtonGroup} from 'reactstrap';
import classnames from 'classnames';
import bgImage from '../images/HomeBackground.jpg'
import { List } from 'reactstrap';

const SettingsPage = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Jumbotron fluid style={{height:'75vh',backgroundImage:`url(${bgImage})`,backgroundSize:'cover',
    backgroundPosition:'center',backgroundBlendMode:'overlay'}}>
      <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <h4>Contact Us</h4>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <h4>Privacy Policy</h4>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            <h4>Delete Account</h4>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row style={{padding:'5%'}}>
            <Col sm="12">
              <Row>
                <Col xs={12} md={6}>
                  <h4>Email: </h4>
                </Col>
                <Col xs={12} md={6}>
                  <h4><span style={{textTransform:'lowercase'}}><i class="fas fa-envelope"></i> support@microloan.com</span></h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <h4>Phone no.</h4>                
                </Col>
                <Col xs={12} md={6}>
                  <h4><i class="fas fa-phone"></i> +91 9930998855</h4>
                </Col>
              </Row>  
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row style={{padding:'5%'}}>
            <Col sm="6">
              <Card body>
                <CardTitle><h4>Account Termination</h4></CardTitle>
                <CardText><h6>Do you want to delete your Acccount?</h6></CardText>
                <ButtonGroup>
                  <Button color="primary">No</Button>
                  <Button color="light">Yes</Button>
                </ButtonGroup>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row style={{padding:'5%'}}>
            <Col sm="12">
              <h6 style={{textAlign:'justify'}}>
                <List type="unstyled">
                  <ul style={{listStyle:'none'}}>
                    <li>Phasellus iaculis neque</li>
                    <li>Purus sodales ultricies</li>
                    <li>Vestibulum laoreet porttitor sem</li>
                    <li>Ac tristique libero volutpat at</li>
                  </ul>        
                </List>
              </h6>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      </Container>
    </Jumbotron>
  );
}

export default SettingsPage;