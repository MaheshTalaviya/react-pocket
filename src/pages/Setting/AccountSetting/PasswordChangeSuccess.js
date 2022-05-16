import React from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';



const ChangePasswordSuccess = () => {
  return (
    <div>
      <Header />
      <section className="dash-wrap">
        <div className="settings-block">
          <h1>Success</h1>
          <h2>Password has changed successfully</h2>
          <p>You can now use the new password to log <br /> in to Pocketi account.</p>
          <div className="form-group">
            <a href="/accountsetting"><button type="submit" className="btn btn-block green-btn">Back to Account settings</button></a>
          </div>
        </div>
      </section>

    </div>
  )
}


export default ChangePasswordSuccess;