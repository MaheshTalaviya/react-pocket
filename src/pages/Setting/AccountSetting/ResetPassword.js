import React,{useState,useEffect} from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import TextPasswordInput from '../../../component/Textinput/passwordInput'
import { useHistory } from "react-router-dom";
import {updateAdminPassword} from '../../../redux/action/SettingAction/SettingAction'
import { useDispatch, useSelector } from 'react-redux'
import {approvelsAddAPiRequest}from '../../../redux/action/Approvels/ApprovelsAction'
const ResetPassword = (props) => {
  const [type, setType] = useState("password")
  const [newType, setNewType] = useState("password")
  const [oldType, setOldType] = useState("password")
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassErr, setNewPassErr] = useState();
  const [confirmPassErr, setConfirmPassErr] = useState();
  const [comparePassErr, setComparePassErr] = useState();
  const [OldPassErr, setOldPassErr] = useState();
  const [oldPassValidErr,setOldPassValidErr]=useState()
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)
  const response=useSelector(state => state.settingData.updatePassResponse)
 
    const dispatch = useDispatch();
    const  history = useHistory();
   const changeType = () => {
    if (type === "password") {
      setType("text")
    } else if (type === "text") {
      setType("password")
    }
  }
  const oldchangeType = () => {
    if (oldType === "password") {
      setOldType("text")
    } else if (oldType === "text") {
      setOldType("password")
    }
  }

  
  const changeNewType = () => {
    if (newType === "password") {
      setNewType("text")
    } else if (newType === "text") {
      setNewType("password")
    }
  }
  // useEffect(()=>{
  //   setComparePassErr(false)
  //   setConfirmPassErr(false)
  //   setNewPassErr(false)
  // },[])
  useEffect(()=>{
     if(Object.keys(response).length !== 0){
          if(response?.status === true){
           history.push('/changepasswordsuccess')
          }else{
            setOldPassValidErr(true)
          }
     }
  },[response])
 const valid=()=>{
   
if(comparePassErr === false && confirmPassErr===false && newPassErr===false && password!==''&& OldPassErr ===false&& newPassword !==''&& oldPassword !==''){

  setTimeout(async function(){ 
     if(adminPermission?.permissions){
      if(adminPermission.permissions[0].others.changePassword === 'full_access'){
        dispatch(updateAdminPassword({adminId:adminPermission.id,password:password,oldPassword:oldPassword}))
      }else{
        let sendReq={
    "action": "Change Password",
    "action_status": 1,
    "comment": "Update admin password",
    "details": {
        "adminId": adminPermission.id,
        "password": password,
         "oldpassword": oldPassword
    }
}

dispatch(approvelsAddAPiRequest(sendReq))
      }
    }else{
dispatch(updateAdminPassword({adminId:adminPermission.id,password:password,oldPassword:oldPassword}))
    } 
    
    //history.push('/changepasswordsuccess')
   }, 100);
 }
}
useEffect(()=>{
  valid()
},[comparePassErr,confirmPassErr,newPassErr,OldPassErr])
  const updatePassword=()=>{
    setOldPassValidErr(false)
      if(password ===''){
       setConfirmPassErr(true)
       
      }else{
        setConfirmPassErr(false)
        
      }

      if(newPassword ===''){
         setNewPassErr(true)
         
      }else{
        setNewPassErr(false)
        
      }


      if(oldPassword ===''){
         setOldPassErr(true)
         
      }else{
        setOldPassErr(false)
        
      }
      
      if(password!=='' && newPassword!==''){
          if(newPassword!==password){
           
            setComparePassErr(true)
          }
          else{
             
             setComparePassErr(false)
          }
        }else{
          
             setComparePassErr(false)
          }
     //  valid()
     // 
       //
  }
  return (
    <div>
      <Header />
      <section className="dash-wrap">
        <div className="settings-block">
          <h1>Changing Password</h1>
          <p style={{color:"red",display:oldPassValidErr?"block":"none"}}>{response && response?.message}</p>
          <div className="form-group">
            <label htmlFor>Old password</label>
            <div className="inpWrap">
               <TextPasswordInput  value={oldPassword}
                onChange={(e) => setOldPassword(e)} type={oldType} changeType={oldchangeType} />
              {/* <input type="password" className="form-control" placeholder="************" />
              <div className="form-icon"><i className="fa fa-eye-slash" aria-hidden="true" /></div> */}
            </div>
            {OldPassErr && !oldPassword &&
                <span className="form-text text-error">Please enter old password</span>
              }
          </div>
             <div className="form-group">
            <label htmlFor>New password</label>
            <div className="inpWrap">
               <TextPasswordInput  value={newPassword}
                onChange={(e) => setNewPassword(e)} type={type} changeType={changeType} />
              {/* <input type="password" className="form-control" placeholder="************" />
              <div className="form-icon"><i className="fa fa-eye-slash" aria-hidden="true" /></div> */}
            </div>
            {newPassErr && !newPassword &&
                <span className="form-text text-error">Please enter new password</span>
              }
          </div>
          <div className="form-group">
            <label htmlFor>Confirm new password</label>
            <div className="inpWrap">
               <TextPasswordInput  value={password}
                onChange={(e) => setPassword(e)} type={newType} changeType={changeNewType} />
              {/* <input type="password" className="form-control" placeholder="************" />
              <div className="form-icon"><i className="fa fa-eye-slash" aria-hidden="true" /></div>href="/changepasswordsuccess" */}
            </div>
            {confirmPassErr && !password &&
                <span className="form-text text-error">Please enter confirm new password
</span>
              }
          </div>
          {comparePassErr &&
                <span className="form-text text-error">Password does not match
</span>
              }
          <div className="form-group">
            <a ><button type="submit" onClick={updatePassword} className="btn btn-block green-btn">Save password</button></a>
          </div>
        </div>
      </section>
    </div>
  )
}


export default ResetPassword;