import React,{ useEffect,useState } from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import store from "../../../redux/store/store"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, } from 'react-redux'
import {updateAdminEmail } from '../../../redux/action/SettingAction/SettingAction'
import { useHistory } from "react-router-dom";
import {approvelsAddAPiRequest}from '../../../redux/action/Approvels/ApprovelsAction'
const ChangeEmail = (props) => {
  const [isFirst,setIsFirst] = useState(false)
  const [successApiMsg,setSuccessApiMsg] = useState('')
  const [errorApiMsg,setErrorApiMsg] = useState('')


  const data = store.getState();
  const adminData = data.loginData?.loginSuccesData

  let history = useHistory();
  const dispatch = useDispatch(); 
  const successMessage = useSelector(state => state.settingData.updateAdminSuccessMgs)
  const errorMessage   = useSelector(state => state.settingData.updateAdminErrorMgs)

  useEffect(() => {
    
    if(isFirst){
        if(successMessage?.message){
          setSuccessApiMsg(successMessage.message)
          history.push('/changeemailsuccess')
        }
        if(errorMessage?.message){
          setErrorApiMsg(errorMessage?.message)
        }
      }
  },[successMessage,errorMessage])

  const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook

  const updateAdminEmailHandler = (data)=>{
const body = { 
        "id": adminData.id,
        "email": data.email,
        "password":data.password
      }

    if(adminData?.permissions){
      if(adminData.permissions[0].others.changeEmail === 'full_access'){
        dispatch(updateAdminEmail(body))
      }else{
        const sendReq={
    "action": "Change Email",
    "action_status": 1,
    "comment": "Update admn eamil",
    "details": {
        "adminId": adminData.id,
        "email": data.email
    }
}

dispatch(approvelsAddAPiRequest(sendReq))
      }
    }else{
      dispatch(updateAdminEmail(body))
    }  
      // const body = { 
      //   "id": adminData.id,
      //   "email": data.email,
      //   "password":data.password
      // }
      
      // dispatch(updateAdminEmail(body))
      setIsFirst(true)
    }
  return (
    <div>
      <Header />
      <section className="dash-wrap">
        <div className="settings-block">
        {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}
        {errorApiMsg ? <p className="form-text text-center text-danger">{errorApiMsg}</p> : ''}

        
          <form onSubmit={handleSubmit(updateAdminEmailHandler)}>
            <h1>Changing email</h1>
            <div className="form-group">
              <label htmlFor>New email address</label>
              <div className="inpWrap">
                <input 
                  type="text" 
                  className="form-control" 
                  name="email"
                  defaultValue={adminData.email} 
                  placeholder="example@gmail.com" 
                  ref={register({required:true})} 
                />
                <span className="text-danger">{errors.email && 'required.'}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor>Current password</label>
              <div className="inpWrap">
                <input 
                  type="password" 
                  name="password"
                  className="form-control" 
                  placeholder="************" 
                  ref={register({required:true})}
                />
                <span className="text-danger">{errors.password && 'current passsword required.'}</span>
                <div className="form-icon"><i className="fa fa-eye-slash" aria-hidden="true" /></div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block green-btn">Save settings</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}


export default ChangeEmail;