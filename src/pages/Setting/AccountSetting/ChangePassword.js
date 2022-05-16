import React from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import { useDispatch, useSelector } from 'react-redux'

const ChangePassword = () => {
 const adminPermission=useSelector(state => state.loginData.loginSuccesData)
  return (
    <div>
      <Header />
      <section className="dash-wrap">
        <div className="settings-block">
          <h1>Reset password</h1>
          <p>The reset password link will be sent to your current email address <a href="#"  >{adminPermission.email}</a>. Follow the link and you will be able to change your password to account.</p>
          <div className="form-group">
            <a href="/resetpassword"><button type="submit"  className="btn btn-block green-btn">Send the reset password link</button></a>
          </div>
        </div>
      </section>
    </div>
  )
}


export default ChangePassword;