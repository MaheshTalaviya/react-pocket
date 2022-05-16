import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { addTransactionKycLimitSetting } from '../../../redux/action/SettingAction/SettingAction'
import { useDispatch, useSelector, } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


const KycLimitModal = (props) => {
 console.log('props',props.kycLimitData);
  const [errorApiMsg, setErrorApiMsg] = useState('');
  const [successApiMsg, setSuccessApiMsg] = useState('');
  const [isFirst, setIsFirst] = useState(false);

  let history = useHistory();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.settingData.addDefaultSettingMessage)
  useEffect(() => {

    if(isFirst){
      if(successMessage?.message){
        setSuccessApiMsg(successMessage.message)
        setTimeout(() =>  
            props.onClick(), 2000
        )
      }
    }
  },[successMessage])

  const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook

  const saveKycLimit =(data)=>{
    const formData ={
      "kyc_transaction_limit":data.amount
    }
    dispatch(addTransactionKycLimitSetting(formData))
    setIsFirst(true)
  }

function minmax(value, min, max) 
{
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        return min; 
    else if(parseInt(value) > max) 
        return max; 
    else return value;
}
  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        <div className="" id="blockModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">KYC Transaction Limit</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="userModalCont">
                <form onSubmit={handleSubmit(saveKycLimit)}>
                {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}
                
                  <div className="form-group mt-4">
                    <label className="grey" htmlFor="exampleInputEmail1">Transaction Amount
                    </label>
                    <input 
                      type="number" 
                      name="amount" min="0" max="100"minlength="4"
                      className="form-control" 
                      placeholder="GH₵" 
                      
                      defaultValue={props.kycLimitData.amount}
                      ref={register({required:true})}
                      onKeyPress={(event) => { event.preventDefault(); } }
                    />
                     {errors.amount && errors.amount.type === "required" && <span className="text-danger">required</span>}
                  </div>
                  
                  <button className="btn btn-block green-btn" type="submit" >Save Changes</button>
                </form>
                 
                 
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Modal>

  );
}

export default KycLimitModal;