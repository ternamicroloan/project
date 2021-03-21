import React from 'react'
import {Card} from 'react-bootstrap'
const CardContainer = ({heading,amount,desc,link}) => {
    return (
        <Card border='dark' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{heading}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{amount}</Card.Subtitle>
                <Card.Text>{desc}</Card.Text>
                <Card.Link  href={link}>More Details..</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default CardContainer
