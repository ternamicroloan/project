import React,{useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { getAllStudent,deleteStudent } from '../actions/adminActions'
import Switch from 'react-switch'
import { updateStudentProfile } from '../actions/studentActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import store from '../store'
const StudentListPage = ({history}) => {

    const dispatch=useDispatch()

    const adminLogin =useSelector(state=>state.adminLogin)
    const {adminInfo}=adminLogin

    const studentUpdateProfile=useSelector(state=>state.studentUpdateProfile)
    const {success:updateSuccess}=studentUpdateProfile

    const studentDelete = useSelector(state=>state.studentDelete)
    const {deleteLoading,success:deleteSuccess,error:deleteError}=studentDelete

    
   // const studentList=useSelector(state=>state.studentList)
   // const {loading,error,students}=studentList

    
    useEffect(()=>{
            if(adminInfo){
                dispatch(getAllStudent())
            }else{
                history.push('/')
            }
    },[dispatch,history,adminInfo])

    
    const {studentList:{students,loading:listLoading,error:listError}}=store.getState()

    const verifiedHandler = (checked,id)=>{
        const verified=!checked
        dispatch(updateStudentProfile({verified,id}))
    }

    const deleteHandler =(id)=>{
        dispatch(deleteStudent(id))
    }

    return (
        <div>
            <h1>Students</h1>
            {(listLoading || deleteLoading) && <Loader />}
            {(deleteError || listError ) && <Message variant='danger'>{listError?listError:deleteError}</Message>}
            {(updateSuccess || deleteSuccess) && <Message variant='info'>{`${updateSuccess?'Update Successful. Please referesh to see changes!!':'Delete Successful. Please referesh to see changes !!'}`} </Message>}
        
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>MOBILE_NO</td>
                        <td>ADHAAR NO.</td>
                        <td>GUARDIAN ADHAAR NO.</td>
                        <td>COLLEGE NAME</td>
                        <td>COLLEGE ID</td>
                        <td>VERIFIED</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student)=>(
                        <tr key={student._id}>
                            <td>{student._id}</td> 
                            <td>{student.name}</td>
                            <td>{student.email_address}</td>
                            <td>{student.mobile_number}</td>
                            <td>{student.adhaar_number}</td>
                            <td>{student.guardian_adhaar_number}</td>
                            <td>{student.college_name}</td>
                            <td>{student.college_id}</td>
                            <td><Switch onChange={(e)=>verifiedHandler(student.verified,student._id)} checked={student.verified}/></td>
                            <td><Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(student._id)}><i className='fas fa-trash' /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            
        </div>
    )
}

export default StudentListPage
