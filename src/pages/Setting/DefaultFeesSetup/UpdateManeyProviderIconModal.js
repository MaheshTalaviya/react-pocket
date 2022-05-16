import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import upload from './../../../assets/images/upload-2.png'
import { useDispatch, useSelector, } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import {updateMpIcon } from '../../../redux/action/SettingAction/SettingAction'
import {merchantUploadImage } from '../../../redux/action/MerchantAction/MerchantAction'
import { isEmpty } from 'lodash';

const UpdateManeyProviderIconModal = (props) => {

  const [isFirst,setIsFirst] = useState(false)
  const [successApiMsg, setSuccessApiMsg] = useState('');
  const [isIconUrl, setIsIconUrl] = useState('')
  const [isIcon, setIsIcon] = useState('')

  let history = useHistory();
  const successMessage = useSelector(state => state.settingData.updateMpStatus)
  const merchantImages = useSelector(state => state.merchantData.imageData)

  const dispatch = useDispatch();
  
  useEffect(() => {
    setIsIconUrl(props.data.iconUrl)
    if(isFirst){
        if(successMessage?.message){
          setSuccessApiMsg(successMessage.message)
          setTimeout(() =>  
              props.onClick(), 2000
          )
        }
      }
  },[successMessage])

  
  const uploadLogo =(e)=>{
    if (e.target.files[0]) {
      
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setIsIconUrl(reader.result);
        const data ={
          "type":"common",
          "image":reader.result.replace(/^data:(.*,)?/, ''),
          "ext":e.target.files[0].name.split('.').pop()
        }
        dispatch(merchantUploadImage(JSON.stringify(data)));
        if(merchantImages.status){
            setIsIcon(merchantImages.data.url)
        }else{
            setIsIcon(props.data.iconUrl)   
        }
       
      });
       reader.readAsDataURL(e.target.files[0]);
    }
  }

  const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook
 
  const submitUpdateMpIcon = (data)=>{
       const formData ={
            "serviceProviderId":props.data.id,
            "iconUrl":isIcon
        }
        console.log('formData',formData);
        dispatch(updateMpIcon(formData))
        setIsFirst(true)
  }
  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        <div className="" id="blockModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-3">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Mobile Money Providers </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
              {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}

              <form onSubmit={handleSubmit(submitUpdateMpIcon)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Provider Name</label>
                    <input 
                        type="text" 
                        defaultValue={props.data!=undefined?props.data.name:''} 
                        className="form-control" 
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor>Upload the image for the ad</label>
                    <div className="row modified">
                    <div className="col-sm-4">
                        <div className="photoView sm">
                        <div className="photoView-cont">
                            <img src={isIconUrl?isIconUrl:upload} alt />
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="uploadBtn-wrap">
                        <div className="uploadBtn">
                            <button 
                                className="btn grey-btn sm-btn" 
                                type="button">
                                <i className="icon-icon-upload" /> 
                                Upload
                            </button>
                            <input 
                                type="file"
                                accept="image/png, image/icon, image/jpeg, image/jpg" 
                                name="iconUrl"
                                onChange={(e)=>uploadLogo(e)}
                                ref={register({required:true})} 
                            />
                            <span className="text-danger">
                            {errors.iconUrl && 'required.'}
                            </span> 
                        </div>
                        <span>or drag it in</span>
                        <p>Supported formats are JPEG, SVG <br /> or PNG. Max file size is 5 MB.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <input className="btn btn-block green-btn mt-4" type="submit" name defaultValue="Save" />
              </form>
                </div>

            </div>
          </div>
        </div>

      </div>

    </Modal>

  );
}

export default UpdateManeyProviderIconModal;