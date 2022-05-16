import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { blockUser, unBlockUserStatus } from '../../redux/action/UserAction/UserAction'
import { useDispatch, useSelector, } from 'react-redux'
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
// const userData = useSelector(state => state.userData.userSuccesData)
import { useHistory } from "react-router-dom";
const UserBlockModal = (props) => {
 
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userSuccesData)
  const history=useHistory();
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)
 const [blockMsg,setBlockMsg]=useState();
 const blockMessage=(e)=>{
   setBlockMsg(e.target.value)
 }
 const userBlockStatus = async (item) => {
 
 
    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].users.blockUser === 'full_access'){
         let sendReq = {
        "id": props.isUserData.id,
        "is_block": 1
      }

      // dispatch(blockUser(sendReq))
      const response = await dispatch(blockUser(sendReq));

      if (response) {
        props.onClick();
    
      } else {
        alert('error')
      }
      }else{
         let sendReq = {
          "action": "Block User",
          "action_status": 1, // always one
          "comment": blockMsg,
          "details": {
              "userId": props.isUserData.id,
              
          }
}

      // dispatch(blockUser(sendReq))
      const response = await dispatch(approvelsAddAPiRequest(sendReq));

      
        props.onClick();
    
   
      }
    }else{
        let sendReq = {
        "id": props.isUserData.id,
        "is_block": 1
      }

      // dispatch(blockUser(sendReq))
      const response = await dispatch(blockUser(sendReq));

      if (response) {
        props.onClick();
    
      } else {
        alert('error')
      }
    }
 }



  const userUnBlockStatus = async (item) => {
    // let sendReq = {
    //   "id": props.isUserData.id,
    //   "is_block": 0
    // }
    // const response = dispatch(blockUser(sendReq))
    // if (response) {
      
    //   props.onClick();

    // } else {
    //   alert('error')
    // }

    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].users.blockUser === 'full_access'){
         let sendReq = {
        "id": props.isUserData.id,
        "is_block": 0
      }

      // dispatch(blockUser(sendReq))
      const response = await dispatch(blockUser(sendReq));

      if (response) {
        props.onClick();
    
      } else {
        alert('error')
      }
      }else{
         let sendReq = {
          "action": "Block User",
          "action_status": 0, // always one
          "comment": blockMsg,
          "details": {
              "userId": props.isUserData.id,
              
          }
}

      // dispatch(blockUser(sendReq))
      const response = await dispatch(approvelsAddAPiRequest(sendReq));

      
        props.onClick();
    
   
      }
    }else{
        let sendReq = {
        "id": props.isUserData.id,
        "is_block": 0
      }

      // dispatch(blockUser(sendReq))
      const response = await dispatch(blockUser(sendReq));

      if (response) {
        props.onClick();
    
      } else {
        alert('error')
      }
    }

  }



  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
      style={{content:{maxWidth:"500px",margin:"0 auto"}}}
    >
      <div>
        <div className="" id="blockModal"  tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Blocking</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="userModalCont">
                  <h2 className="modalTitle">You are about to block a user</h2>
                  <div className="userBlock">
                    <div className="userBlock-img"><img src={props.isUserData.profileImage} alt="" /></div>
                    <div className="userBlock-txt">
                      <h2>{props.isUserData.username}</h2>
                      <p>+{props.isUserData.phone}</p>
                      <p>{props.isUserData.useremail}</p>
                      <p><span>{props.isUserData.accountType}</span></p>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <label className="grey" htmlFor="exampleInputEmail1">Reason for blocking
                    (optional)</label>
                    <input type="text" className="form-control" value={blockMsg} onChange={blockMessage} />
                  </div>
                  {props.isUserData.is_block===0
                  ?
                  <button className="btn btn-block red-btn"  data-dismiss="modal" type="button" onClick={() => userBlockStatus()} >Block</button>

                  :
                  <button className="btn btn-block red-btn"  data-dismiss="modal" type="button" onClick={() => userUnBlockStatus()}  >UnBlock</button>
                  }
                 
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Modal>

  );
}

export default UserBlockModal;