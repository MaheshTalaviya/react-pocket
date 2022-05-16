import React, { useState, useEffect } from 'react'
import './Login.css'
import TextInput from './../../component/Textinput/textInput'
import TextPasswordInput from './../../component/Textinput/passwordInput'
import { useHistory } from "react-router-dom";
import Button from './../../component/Button/button'
import { addLogInData } from '../../redux/action/LoginAction/LoginAction'
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {

  let history = useHistory();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState(false);

  const [errortextPassword, setErrortextPassword] = useState(false);
  const [errorApiMsg, setErrorApiMsg] = useState('');
  const [errorEmailtext, setEmailErrortext] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [type, setType] = useState("password")

  // password show hide functionlity
  const changeType = () => {
    if (type === "password") {
      setType("text")
    } else if (type === "text") {
      setType("password")
    }
  }

  useEffect(() => {
    if (!isFirst) {
      if (loginData?.loginErrorData?.message) {
        setErrorApiMsg(loginData.loginErrorData.message)
      } else if (loginData?.loginSuccesData?.accessToken) {
        setErrorApiMsg('')
        const role = loginData.loginSuccesData?.role
        if (role === "superadmin" || role === "admin") {
          history.push('/dashboard')
        } else {
        }
      } else {
        return null
      }
    }
  }, [loginData])


  // Redirect to dashboard
  const goToDashBoard = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      setEmailErrortext(false)
      setErrortext(true)
      setErrorApiMsg(false)
    }
    else if (reg.test(email) === false) {
      setEmailErrortext(true)
      setErrorApiMsg(false)
    }
    else if (password === "") {
      setEmailErrortext(false)
      setErrortextPassword(true)
      setErrorApiMsg(false)
    } else {
      setEmailErrortext(false)
      let sendReq = {
        "email": email,
        "password": password
      }
      setIsFirst(false)
      dispatch(addLogInData(sendReq))
    }

  }

  return (
    <div>
      <div className="sec-login">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="logo-login">
              <img src="assets/images/logo.svg" alt="" />
            </div>
            <div className="sec-login-left">
              <h1>Welcome to <br /> Pocketi!</h1>
              <p>Log In to proceed to the dashboard to manage all the <br /> information regarding users and transactions</p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="sec-login-right">
              <h2>Log In</h2>
                {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
              <TextInput label='Email Address' value={email} onChange={(e) => setEmail(e)} />
              {errortext && !email &&
                <span className="form-text text-error">Please enter email address</span>
              }
              {errorEmailtext &&
                <span className="form-text text-error">Invalid email address</span>
              }
              <TextPasswordInput label='Password' value={password}
                onChange={(e) => setPassword(e)} type={type} changeType={changeType} />
              {errortextPassword && !password &&
                <span className="form-text text-error">Please enter password</span>
              }
              <Button title='Log in' onClick={() => goToDashBoard()} />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
