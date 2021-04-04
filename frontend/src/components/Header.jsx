import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navbar,Nav,NavDropdown,NavLink} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutStudent } from '../actions/studentActions'
import { logoutLender } from '../actions/lenderActions'
import {logoutAdmin} from '../actions/adminActions'
import logo from '../images/headerlogo.jpg'

const Header = ({history}) => {

    const dispatch=useDispatch()
    const studentLogin=useSelector(state=>state.studentLogin)
    const{studentInfo}=studentLogin
    
    const lenderLogin=useSelector(state=>state.lenderLogin)
    const{lenderInfo}=lenderLogin

    const adminLogin=useSelector(state=>state.adminLogin)
    const {adminInfo}=adminLogin


    const studentLogoutHandler=()=>{
        dispatch(logoutStudent())
    }

    const lenderLogoutHandler=()=>{
        dispatch(logoutLender())
    }

    const adminLogoutHandler=()=>{
        dispatch(logoutAdmin())
    }

    return (
        <header>

            { studentInfo ? (
            <Navbar style={{background:'#011338'}} variant='dark' collapseOnSelect expand='lg'>
                <LinkContainer to='/student'>
                    <Navbar.Brand>{studentInfo.name}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    <LinkContainer to='/student/applyforloan'><NavLink >Apply For Loan</NavLink></LinkContainer>
                    <LinkContainer to='/student/myactivity'><NavLink >My Activity</NavLink></LinkContainer>
                    <LinkContainer to='/student/settings'><NavLink >Settings</NavLink></LinkContainer>
                    <LinkContainer to='/student/profile'><NavLink >Profile</NavLink></LinkContainer>
                    <LinkContainer to='/'><NavLink onClick={studentLogoutHandler}>Logout</NavLink></LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            ):lenderInfo ? ( 
            <Navbar style={{background:'#011338'}} variant='dark' collapseOnSelect expand='lg'>
                <LinkContainer to='/lender'>
                    <Navbar.Brand>{lenderInfo.name}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <LinkContainer to='/lender/grantloan'><NavLink >Grant Loan</NavLink></LinkContainer>
                        <LinkContainer to='/lender/myactivity'><NavLink >My Activity</NavLink></LinkContainer>
                        <LinkContainer to='/lender/settings'><NavLink >Settings</NavLink></LinkContainer>
                        <LinkContainer to='/lender/profile'><NavLink >Profile</NavLink></LinkContainer>
                        <LinkContainer to='/'><NavLink onClick={lenderLogoutHandler}>Logout</NavLink></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            ): adminInfo ?(
                <Navbar style={{background:'#011338'}} variant='dark' collapseOnSelect expand='lg'>
                <LinkContainer to='/'>
                    <Navbar.Brand>{adminInfo.name}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <LinkContainer to='/admin/students'><NavLink >Students</NavLink></LinkContainer>
                        <LinkContainer to='/admin/lenders'><NavLink >Lenders</NavLink></LinkContainer>
                        <LinkContainer to='/admin/loans'><NavLink >Loans</NavLink></LinkContainer>
                        <LinkContainer to='/'><NavLink onClick={adminLogoutHandler}>Logout</NavLink></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            ):(
                <Navbar style={{background:'#011338'}} variant='dark' collapseOnSelect expand='lg'>
                <LinkContainer to='/'>
                    <Navbar.Brand><img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top "
                        alt="Micro Loan"
                    />{' '}Micro Loan</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <NavDropdown title='login'>
                            <LinkContainer to='/studentlogin'>
                                <NavDropdown.Item>Student</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/lenderlogin'>
                                <NavDropdown.Item>Lender</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/adminlogin'>
                                <NavDropdown.Item>Admin</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            )
            }
            
        </header>
            
    )
}

export default Header
