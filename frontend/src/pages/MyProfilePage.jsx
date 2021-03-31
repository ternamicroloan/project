import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector }from 'react-redux'
import {Accordion,Card,Row,Col,Container,Image,Button, ResponsiveEmbed,Badge,Form,Tabs,Tab,ProgressBar} from 'react-bootstrap'
import userImage from '../images/person1.jpg' 
import {getStudentDetails, updateStudentProfile} from '../actions/studentActions'
import {getLenderDetails,updateLenderProfile} from '../actions/lenderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import ImageUploader from 'react-images-upload'
import axios from 'axios'

const MyProfilePage = ({history}) => {

    const dispatch=useDispatch()

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [address,setAddress]=useState('')
    const [mobile,setMobile]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [zipcode,setZipcode]=useState('')
    const [adhaar,setAdhaar]=useState('')
    const [guardianAdhaar,setGuardianAdhaar]=useState('')
    const [collegeId,setCollegeId]=useState('')
    const [collegeName,setCollegeName]=useState('')
    const [collegeAddress,setCollegeAddress]=useState('')
    const [year,setYear]=useState('')
    const [semester,setSemester]=useState('')
    const [aboutMe,setAboutMe]=useState('')
    const [adhaarPicture,setAdhaarPicture]=useState()
    const [guardianAdhaarPicture,setGuardianAdhaarPicture]=useState()
    

    const [message,setMessage]=useState('')
    const [edit,setEdit]=useState(false)
    const [changePassword,setChangePassword]=useState(false)
    const [progress,setProgress]=useState(0)
  //  const [updation,setUpdation]=useState()

    const studentDetails=useSelector(state=>state.studentDetails)
    const {loading:studentDetailsLoading,error:studentDetailsError,student}=studentDetails

    const lenderDetails=useSelector(state=>state.lenderDetails)
    const {loading:lenderDetailsLoading,error:lenderDetailsError,lender}=lenderDetails

    const studentLogin =useSelector(state=>state.studentLogin)
    const {studentInfo}=studentLogin

    const lenderLogin =useSelector(state=>state.lenderLogin)
    const {lenderInfo}=lenderLogin

    const studentUpdateProfile=useSelector(state=>state.studentUpdateProfile)
    const {loading:updateStudentLoading,success:updateStudentSuccess,error:updateStudentError}=studentUpdateProfile

    const lenderUpdateProfile=useSelector(state=>state.lenderUpdateProfile)
    const {loading:updateLenderLoading,success:updateLenderSuccess,error:updateLenderError}=lenderUpdateProfile


    const url =window.location.pathname.split('/')[1]

    
    const onDropStudent =async (picture) => {
        //we get picture as an array which we convert into an object to pass into formData
        const file = picture[0]
        const formData =new FormData()
        formData.append('image',file)
        //console.log(...formData);
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            }
            const {data}=await axios.post('/upload',formData,config)
            console.log(data);
            setAdhaarPicture(data)
        }catch(error){
            console.error(error)
        }
        
      };

      const onDropGuardian = async (picture) => {
        const file=picture[0]
        const formData =new FormData()
        formData.append('image',file)
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data}=await axios.post('/upload',formData,config)
            console.log(data);
            setGuardianAdhaarPicture(data)
        }catch(error){
            console.error(error)
        }
    };
 


    
    useEffect(()=>{

    
        if(url==='student'){
            if(!studentInfo){
                history.push('/student/login')
            }else{
                if(!student.name){
                    dispatch(getStudentDetails(studentInfo._id))
                }else{
                    setName(student.name)
                    setEmail(student.email_address)
                    setMobile(student.mobile_number)
                    setAddress(student.address)
                    setCity(student.city)
                    setState(student.state)
                    setZipcode(student.zipcode)
                    setAdhaar(student.adhaar_number)
                    setGuardianAdhaar(student.guardian_adhaar_number)
                    setCollegeName(student.college_name)
                    setCollegeAddress(student.college_address)
                    setCollegeId(student.college_id)
                    setAboutMe(student.about_me)
                    setYear(student.year)
                    setSemester(student.semester)
                    
                    const count=Math.floor(((((Object.keys(student).length)-7)/17)*100))
                    setProgress(count)
                }
            }
        }else if(url==='lender'){
            if(!lenderInfo){
                history.push('/lender/login')
            }else{
                if(!lender.name){
                    dispatch(getLenderDetails(lenderInfo._id))
                }else{
                    setName(lender.name)
                    setEmail(lender.email_address)
                    setMobile(lender.mobile_number)
                    setAddress(lender.address)
                    setCity(lender.city)
                    setState(lender.state)
                    setZipcode(lender.zipcode)
                    setAdhaar(lender.adhaar_number)
                    setAboutMe(lender.about_me)
                    const count=Math.floor(((Object.keys(lender).length-6)/11)*100)
                    setProgress(count)
                }
            }
        }else{
            //Admin
        }
        
    },[history,studentInfo,dispatch,student,url,lender,lenderInfo])

    const editProfileHandler =()=>{
        setEdit(!edit)
        setMessage()
    }

    const changePasswordHandler =()=>{
        setChangePassword(!changePassword)
        setMessage()
        setPassword('')
        setConfirmPassword('')
    }

    const passwordSubmitHandler = async (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            alert('Passwords do not match')
        }else{
            if(url==='student'){
                await dispatch(updateStudentProfile({password}))
                if(updateStudentSuccess){
                    setMessage('Password Change Successful')
                }
            }else if(url==='lender'){
                await dispatch(updateLenderProfile({password}))
                if(updateLenderSuccess){
                    setMessage('Password Change Successful')
                }
            }else{
                //Admin     
            }
            
        }
    }

    const editProfileSubmitHandler = async(e)=>{
        e.preventDefault()
        if(url==='student'){
            await dispatch(updateStudentProfile({name,email,address,city,state,zipcode,mobile,adhaar,guardianAdhaar,collegeId,collegeAddress,collegeName,year,semester,aboutMe}))
            if(updateStudentSuccess){
                setMessage('Profile Update Successful')
            }
        }else if(url==='lender'){
            await dispatch(updateLenderProfile({name,email,address,city,state,zipcode,mobile,adhaar,aboutMe}))
            if(updateLenderSuccess){
                setMessage('Profile Update Successful')
            }
        }else{
            //Admin
        }
    }

    const adhaarUploadHandler=async(e)=>{
        if(url==='student'){
            await dispatch(updateStudentProfile({adhaarPicture,guardianAdhaarPicture}))
            //console.log(adhaarPicture,guardianAdhaarPicture);
            if(updateStudentSuccess){
                setMessage('Profile Update Successful')
            }
        }else if(url==='lender'){
            await dispatch(updateLenderProfile({adhaarPicture}))
           //console.log(adhaarPicture);

            if(updateLenderSuccess){
                setMessage('Profile Update Successful')
            }
    }
}
    return (
        <Container style={{paddingTop:'50px'}} fluid>
            {(studentDetailsLoading || lenderDetailsLoading) && <Loader />}
            {(studentDetailsError || lenderDetailsError) && <Message variant='danger'>{studentDetailsError?studentDetailsError:lenderDetailsError}</Message>}
            {(updateStudentSuccess|| updateLenderSuccess) && <Message variant='success'>{message}</Message>}
            <Row>
                <Col xs={12} md={{span:3 , offset:1}} lg={{span:2,offset:1}} >
                    <Row>
                        <ResponsiveEmbed aspectRatio="4by3">
                            <Image src={userImage} roundedCircle />
                        </ResponsiveEmbed>
                    </Row>
                    
                    <Row className="justify-content-center pt-2">
                        <Form className='pr-3'>
                            <Form.Group>
                                <Form.File  id="exampleFormControlFile1" label="Change Profile Image" />
                            </Form.Group>
                        </Form>
                    </Row>
                    
                    <Row className="justify-content-center pt-2">
                        <h2>{url==='student'?student.name:lender.name}</h2>
                    </Row>
                    <Row className="justify-content-center">
                    <a href={`mailto: ${url==='student'?student.email_address:lender.email_address}`} style={{fontSize:'15px'}}><i className='fas fa-envelope' style={{paddingRight:'5px'}}/>{url==='student'?student.email_address:lender.email_address}</a>
                    </Row>
                    <Row className="justify-content-center">
                        <p>{url==='student'?student.mobile_number:lender.mobile_number}</p>
                    </Row>
                    <Row className="justify-content-center pb-2">
                        <Button variant='outline-info' onClick={editProfileHandler}>Edit Profile</Button>
                    </Row>
                    <Row className="justify-content-center pb-2">
                        <Button variant='outline-info' onClick={changePasswordHandler}>Change Password</Button>
                    </Row>
                </Col>
                <Col xs={12} md={{span:7,offset:1}} lg={{span:8,offset:1}}>
                    <Row>
                        <Col md={10} xs={12}>
                            <ProgressBar variant='success' striped now={progress} label={`Profile: ${progress} % `}/>
                        </Col>
                        <Col md={2} xs={12}>
                            <div style={{display:'flex',flexDirection:'row-reverse',padding:'10px'}}>
                                <Badge pill variant={url==='student'?(student.verified?'info':'dark'):(lender.verified?'info':'dark')} style={{fontSize:'15px'}} >
                                    {url==='student'?(student.verified?'verified':'unverified'):(lender.verified?'verified':'unverified')}
                                </Badge>
                            </div>
                        </Col>                        
                    
                    </Row>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Personal Information
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <p>Mobile No. : {url==='student'?student.mobile_number:lender.mobile_number}</p>
                                    <p>Email : {url==='student'?student.email_address:lender.mobile_number}</p>
                                    <p>Address : {url==='student'?student.address:lender.address}</p>
                                    <p>City : {url==='student'?student.city:lender.city}</p>
                                    <p>State : {url==='student'?student.state:lender.state}</p>
                                    <p>zipcode : {url==='student'?student.zipcode:lender.zipcode}</p>
                                    <p>Student Adhaar No. : {url==='student'?student.adhaar_number:lender.adhaar_number}</p>
                                    {url==='student' && <p>Guardian Adhaar No. : {student.guardian_adhaar_number}</p>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {
                            url==='student' &&(
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                College Information
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <p>College ID : {student.college_id}</p>
                                    <p>College Name :{student.college_name}</p>
                                    <p>College Address :{student.college_address}</p>
                                    <p>Year : {student.year}</p>
                                    <p>Semester : {student.semester}</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                            )
                        }
                        
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                About Me
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <Card.Text>
                                    Robert John Downey Jr. is an American actor and producer. His career has been characterized by critical and popular success in his youth, followed by a period of substance abuse and legal troubles, before a resurgence of commercial success in middle age.
                                    </Card.Text>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    {changePassword && (
                    <div>
                        <FormContainer>
                            <h1>Change Password</h1>
                            {(updateStudentLoading || updateLenderLoading) && <Loader/>}
                            {((updateStudentError || updateLenderError) && message) && <Message variant='danger'>Password change unsuccessful</Message>}
                            {((updateStudentSuccess || updateLenderSuccess ) && message) && <Message variant='success'>Password Changed</Message> }
                        
                            <Form onSubmit={passwordSubmitHandler}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='Enter new Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type='password' placeholder='Confirm new Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                                </Form.Group>
                                <Button type='submit' variant='primary'>Change Password</Button>
                            </Form>
                        </FormContainer>
                    </div>
                    )}

                    {edit && (
                        <div style={{paddingTop:'20px'}}>
                            <h1>Update Profile</h1>
                            {(updateStudentLoading || updateLenderLoading) && <Loader/>}
                            {((updateStudentError || updateLenderError)) && <Message variant='danger'>Update unsuccessful</Message>}
                            {((updateStudentSuccess || updateLenderSuccess )) && <Message variant='success'>Update successful</Message> }
                        
                        <Tabs defaultActiveKey="Personal Details" id="uncontrolled-tab-example" style={{paddingTop:'10px'}}>
                            <Tab eventKey="Personal Details" title="Personal Details">
                            <FormContainer>
                            <Form onSubmit={editProfileSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type='input' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)} readOnly  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control type='integer' placeholder='Enter Mobile No.' value={mobile} onChange={(e)=>setMobile(e.target.value)}  />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type='input' placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)}  />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} >
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Label>State</Form.Label>
                                            <Form.Control as="select"  value={state} onChange={(e)=>setState(e.target.value)} >
                                                <option value=''>Choose...</option>
                                                <option value='Maharashtra'>Maharashtra</option>
                                                <option value='Delhi'>Delhi</option>
                                                <option value='Karnataka'>Karnataka</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control  type='integer' placeholder='ZipCode' value={zipcode} onChange={(e)=>setZipcode(e.target.value)} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Adhaar Number</Form.Label>
                                            <Form.Control type='text' placeholder='Enter student Adhaar No.' value={adhaar} onChange={(e)=>setAdhaar(e.target.value)}  />
                                        </Form.Group>
                                        {url==='student' && (
                                            <Form.Group as={Col}>
                                                <Form.Label>Guardian Adhaar Number</Form.Label>
                                                <Form.Control type='text' placeholder='Enter guardian Adhaar No.' value={guardianAdhaar} onChange={(e)=>setGuardianAdhaar(e.target.value)}  />
                                            </Form.Group>
                                           )}
                                        
                                    </Form.Row>
                                    <Button type='submit' variant='primary'>Update</Button>
                                </Form>
                                </FormContainer>
                        </Tab>
                        {url==='student' && (
                            <Tab eventKey="College Details" title="College Details">
                            <FormContainer>
                                <Form onSubmit={editProfileSubmitHandler}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>College Name</Form.Label>
                                                <Form.Control type='text' placeholder='Enter college name' value={collegeName} onChange={(e)=>setCollegeName(e.target.value)}  />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>College ID</Form.Label>
                                                <Form.Control type='text' placeholder='Enter College ID' value={collegeId} onChange={(e)=>setCollegeId(e.target.value)}  />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>College Address</Form.Label>
                                                <Form.Control type='text' placeholder='Enter College Address' value={collegeAddress} onChange={(e)=>setCollegeAddress(e.target.value)}  />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group>
                                            <Form.Label>Year </Form.Label>
                                            <Form.Control type='integer' placeholder='Year Currently studying in (eg:3)' value={year} onChange={(e)=>setYear(e.target.value)}  />
                                        </Form.Group>
                                        <Form.Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Semester </Form.Label>
                                                <Form.Control type='input' placeholder='Semester Currently studying in (eg:8)' value={semester} onChange={(e)=>setSemester(e.target.value)} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Button type='submit' variant='primary'>Update</Button>
                                    </Form>
                                    </FormContainer>
                             
                            </Tab>

                        )}
                        
                        <Tab eventKey="About Me" title="About Me" >
                        <FormContainer>
                            <Form onSubmit={editProfileSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>ABOUT ME</Form.Label>
                                            <Form.Control as='textarea' row={3}  value={aboutMe} onChange={(e)=>setAboutMe(e.target.value)}  />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type='submit' variant='primary'>Update</Button>
                                </Form>
                                </FormContainer>
                        </Tab>

                        <Tab eventKey="Adhaar Upload" title="Adhaar Upload" >
                        <FormContainer>
                            <Form onSubmit={adhaarUploadHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Student Adhaar</Form.Label>
                                            <ImageUploader   withIcon={true} buttonText='Choose image' withPreview={true} withLabel={true} label='Student Adhaar Card' imgExtension={['.jpg','.jpeg','.png']} onChange={onDropStudent}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Guardian Adhaar</Form.Label>
                                            <ImageUploader  withIcon={true} buttonText='Choose image' withPreview={true} withLabel={true} label='Guardian Adhaar Card' imgExtension={['.jpg','.jpeg','.png']} onChange={onDropGuardian} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type='submit' variant='primary'>Update</Button>
                                </Form>
                                </FormContainer>
                        </Tab>
                      </Tabs>
                      </div>
                    )}

                </Col>
            
            </Row>
        </Container>
    )
}

export default MyProfilePage
