import React, {useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import Switch from 'react-switch'
import { getAllLender,deleteLender } from '../actions/adminActions'
import {updateLenderProfile} from '../actions/lenderActions'
import store from '../store'
const LenderListPage = ({history}) => {

    const dispatch =useDispatch()

//    const lenderList = useSelector(state=>state.lenderList)
//    const {error,loading,lenders}=lenderList

    const adminLogin =useSelector(state=>state.adminLogin)
    const {adminInfo}=adminLogin

    const lenderUpdateProfile=useSelector(state=>state.lenderUpdateProfile)
    const {success:updateSuccess}=lenderUpdateProfile
    
    const lenderDelete = useSelector(state=>state.lenderDelete)
    const {deleteLoading,success:deleteSuccess,error:deleteError}=lenderDelete

    useEffect(()=>{
        if(adminInfo){
            dispatch(getAllLender())
        }else{
            history.push('/')
        }
    },[dispatch,history,adminInfo])

    const {lenderList:{lenders,loading:listLoading,error:listError}}=store.getState()


    const deleteHandler=(id)=>{
        dispatch(deleteLender(id))
    }

    const verifiedHandler =(checked,id)=>{
        const verified = !checked
        console.log(verified);
        dispatch(updateLenderProfile({verified,id}))
    }
    
    
    return (
        <div>
        <h1>Lenders</h1>
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
                    <td>VERIFIED</td>
                </tr>
            </thead>
            <tbody>
                {lenders.map((lender)=>(
                    <tr key={lender._id}>
                        <td>{lender._id}</td> 
                        <td>{lender.name}</td>
                        <td>{lender.email_address}</td>
                        <td>{lender.mobile_number}</td>
                        <td>{lender.adhaar_number}</td>
                        <td><Switch onChange={()=>verifiedHandler(lender.verified,lender._id)} checked={lender.verified}/></td>
                        <td><Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(lender._id)}><i className='fas fa-trash' /></Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        
        
    </div>
    )
}

export default LenderListPage
