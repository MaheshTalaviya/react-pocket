import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import user from './../../assets/images/user-4.jpg'

import moment from 'moment';
import {approvelsPermission,getAllApprovelsApiData}from '../../redux/action/Approvels/ApprovelsAction'
import { useDispatch, useSelector, } from 'react-redux'
const ApprovalIdModal = (props) => {
 const dispatch = useDispatch(); 
  const {approvalId, createdDate,adminName, admin, action, comment,id_type,id_number,kyc_action} = props.data ;

  const acceptBtnClick =(data)=>{
    console.log(props)
    dispatch(approvelsPermission({approvalId:data,action:1}))
     dispatch(getAllApprovelsApiData({status:props.data.filter,page:props.data.page}))
      props.onClick()
     
  }
  const declineBtnClick=(data)=>{ 
      dispatch(approvelsPermission({approvalId:data,action:0}))
       dispatch(getAllApprovelsApiData({status:props.data.filter,page:props.data.page}))
      props.onClick()
  }
 /// approvelsPermission
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        <div className="" id="transModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Approval ID #{approvalId}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}  >
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="trans-details">
                  <div className="trans-details-left">
                    <div className="row modified">
                      <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">Admin</span>
                        <span className="popDesc">{adminName}</span>
                      </div>
                      <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">Action</span>
                        <span className="popDesc">{action}</span>
                      </div>
                      <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">Date</span>
                        <span className="popDesc">{moment(createdDate).format('LL')}</span>
                      </div>
                      {/* <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">User</span>
                        <div className="sender mt-2">
                          <span className="sender-img"><img src={user} alt="" /></span>
                          <span className="sender-txt">{admin?.name}<br /> <a href="#">{admin?.email}</a></span>
                        </div>
                      </div> */}
                      {/* <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">ID Type</span>
                        <span className="popDesc">{id_type}</span>
                      </div>
                      <div className="col-sm-6 tarnsDetails alt">
                        <span className="popTitle">ID Number</span>
                        <span className="popDesc">{id_number}</span>
                      </div>
                      <div className="col-sm-12 tarnsDetails alt">
                        <div className="idUp">
                          <span>Uploaded image</span>
                          <img src="assets/images/id.png" alt="" />
                        </div>
                      </div> */}
                      {/* <div className="form-group col-lg-12 mb-0">
                        <label htmlFor="exampleInputEmail1">Comments</label>
                      </div>
                      <div className="form-group col-lg-8">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-lg-4">
                        <button className="btn btn-block grey-btn" type="button">Postpone</button>
                      </div> */}
                      <div className="col-sm-12">
                        <div className="row modified">
                          <div className="col-sm-6">
                            <button data-dismiss="modal" aria-label="Close" onClick={()=>{acceptBtnClick(approvalId)}}  className="btn btn-block green-btn" type="button"><i className="icon-icon-tick" /> Approve</button>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btn-block red-btn" data-dismiss="modal" aria-label="Close" onClick={()=>{declineBtnClick(approvalId)}} type="button"><i className="icon-icon-close2" /> Decline</button>
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

      </div>

    </Modal>

  );
}

export default ApprovalIdModal;