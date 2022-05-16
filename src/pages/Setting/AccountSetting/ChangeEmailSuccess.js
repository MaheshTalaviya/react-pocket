import React from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import { useHistory } from "react-router-dom";


const ChangeEmailSuccess = () => {
  let history = useHistory();
  const backToAccountSetting=()=>{
    history.push('/accountsetting')
  }
  return (
    <div>
      <Header />
      <section className="dash-wrap">
        <div className="settings-block">
          <h1>Success</h1>
          <h2>Email address has changed successfully </h2>
          <p>You can now use the new email address to log <br /> in to Pocketi account.</p>
          <div className="form-group">
            <a href="javascript:void(0)" onClick={()=>backToAccountSetting()}><button type="button" className="btn btn-block green-btn">Back to Account settings</button></a>
          </div>
        </div>
      </section>
    </div>
  )
}


export default ChangeEmailSuccess;