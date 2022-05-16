import React, { useState } from 'react'
import './header.css'
import logo from './../../assets/images/logo.svg'
import user from './../../assets/images/set-bg.png'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { LOGOUT } from "../../redux/action/actionTypes";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Header = (props) => {


  const [activeTab, setActiveTab] = 'Home';
  const [isShowDropDown, setisShowDropDown] = useState(false);
  const activeURL = props.location.pathname

  const adminDetail = useSelector(state => state.loginData.loginSuccesData)
  const dispatch = useDispatch();
  let history = useHistory();
  const logOut = () => {
    dispatch({ type: LOGOUT });
    history.push('/login')
  };


  const DropDown = () => {
    return (
      <div >
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link to='/accountsetting' className="dropdown-item" >Account Settings</Link>
          <Link to='/adminmanagment' className="dropdown-item" >Admin's Management</Link>
          <Link to='/defaultfeessetup'className="dropdown-item" >Default Setup</Link>
          <Link to='/categorysetup'className="dropdown-item" >Category Setup</Link>
          <Link className="dropdown-item logout_btn" onClick={() => logOut()}>Log Out</Link>
        </div>
      </div>
    )

  }
  return (
    <header className="site-header">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-3 col-sm-5 col-8">
          <div className="logo">
            <div className="mobClick">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img src={logo} />
          </div>
        </div>
        <div className="col-xl-8 col-lg-4 col-sm-1 col-1">
          <div className="site-nav">
            <ul className="clearfix">
              <Link to='/dashboard'>  <li><a className={activeURL === '/dashboard' ? "active" : ''} >Home</a></li></Link>
              <Link to='/transaction'><li><a className={activeURL === '/transaction' ? "active" : ''} >Transactions</a></li></Link>
              <Link to='/user'> <li><a className={activeURL === '/user' || activeURL === '/userdetails' || activeURL === '/userkycmanagment' ? "active" : ''}>Users</a></li></Link>
              <Link to='/merchants'>  <li><a className={activeURL === '/merchants' || activeURL === '/merchantsdetails' || activeURL === '/addcampaigns' ? "active" : ''} >Merchants</a></li></Link>
             {adminDetail?.role ==='superadmin' ?  <Link to='/approvals'> <li><a className={activeURL === '/approvals' ? "active" : ''} >Approvals</a></li></Link>: ''}
          
             {adminDetail?.role ==='superadmin' ?  <Link to='/invitations'> <li><a className={activeURL === '/invitations' ? "active" : ''} >Invitations</a></li></Link>: ''}
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-5 col-sm-6 col-3">
          <div className="header-right">
            <div className="top-search">
              <div className="search-wrap clearable">
                <input type="text" className="form-control" placeholder="Search" />
                <i className="fa fa-search" aria-hidden="true"></i>
                <i className="clearable__clear icon-icon-close2"></i>
              </div>
            </div>
            <div className="dropdown btnSet">
              <div onClick={() => setisShowDropDown(!isShowDropDown)} className="dropdown-toggle" type="button" id="dropdownMenuButton" >
                <i className="fa fa-cog" aria-hidden="true"></i>
                <img src={user} />
              </div>
            </div>
            {isShowDropDown && DropDown()}
          </div>
        </div>
      </div>
       <ToastContainer />
    </header>

  )
}
export default withRouter(Header);