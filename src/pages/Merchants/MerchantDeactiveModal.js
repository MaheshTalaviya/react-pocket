import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import user from './../../assets/images/user-photo.png'
import { activatekMerchant} from '../../redux/action/MerchantAction/MerchantAction'
import { useDispatch, useSelector, } from 'react-redux'
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'


const MerchantDeactiveModal = (props) => {
  
  const dispatch = useDispatch();
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)


  const userActivateStatus = async (item) => {
    let sendReq = {
      "id": props.isUserData.id,
      "status": 1
    }
  
    // const response = await dispatch(activatekMerchant(sendReq));
    
    // if (response) {
    //   props.onClick();

    // } else {
    //   alert('error')
    // }
     if(adminPermission?.permissions){
      if(adminPermission.permissions[0].merchants.merchantAction === 'full_access'){
         const response = await dispatch(activatekMerchant(sendReq));
    
    if (response) {
      props.onClick();

    } else {
      alert('error')
    }
      }else{
      let sendReqs= {
    "action": "Activate Merchant",
    "action_status": 1,
    "comment": "activate merchant",
    "details": {
         "merchantId": props.isUserData.id
    }
}
    
        dispatch(approvelsAddAPiRequest(sendReqs))
         props.onClick();
      }
    }else{
      const response = await dispatch(activatekMerchant(sendReq));
    
    if (response) {
      props.onClick();

    } else {
      alert('error')
    }
    }  
  }




  const userDeactivateStatus = async (item) => {
    let sendReq = {
      "id": props.isUserData.id,
      "status": 0
    }
  
    // const response = await dispatch(activatekMerchant(sendReq));
   
    // if (response) {
    //   props.onClick();

    // } else {
    //   alert('error')
    // }
    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].merchants.merchantAction === 'full_access'){
         const response = await dispatch(activatekMerchant(sendReq));
    
    if (response) {
      props.onClick();

    } else {
      alert('error')
    }
      }else{
      let sendReqs= {
    "action": "Deactivate Merchant",
    "action_status": 0,
    "comment": "activate merchant",
    "details": {
         "merchantId": props.isUserData.id
    }
}
    
        dispatch(approvelsAddAPiRequest(sendReqs))
         props.onClick();
      }
    }else{
      const response = await dispatch(activatekMerchant(sendReq));
    
    if (response) {
      props.onClick();

    } else {
      alert('error')
    }
    }  
  }
  
console.log(props.isUserData)
  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >


      <div>
        <div className="" id="deleteModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Merchant ID #{props.isUserData.id} </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()} >
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="userModalCont">
                  <h2 className="modalTitle">You are about to deactivate a merchant</h2>
                  <div className="userBlock">
                    <div className="userBlock-img"><img src={props.isUserData.coverImageUrl} alt="" /></div>
                    <div className="userBlock-txt">
                      <h2>{props.isUserData.username}</h2>
                      <p>+{props.isUserData.phone}</p>
                      <p>{props.isUserData.useremail}</p>
                      <p><span>{props.isUserData.type}</span></p>
                    </div>
                  </div>
                  <div className="row modified">
                    <div className="col-sm-6">
                      <button data-dismiss="modal" className="btn btn-block red-btn mt-4" onClick={() => props.onClick()}  type="button">Cancel</button>
                    </div>
                    <div className="col-sm-6">
                    {props.isUserData.status===0
                    ?
                    <button className="btn btn-block grey-btn mt-4" type="button" onClick={() => userActivateStatus()}>Activated</button>
                    :
                    <button className="btn btn-block grey-btn mt-4" type="button" onClick={() => userDeactivateStatus()}>Deactivate</button>
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

export default MerchantDeactiveModal;