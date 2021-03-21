import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch}from 'react-redux'
import Stepper from 'react-stepper-horizontal'
import {Form,Row,Col,Button, Container,Card,ListGroup,Image} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import ImageUploader from 'react-images-upload'
import { getStudentDetails } from '../actions/studentActions'
import {createLoan} from '../actions/loanActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ApplyForLoanPage = ({history}) => {

    const [step,setStep]=useState(0)
    const [heading,setHeading]=useState()
    const [description,setDescription]=useState()
    const [amount,setAmount]=useState()
    const [duration,setDuration]=useState()
    const [emi,setEmi]=useState()
    const [collegeName,setCollegeName]=useState()
    const [collegeID,setCollegeID]=useState()
    const [year,setYear]=useState()
    const [semester,setSemester]=useState()
    const [adhaar,setAdhaar]=useState()
    const [guardianAdhaar,setGuardianAdhaar]=useState()
    const [adhaarPicture,setAdhaarPicture]=useState()
    const [guardianAdhaarPicture,setGuardianAdhaarPicture]=useState()

    const studentDetails=useSelector(state=>state.studentDetails)
    const {loading:studentDetailsLoading,error:studentDetailsError,student}=studentDetails

    const studentLogin = useSelector(state=>state.studentLogin)
    const {studentInfo}=studentLogin

    const loanCreate=useSelector(state=>state.loanCreate)
    const{loan,success:loanCreateSuccess,error:loanCreateError}=loanCreate
    

    const dispatch=useDispatch()

    useEffect(()=>{
        if(!student.name){
            dispatch(getStudentDetails(studentInfo._id))
        }else{
            setCollegeID(student.college_id)
            setCollegeName(student.college_name)
            setYear(student.year)
            setSemester(student.semester)
            setAdhaar(student.adhaar_number)
            setGuardianAdhaar(student.guardian_adhaar_number)
        }
        if(loanCreateSuccess){
            history.push(`/loans/${loan._id}`)
        }
    },[history,student,dispatch,studentInfo,loanCreateSuccess,loan])


    const onDropStudent = picture => {
        const {name}=picture[0]

        setAdhaarPicture(name)
      };

      const onDropGuardian = picture => {
        const {name}=picture[0]

        setGuardianAdhaarPicture(name)
      };

      const submitHandler=()=>{
        const emi= Math.round(amount/duration)
        setEmi(emi)
        setStep(step+1)
    }

    const confirmHandler=()=>{
        dispatch(createLoan({
            student:studentInfo._id,
            heading:heading,
            description:description,
            duration:duration,
            total_amount:amount,
            monthly_emi:emi,
            granted:false,
            on_going:false,
            completed:false,
            verified:false,
        }))
    }

    return (
        <div>
            {studentDetailsLoading && <Loader/>}
            {studentDetailsError && <Message variant='danger'>{studentDetailsError}</Message>}
            {student && student.verified===false ? (
                <div>
                <Message variant='danger'>Profile not verified.</Message>
                <Message variant='info'>Please fill all details on  Profile Page to apply for loan</Message>
                <Button  href={`/student/profile`}>Profile Page</Button>
                </div>
            ):(
                <div>
                <Stepper steps={[{title:'Loan Details'},{title:'College Details'},{title:'Upload Documents'},{title:'Loan Summary'}]} activeStep={step} />
                {step===0 &&(
                <FormContainer>
                <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Loan Heading</Form.Label>
                            <Form.Control type='input' placeholder='Loan Heading' value={heading} onChange={(e)=>setHeading(e.target.value)}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Loan Description</Form.Label>
                            <Form.Control type='input' placeholder='Loan Description' value={description} onChange={(e)=>setDescription(e.target.value)}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Loan Amount</Form.Label>
                            <Form.Control type='integer' placeholder='Amount(₹)' value={amount} onChange={(e)=>setAmount(e.target.value)}  />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Loan Duration</Form.Label>
                            <Form.Control as="select"  value={duration} onChange={(e)=>setDuration(e.target.value) }  >
                                <option value=''>Choose...</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Proceed</Button>
                        
                    </Form>
                </FormContainer>
            )}
            {step===1 && (
                <FormContainer>
                <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>College Name</Form.Label>
                            <Form.Control type='input' placeholder='College Name' value={collegeName} onChange={(e)=>setCollegeName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>College ID</Form.Label>
                            <Form.Control type='input' placeholder='College ID' value={collegeID} onChange={(e)=>setCollegeID(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type='integer' placeholder='year' value={year} onChange={(e)=>setYear(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Semester</Form.Label>
                            <Form.Control type='integer' placeholder='semester' value={semester} onChange={(e)=>setSemester(e.target.value)} required />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Proceed</Button>
                      
                    </Form>
                </FormContainer>
            )}
            {step===2 &&(
                <FormContainer>
                <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Student Adhaar Number</Form.Label>
                            <Form.Control type='integer' placeholder='Student Adhaar Number' value={adhaar} onChange={(e)=>setAdhaar(e.target.value)}  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Guardian Adhaar Number</Form.Label>
                            <Form.Control type='integer' placeholder='Guardian Adhaar Number' value={guardianAdhaar} onChange={(e)=>setGuardianAdhaar(e.target.value)}  />
                        </Form.Group>
                        <ImageUploader withIcon={true} buttonText='Choose image' withPreview={true} withLabel={true} label='Student Adhaar Card' imgExtension={['.jpg','.jpeg','.png']} onChange={onDropStudent}/>
                        <ImageUploader withIcon={true} buttonText='Choose image' withPreview={true} withLabel={true} label='Guardian Adhaar Card' imgExtension={['.jpg','.jpeg','.png']} onChange={onDropGuardian} />

                        <Button type='submit' variant='primary'>Proceed</Button>
                      
                    </Form>
                </FormContainer>
            )}
            {step===3 &&(
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Loan Details:</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Loan Heading:</Col>
                                            <Col>{heading}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Loan Description:</Col>
                                            <Col>{description}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Loan Amount:</Col>
                                            <Col>{amount}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Duration:</Col>
                                            <Col>{duration}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Monthly emi:</Col>
                                            <Col>{emi}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>     
                    <Row>
                        <Col>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>College Details:</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>College Name:</Col>
                                            <Col>{collegeName}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>College ID:</Col>
                                            <Col>{collegeID}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Year:</Col>
                                            <Col>{year}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Semester:</Col>
                                            <Col>{semester}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Documents:</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Student Adhaar Number:</Col>
                                            <Col>{adhaar}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Guardian Adhaar Number:</Col>
                                            <Col>{guardianAdhaar}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Docs uploaded:</Col>
                                            <Col><Image widht={200} height={200} src={`../images/${adhaarPicture}`} /></Col>
                                            <Col><Image widht={200} height={200} src={`../images/${guardianAdhaarPicture}`} /></Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

                    </Row>           
                    <Row className="justify-content-md-center mt-5">
                        <Button type='submit' variant='primary' onClick={()=>confirmHandler()}>Apply For Loan</Button>
                    </Row>    
                    {loanCreateError && <Message variant='danger'>{loanCreateError}</Message>}
                </Container>

            )}
            </div>
            )}
            
        </div>
    )
}

export default ApplyForLoanPage
