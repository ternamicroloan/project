import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { studentDetailsReducer, studentLoginReducer, studentSignUpReducer, studentUpdateProfileReducer } from './reducers/studentReducer'
import { lenderDetailsReducer, lenderLoginReducer,lenderSignUpReducer, lenderUpdateProfileReducer } from './reducers/lenderReducer'
import { adminLoginReducer, lenderListReducer, studentListReducer,lenderDeleteReducer,studentDeleteReducer, loanListReducer, loanVerifyReducer } from './reducers/adminReducers'
import { installmentUpdateReducer, lenderLoanDetailsReducer, loanCompleteReducer, loanCreateReducer, loanDetailsReducer, loanGrantReducer, studentLoanDetailsReducer } from './reducers/loanReducers'


const reducer=combineReducers({
    studentLogin:studentLoginReducer,
    lenderLogin:lenderLoginReducer,
    adminLogin:adminLoginReducer,
    studentSignUp:studentSignUpReducer,
    lenderSignUp:lenderSignUpReducer,
    studentDetails:studentDetailsReducer,
    lenderDetails:lenderDetailsReducer,
    studentUpdateProfile:studentUpdateProfileReducer,
    lenderUpdateProfile:lenderUpdateProfileReducer,
    lenderList:lenderListReducer,
    studentList:studentListReducer,
    studentDelete:studentDeleteReducer,
    lenderDelete:lenderDeleteReducer,
    loanCreate:loanCreateReducer,
    studentLoanDetails:studentLoanDetailsReducer,
    lenderLoanDetails:lenderLoanDetailsReducer,
    loanDetails:loanDetailsReducer,
    loanList:loanListReducer,
    loanVerify:loanVerifyReducer,
    loanGrant:loanGrantReducer,
    installmentUpdate:installmentUpdateReducer,
    loanComplete:loanCompleteReducer,
})

const studentInfoFromStorage=localStorage.getItem('studentInfo')?JSON.parse(localStorage.getItem('studentInfo')):null
const lenderInfoFromStorage=localStorage.getItem('lenderInfo')?JSON.parse(localStorage.getItem('lenderInfo')):null
const adminInfoFromStorage=localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
const initialState={
    studentLogin:{studentInfo:studentInfoFromStorage},
    lenderLogin:{lenderInfo:lenderInfoFromStorage},
    adminLogin:{adminInfo:adminInfoFromStorage}
}

const middleware=[thunk]
const store =createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store