import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudentPage from './pages/StudentPage'
import LenderPage from './pages/LenderPage'
import MyProfilePage from './pages/MyProfilePage'
import StudentMyActivityPage from './pages/StudentMyActivityPage'
import LenderMyActivityPage from './pages/LenderMyActivityPage'
import StudentListPage from './pages/StudentListPage'
import LenderListPage from './pages/LenderListPage'
import LoanListPage from './pages/LoanListPage'
import ApplyForLoanPage from './pages/ApplyForLoanPage'
import SettingsPage from './pages/SettingsPage'
import LoanDetailsPage from './pages/LoanDetailsPage'
import GrantLoanPage from './pages/GrantLoanPage'

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <main> 
            <Route path='/studentlogin' component={LoginPage}/>
            <Route path='/lenderlogin' component={LoginPage}/>
            <Route path='/adminlogin' component={LoginPage}/>
            <Route path='/signup/student' component={SignupPage} />
            <Route path='/signup/lender' component={SignupPage} />
            <Route path='/student/profile' component={MyProfilePage} />
            <Route path='/lender/profile' component={MyProfilePage} />
            <Route path='/student/myactivity'component={StudentMyActivityPage}/>
            <Route path='/lender/myactivity' component={LenderMyActivityPage}/>
            <Route path='/student/applyforloan' component={ApplyForLoanPage}/>
            <Route path='/lender/grantloan' component={GrantLoanPage}/>
            <Route path='/student/settings' component={SettingsPage}/>
            <Route path='/lender/settings' component={SettingsPage}/>
            <Route path='/loans/:id' component={LoanDetailsPage}/>
            <Route path='/admin/students' component={StudentListPage}/>
            <Route path='/admin/lenders' component={LenderListPage}/>
            <Route path='/admin/loans' component={LoanListPage}/>
            <Route path='/student' component={StudentPage} exact/>
            <Route path='/lender' component={LenderPage} exact/>
            <Route path='/' component={HomePage} exact/>
        </main>
        <Footer/>
      </Router>
    </>
  )
}

export default App
