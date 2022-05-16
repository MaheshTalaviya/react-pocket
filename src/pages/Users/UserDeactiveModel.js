import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import user from './../../assets/images/user-photo.png'
import { activatekUser} from '../../redux/action/UserAction/UserAction'
import { useDispatch, useSelector, } from 'react-redux'
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'

// {
//     "action": "User Action",
//     "action_status": 1, // always one
//     "comment": "Fake user",
//     "details": {
//         "userId": 3
//     }
// }
const UserDeactiveModal = (props) => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userSuccesData)
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)
  const userActivateStatus = async (item) => {
    let sendReq = {
      "id": props.isUserData.id,
      "status": 1
    }
    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].users.userAction === 'full_access'){
         const response = await dispatch(activatekUser(sendReq)); 
      if (response) {
        props.onClick();

      } else {
        alert('error')
      }
      }else{
          let snedReqs= {
            "action": "User Action",
            "action_status": 1, // always one
            "comment": "",
            "details": {
                "userId":props.isUserData.id
            }
        }
        dispatch(approvelsAddAPiRequest(snedReqs))
        props.onClick();
      } 
    }else{
      const response = await dispatch(activatekUser(sendReq)); 
      if (response) {
        props.onClick();

      } else {
        alert('error')
      }
    }   
    // const response = await dispatch(activatekUser(sendReq));
    
    // if (response) {
    //   props.onClick();

    // } else {
    //   alert('error')
    // }
  }

  const userDeactivateStatus = async (item) => {
    let sendReq = {
      "id": props.isUserData.id,
      "status": 0
    }
  
    // const response = await dispatch(activatekUser(sendReq));
    // console.log('res..', response)
    // if (response) {
    //   props.onClick();

    // } else {
    //   alert('error')
    // }

     if(adminPermission?.permissions){
      if(adminPermission.permissions[0].users.userAction === 'full_access'){
         const response = await dispatch(activatekUser(sendReq)); 
      if (response) {
        props.onClick();

      } else {
        alert('error')
      }
      }else{
          let snedReqs= {
            "action": "User Action",
            "action_status": 0, // always one
            "comment": "",
            "details": {
                "userId":props.isUserData.id
            }
        }
        dispatch(approvelsAddAPiRequest(snedReqs))
        props.onClick();
      } 
    }else{
      const response = await dispatch(activatekUser(sendReq)); 
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
        <div className="" id="deleteModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">User ID #{props.isUserData.id} </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()} >
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="userModalCont">
                  <h2 className="modalTitle">You are about to deactivate a user</h2>
                  <div className="userBlock">
                    <div className="userBlock-img"><img src={props.isUserData.profileImage} alt="" /></div>
                    <div className="userBlock-txt">
                      <h2>{props.isUserData.username}</h2>
                      <p>+{props.isUserData.phone}</p>
                      <p>{props.isUserData.useremail}</p>
                      <p><span>{props.isUserData.accountType}</span></p>
                    </div>
                  </div>
                  <div className="row modified">
                    <div className="col-sm-6">
                      <button className="btn btn-block red-btn mt-4" type="button" onClick={()=>{props.onClick()}}>Cancel</button>
                    </div>
                    <div className="col-sm-6">
                    {props.isUserData.status===0
                    ?
                    <button className="btn btn-block grey-btn mt-4"data-dismiss="modal" type="button" onClick={() => userActivateStatus()}>Activated</button>
                    :
                    <button className="btn btn-block grey-btn mt-4"data-dismiss="modal" type="button" onClick={() => userDeactivateStatus()}>Deactivate</button>
                  }
                     
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

export default UserDeactiveModal;