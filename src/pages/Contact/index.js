import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ContactUs =()=>{

    const [email, setEmail] = useState("");
    const [message, setMesage] = useState("");
   const [errortext, setErrortext] = useState(false);
   const [errorMessage, setErrorMessage] = useState(false);
  const [errorApiMsg, setErrorApiMsg] = useState('');
  const [errorEmailtext, setEmailErrortext] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const baseURL = "https://api.pocketi.io/api/v1/";
     const goToDashBoard = () => {
         setSuccessMessage(false)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      setEmailErrortext(false)
      setErrortext(true)
      setErrorApiMsg(false)
    }
    else if (reg.test(email) === false) {
      setEmailErrortext(true)
      setErrorApiMsg(false)
    }else if(message ===''){
        setErrorMessage(true)
    }else{
        setErrorMessage(false)
        setEmailErrortext(false)
         let sendReq={
            email:email,
            message:message
        }

        var config = {
        method: 'post',
        url: baseURL+'cms/support/add_support',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : sendReq
        };

        axios(config)
        .then(function (response) {
        setSuccessMessage(true)
        })
        .catch(function (error) {
        console.log(error);
        });
    }
   

  
}
    return (<div>  <div className="sec-login">
        <div className="row" style={{margin:"0", padding:'0px'}}>
          <div className="col-xl-6 col-lg-6" style={{position:'relative'}}>
            <div className="logo-login">
              <img src="assets/images/logo.svg" alt="" />
            </div>
            <div className="sec-login-left" style={{left:'0px',right:"0px",textAlign:"center"}}>
              <h1>Pocketi </h1>
            
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 align-items-center">
            <div className="sec-login-right" style={{display:'flex', flexDirection:'column', justifyContent:'center', height:'100%' }}>
              <h2>Get in touch</h2>
               {successMessage &&<span className="form-text text-success">Your message reported successfully</span>}
                 <div className="form-group">
                   
                <label htmlFor="exampleInputEmail1">Email</label>
                    {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
                <input type="text" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} name="merchantName" />
                {errortext && !email &&
                <span className="form-text text-error">Please enter email address</span>
              }
              {errorEmailtext &&
                <span className="form-text text-error">Invalid email address</span>
              }
                              {/* <span className="text-danger">{errors.merchantName && 'Merchant name is required.'}</span> */}
                            </div>
                             <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Message</label>
                              <textarea className="form-control" value={message} onChange={(e)=>{setMesage(e.target.value)}}/>
  

                              {errorMessage &&
                <span className="form-text text-error"> Message is required.</span>
              }
                            </div>
                {/* {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
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
              <Button title='Log in' onClick={() => goToDashBoard()} /> */}
            <div className="tab-content" id="myTabContent">
                <input type="button" value="Save "  onClick={goToDashBoard} className="btn btn-block green-btn" />
                <br/>
                {/* {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}
                {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''} */}
                </div>
            </div>
          </div>
        </div>
      </div></div>)
}
export default ContactUs