import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import user from './../../assets/images/user-photo.png'
import { paymentPermissionStatus} from '../../redux/action/UserAction/UserAction'
import { useDispatch, useSelector, } from 'react-redux'
import { useForm } from 'react-hook-form';
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
const UserPaymentModal = (props) => {

  const[isFirst,setIsFirst] = useState(false);
  const[isSuccessMsg,setIsSuccessMsg] = useState(false);

  const dispatch = useDispatch();
  const paymentMsg = useSelector(state => state.userData.paymentPermissionStatus)
   const adminPermission=useSelector(state => state.loginData.loginSuccesData)

  useEffect(() => {
      if(isFirst){
          if(paymentMsg.message){
            setIsSuccessMsg(paymentMsg.message)
            setTimeout(() =>  props.onClick(), 1000)
          }
      }
  }, [paymentMsg])

  const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook

  const savePaymentStatus =  (data) => {
  
  // console.log("data",props.isUserData.id);
   let formData = ''
   if(data.payment==='request'){
    formData = {
      'userId':props.isUserData.id,
      'request': 0,
      'receive': 1,
      'status': 0
    }
   }
   if(data.payment==='receive'){
    formData = {
      'userId':props.isUserData.id,
      'request': 1,
      'receive': 0,
      'status': 0
    }
   }
   if(data.payment==='both'){
    formData = {
      'userId':props.isUserData.id,
      'request': 0,
      'receive': 0,
      'status': 1
    }
   }
    if(data.payment==='unblock'){
    formData = {
      'userId':props.isUserData.id,
      'request': 1,
      'receive': 1,
      'status': 1
    }
   }
   
   let sendReq={
    "action": "Prevent Payment",
    "action_status": 1, // always one
    "comment": "",
    "details":formData
   }
    
  setIsFirst(true)
    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].users.preventPayment === 'full_access'){
        dispatch(paymentPermissionStatus(formData))
      }else{
        dispatch(approvelsAddAPiRequest(sendReq))
      }
    }else{
      dispatch(paymentPermissionStatus(formData))
    }  
document.body.className = '';
   
  }

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
      style={{content:{maxWidth:"500px",margin:"0 auto"}}}
    >
      <div className="" id="preventModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered common-modal size-2">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Preventing payment</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()} >
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body">
            <form   onSubmit={handleSubmit(savePaymentStatus)}> 
              <div className="userModalCont">
                {isSuccessMsg ? <p className="form-text text-success">{isSuccessMsg}</p> :''}
                <h2 className="modalTitle">You are about to prevent payment</h2>
                <div className="userBlock">
                  <div className="userBlock-img"><img src={props.isUserData.profileImage} alt="" /></div>
                  <div className="userBlock-txt">
                    <h2>{props.isUserData.username}</h2>
                    <p>+{props.isUserData.phone}</p>
                    <p>{props.isUserData.useremail}</p>
                    <p><span>{props.isUserData.accountType}</span></p>
                  </div>
                </div>
                <h3 className="label mt-4">Choose what payments should be prevented</h3>
                <label className="custom-radio">Only requests 
                  <input 
                    type="radio" 
                    defaultChecked={props.isUserData.payment_request===0 ? 'checked' : ''} 
                    name="payment" 
                    value="request"
                    ref={register({required:true})}
                  />
                  <span className="checkmark" />
                </label>
                <label className="custom-radio">Only payments 
                  <input 
                    type="radio" 
                    defaultChecked={props.isUserData.payment_receive===0 ? 'checked' : ''} 
                    name="payment" 
                    value="receive"
                    ref={register({required:true})}
                  />
                  <span className="checkmark" />
                </label>
                <label className="custom-radio">Both requests and payments 
                  <input 
                    type="radio"
                    name="payment" 
                    value="both"
                    defaultChecked={props.isUserData.payment_request===0 && props.isUserData.payment_receive===0 ? 'checked' : ''}
                    ref={register({required:true})}
                    />
                  <span className="checkmark" />
                </label>
                <label className="custom-radio">Unblock both requests and payments 
                  <input 
                    type="radio"
                    name="payment" 
                    value="unblock"
                    defaultChecked={props.isUserData.payment_request===1 && props.isUserData.payment_receive===1 ? 'checked' : ''}
                    ref={register({required:true})}
                    />
                  <span className="checkmark" />
                </label>
                <button className="btn btn-block red-btn mt-4" type="submit">Prevent
                  payment</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>

  );
}

export default UserPaymentModal;