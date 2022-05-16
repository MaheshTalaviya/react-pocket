import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { addDefaultSetting } from '../../../redux/action/SettingAction/SettingAction'
import { useDispatch, useSelector, } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


const DefaultFeesModal = (props) => {
 
  
 
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

  const saveDefaultFees =(data)=>{
    const formData ={
      "type":"default_fees",
      "amount":data.amount
    }
    dispatch(addDefaultSetting(formData))
    setIsFirst(true)
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
                <h5 className="modal-title" id="exampleModalLabel">Default Fees</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="userModalCont">
                <form onSubmit={handleSubmit(saveDefaultFees)}>
                {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}
                  <div className="form-group mt-4">
                    <label className="grey" htmlFor="exampleInputEmail1">Percent
                    </label>
                    <input 
                      type="text" 
                      name="amount" 
                      className="form-control" 
                      placeholder="%" 
                      defaultValue={props.defaultFeesData.amount}
                      ref={register({required:true})}
                      onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
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

export default DefaultFeesModal;