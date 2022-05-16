import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useHistory } from "react-router-dom";
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import store from "../../../redux/store/store"


const AccountSetting = () => {
  let history = useHistory();


    const data = store.getState();
   const adminData = data.loginData?.loginSuccesData

  const redirectChangePasswordPage=()=>{
    if(adminData.role ==='admin' &&  adminData.permissions[0].others.changeEmail ==='view_only'){
        return true
    }else{
       history.push('/changeemail')
    }
   
  }
  const redirectChangePasswordComp=()=>{
    if(adminData.role ==='admin' &&  adminData.permissions[0].others.changePassword ==='view_only'){
        return true
    }else{
       history.push('/resetpassword')
    }
   
  }

  return ( 
    <div>
      <Header />
      <section className="dash-wrap">   
        <div className="settings-block">
          <h1>Account Settings</h1>
          <div className="form-group">
            <label htmlFor>Email address</label>
            <div className="inpWrap">
              <input readOnly type="text" className="form-control pl-0" defaultValue={adminData.email} />
              <a 
                className={`linkIcon ${adminData.role ==='admin' &&  adminData.permissions[0].others.changeEmail ==='view_only' ? 'disabled':''}`} 
                onClick={()=>redirectChangePasswordPage()}
              >Change email</a>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor>Password</label>
            <div className="inpWrap">
              <input readOnly type="password" className="form-control pl-0" defaultValue="password" />
              <a className={`linkIcon ${adminData.role ==='admin' &&  adminData.permissions[0].others.changePassword ==='view_only' ? 'disabled':''}`} 
                onClick={()=>redirectChangePasswordComp()} href="javascript:void(0)">Change password</a>
            </div>
          </div>
          {/* <div className="form-group">
            <button type="submit" className="btn btn-block green-btn">Save settings</button>
          </div> */}
        </div>
      </section>




    </div>
  )
}


export default AccountSetting;