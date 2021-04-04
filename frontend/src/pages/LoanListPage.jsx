import React, {useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import Switch from 'react-switch'
import { getAllLoan, verifyLoan } from '../actions/adminActions'
import {getLoanById} from '../actions/loanActions'
import store from '../store'
const LoanListPage = ({history}) => {

    const dispatch =useDispatch()

 // const loanList = useSelector(state=>state.loanList)
 //  const {error:loansError,loading:loansLoading,loans}=loanList

    const adminLogin =useSelector(state=>state.adminLogin)
    const {adminInfo}=adminLogin

    useEffect(()=>{
        if(adminInfo){
            dispatch(getAllLoan())
        }else{
            history.push('/')
        }
    },[dispatch,history,adminInfo])

    const {loanList:{loans,loading:loansLoading,error:loansError}}=store.getState()


    const verifiedHandler =(checked,id)=>{
        const verified = !checked
        console.log(verified);
        dispatch(verifyLoan({verified,id}))
    }
    
    const viewDetailsHandler=(id)=>{
        dispatch(getLoanById(id))
        history.push(`/loans/${id}`)
    }

    return (
        <div>
        <h1>Loans</h1>
        {(loansLoading) && <Loader />}
        {(loansError) && <Message variant='danger'>{loansError?loansError:loansError}</Message>}
        {/*() && <Message variant='info'>{`${updateSuccess?'Update Successful. Please referesh to see changes!!':'Delete Successful. Please referesh to see changes !!'}`} </Message>*/}
           {loans &&  <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>STUDENT_NAME</td>
                    <td>LENDER_NAME</td>
                    <td>STATUS</td>
                    <td>VERIFIED</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { loans.map((loan)=>(
                    <tr key={loan._id}>
                        <td>{loan._id}</td> 
                        <td>{loan.student._id}</td>
                        <td>{loan.lender && loan.lender._id}</td>
                        <td>{loan.completed?'Completed':loan.on_going?'On Going':'Not Granted'}</td>
                        <td><Switch onChange={()=>verifiedHandler(loan.verified,loan._id)} checked={loan.verified}/></td>
                        <td><Button className='btn btn-sm' onClick={()=>viewDetailsHandler(loan._id)}>View Details</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        }
        
    </div>
    )
}

export default LoanListPage
