import React, { useState, useEffect } from 'react'
import User from "../../assets/images/user-4.jpg"
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { updateKycStatus,userKycManagmentData } from '../../redux/action/UserAction/UserAction'
import { useDispatch, useSelector, } from 'react-redux'
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
const DeclineApprovalId = (props) => {

  const [successApiMsg, setSuccessApiMsg] = useState('')
  const [isFirst, setIsFirst] = useState(false)

  const dispatch = useDispatch();
  const kycStatusMessage = useSelector(state => state.userData.kycStatusMessage)
const adminPermission=useSelector(state => state.loginData.loginSuccesData)

  
  useEffect(() => {
   
    if(isFirst) {
      if(kycStatusMessage?.message){
       setSuccessApiMsg(kycStatusMessage.message)
       setTimeout(() =>  props.onClick(), 1000)
      }else{
         setSuccessApiMsg('') 
      }
    }

  },[kycStatusMessage])

  const handleModal = () => {
    
    props.removePreviousModal();
    props.onClick()
  }

  const { register, handleSubmit, reset, errors } = useForm(); 
 
  // initialize the hook
  const submitUpdateKyc = (data) =>{
    if(adminPermission?.permissions){
if(adminPermission.permissions[0].users.kyc === 'full_access'){
      const formData ={
        "userId":props.userItem.userId,
        "reason":data.reason,
        "status":"declined",
  }
 
  dispatch(updateKycStatus(formData))
  }else{
     let approvelObj={
    "action": "Kyc",
    "action_status": 1,
    "comment": "Declined Kyc",
    "details": {
        "name": props.userItem.name,
        "userId": props.userItem.userId,
        "approvalId": props.userItem.approvalId,
        "submittedDate": props.userItem.submittedDate,
        "idType":props.userItem.idType,
        "idNumber":props.userItem.idNumber,
        "reason": data.reason, // IN case of decline kyc
        "uploadedDocumentUrl": props.userItem.uploadedDocumentUrl
    }
}
dispatch(approvelsAddAPiRequest(approvelObj))
  }
    }else{
       const formData ={
        "userId":props.userItem.userId,
        "reason":data.reason,
        "status":"declined",
  }
 
  dispatch(updateKycStatus(formData))
    }
//   if(adminPermission.permissions[0].users.kyc === 'full_access'){
//       const formData ={
//         "id":props.userItem.approvalId,
//         "reason":data.reason,
//         "status":"declined",
//   }
 
//   dispatch(updateKycStatus(formData))
//   }else{
//      let approvelObj={
//     "action": "Kyc",
//    // "action_status": 1,
//     "comment": "Declined Kyc",
//     "details": {
//         "name": props.userItem.name,
//         "userId": props.userItem.userId,
//         "approvalId": props.userItem.approvalId,
//         "submittedDate": props.userItem.submittedDate,
//         "idType":props.userItem.idType,
//         "idNumber":props.userItem.idNumber,
//         "reason": data.reason, // IN case of decline kyc
//         "uploadedDocumentUrl": props.userItem.uploadedDocumentUrl
//     }
// }
// dispatch(approvelsAddAPiRequest(approvelObj))
//   }
  if(props.isCurrentPage){
 
 dispatch(userKycManagmentData(props.isCurrentPage,'declined'))
  }
   setIsFirst(true)
    handleModal()
  }
  return (
    < Modal
      isOpen={true}
    >
      <div>
        <div className="" id="transModal-2" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Approval ID #{props.userItem.approvalId}
              </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleModal()}
                >
                  <i className="icon-icon-close2"/>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleSubmit(submitUpdateKyc)}>
                <div className="trans-details">
                  <div className="trans-details-left">

                  {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}

                    <span className="popTitle large">KYC status change</span>
                    <div className="row modified">
                      <div className="col-sm-8">
                        <div className="sender">
                          <span className="sender-img">
                            <img src={props.userItem.profileImage ? props.userItem.profileImage : User} alt="" />
                          </span>
                          <span className="sender-txt">
                            {props.userItem.name} <br />{" "}
                            <a href="/#">{props.userItem.useremail}</a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <button
                          style={{ marginLeft: "-56px" }}
                          className="btn red-btn sm-btn"
                          type="button"
                        >
                          Declined
                      </button>
                      </div>
                      <div className="form-group col-lg-12 mt-4">
                        <label htmlFor="exampleInputEmail1">
                          Reason for decline
                      </label>
                        <input

                           className="form-control"
                          name="reason"
                          ref={register ({ required: true })}
                        />
                         <span className="text-danger">{errors.reason && 'Reason is required.'}</span>
                      </div>
                      <div className="col-sm-12">
                        <div className="row modified">
                          <div className="col-sm-12">
                            <button
                              className="btn btn-block green-btn"
                              type="submit"
                            >
                              Submit
                          </button>
                          </div>
                          {/* <div className="col-sm-6">
                          <button
                            className="btn btn-block red-btn"
                            type="button"
                          >
                            <i className="icon-icon-close2" /> Decline
                          </button>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ Modal>
  );
};

export default DeclineApprovalId;