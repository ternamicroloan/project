
//Component aligns the form in different media devices.Will be used to align all forms in project.
//Children will be form elements that will be enclosed within the FormContainer tag

import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const FormContainer = ({children}) => {
    return (
        <Container style={{paddingTop:'50px'}} fluid>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
