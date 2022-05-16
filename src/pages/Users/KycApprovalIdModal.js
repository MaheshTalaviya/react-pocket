import React, { useState, useEffect } from 'react'

import id from './../../assets/images/id.png'

import Modal from 'react-modal';
import DeclineApproveId from './DeclineApproveId';
import { useForm } from 'react-hook-form';
import { updateKycStatus,userKycManagmentData } from '../../redux/action/UserAction/UserAction'
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
import { useDispatch, useSelector, } from 'react-redux'


const ApproveModal = (props) => {
  
  const [isDeclineApprovalId, setIsDeclineApprovalId] = useState(false);
  const [successApiMsg, setSuccessApiMsg] = useState('')
  const [isFirst, setIsFirst] = useState(false)

  const dispatch = useDispatch();
  const kycStatusMessage = useSelector(state => state.userData.kycStatusMessage)
   const adminPermission=useSelector(state => state.loginData.loginSuccesData)
console.log(props.isUserData)
  useEffect(() => {
   
    if(isFirst) {
    
       if(kycStatusMessage.message){
      
       setSuccessApiMsg(kycStatusMessage.message)
      
      // setTimeout(() =>  props.onClick(), 1000)
      }else{
         setSuccessApiMsg('') 
      }
    }

  },[kycStatusMessage])

  const handleDeclinePopup = () => {
    setIsDeclineApprovalId(!isDeclineApprovalId)

  }


  const submitUpdateKyc = (data) =>{
  const formData ={
        "userId":props.isUserData.userId,
        "status":"approved",
  }
 
  setIsFirst(true)

  if(adminPermission?.permissions){
     if(adminPermission.permissions[0].users.kyc === 'full_access'){
    dispatch(updateKycStatus(formData))
  }else{
   
    let approvelObj={
    "action": "Kyc",
    "action_status": 0,
    "comment": "Approve Kyc",
    "details": {
        "name": props.isUserData.name,
        "userId": props.isUserData.userId,
        "approvalId": props.isUserData.approvalId,
        "submittedDate": props.isUserData.submittedDate,
        "idType":props.isUserData.idType,
        "idNumber":props.isUserData.idNumber,
        //"reason": "ertyuiop", // IN case of decline kyc
        "uploadedDocumentUrl": props.isUserData.uploadedDocumentUrl
    }
}
dispatch(approvelsAddAPiRequest(approvelObj))
 }
  }else{
  dispatch(updateKycStatus(formData))
  }
  props.onClick()
  if(props.isCurrentPage){
 dispatch(userKycManagmentData(props.isCurrentPage,props.slectFilter))
  }
  
  }

  return (
    <div className="cust-close-div">
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()
      
    } style={{content:{maxWidth:"500px",margin:"0 auto",overflow:"auto !important"}}}
    >
      {console.log('kyc',props.isUserData)}
      <div>
        {isDeclineApprovalId ?
          <DeclineApproveId slectFilter={props.isSort} isCurrentPage={props.isCurrentPage} userItem={props.isUserData} onClick={() => setIsDeclineApprovalId(!isDeclineApprovalId)} removePreviousModal={() => props.onClick()} />
          : (
            <div className="modal_height cust-Model-close" id="transModal" tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered common-modal size-2">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Approval ID #{props.isUserData.approvalId}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"

                      onClick={() => props.onClick()}>
                      <i className="icon-icon-close2" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="trans-details">
                      <div className="trans-details-left">
                        <div className="row modified">
                          <div className="col-lg-12">
                          
                          {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''} 

                            <span className="popTitle">User</span>
                            <div className="sender mt-2">
                              <span className="sender-img"><img src={props.isUserData.profileImage} alt="" /></span>
                              <span className="sender-txt">{props.isUserData.name} <br /> <a href="#">{props.isUserData.useremail}</a></span>
                            </div>
                          </div>
                          <div className="col-sm-6 tarnsDetails">
                            <span className="popTitle">ID Type</span>
                            <span className="popDesc">{props.isUserData.idType}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails">
                            <span className="popTitle">ID Number</span>
                            <span className="popDesc">{props.isUserData.idNumber}</span>
                          </div>
                          <div className="col-sm-12 tarnsDetails">
                            <div className="idUp">
                              <span>Uploaded image</span>
                              <img src={props.isUserData.uploadedDocumentUrl ? props.isUserData.uploadedDocumentUrl : id} alt="" />
                            </div>
                          </div>
                          <div className="col-sm-12 tarnsDetails">
                            <div className="row modified">
                              <div className="col-sm-6">
                                <button className="btn btn-block green-btn" disabled={props.isUserData.status==='approved' ? '' : ''} type="button"  onClick={()=>submitUpdateKyc()} ><i className="icon-icon-tick" /> Approve</button>
                              </div>
                              <div className="col-sm-6">
                                <button data-dismiss="modal" data-toggle="modal" disabled={props.isUserData.status==='approved' ? '' : ''} data-target="#transModal-2" className="btn btn-block red-btn" type="button" onClick={() => handleDeclinePopup()}><i className="icon-icon-close2" /> Decline</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </ Modal></div>
  )
}

export default ApproveModal