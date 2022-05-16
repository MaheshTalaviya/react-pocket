import React,{useEffect,useState} from 'react'
import Header from '../../../component/Header';
import uploadImg from '../../../assets/images/upload-2.png';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector, } from 'react-redux'
import {addCategory } from '../../../redux/action/SettingAction/SettingAction'
import {merchantUploadImage } from '../../../redux/action/MerchantAction/MerchantAction'

import { isEmpty } from 'lodash';

const AddCategory = (props) => {
  const [isFirst,setIsFirst] = useState(false)
  const [successApiMsg, setSuccessApiMsg] = useState('');
  const [catIcon, setCatIcon] = useState("");
  const [catIconUrl, setCatIconUrl] = useState("");

  const dispatch = useDispatch(); 
  const successMessage = useSelector(state => state.settingData.AddCatSuccessMessage)
  const merchantImages = useSelector(state => state.merchantData.imageData)

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

  const uploadLogo =(e)=>{
    if (e.target.files[0]) {
      
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCatIcon(reader.result);
        const data ={
          "type":"common",
          "image":reader.result.replace(/^data:(.*,)?/, ''),
          "ext":e.target.files[0].name.split('.').pop()
        }
        dispatch(merchantUploadImage(JSON.stringify(data)));
        setCatIconUrl(merchantImages.data)
      });
       reader.readAsDataURL(e.target.files[0]);
    }
  }

  const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook
 
  const saveCategory = (data)=>{
     
        const formData ={
            "type":data.type,
            "icon":catIconUrl.url
        }
      dispatch(addCategory(formData))
      setIsFirst(true)
  }

  return (
    < Modal
        isOpen={props.isModalOpen}
        onRequestClose={() => props.onClick()}
    >   
    <div>
    <div tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered common-modal size-3">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add a new category</h5>
            <button type="button" 
                className="close" 
                data-dismiss="modal" 
                aria-label="Close"
                onClick={() => props.onClick()}
            >
            <i className="icon-icon-close2" />
            </button>
        </div>
        <div className="modal-body">
        {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}


        <form onSubmit={handleSubmit(saveCategory)}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name category</label>
            <input 
                type="text" 
                name="type"
                className="form-control" 
                ref={register({required:true})} 
            />
            {errors.type && 'required.'}
            </div>
            <div className="form-group">
            <label htmlFor>Upload the category icon</label>
            <div className="row modified">
                <div className="col-sm-4">
                <div className="photoView sm">
                    <div className="photoView-cont">
                    <img src={catIcon?catIcon:uploadImg} alt />
                    </div>
                </div>
                </div>
                <div className="col-sm-8">
                <div className="uploadBtn-wrap">
                    <div className="uploadBtn">
                    <button className="btn grey-btn sm-btn">
                        <i className="icon-icon-upload" /> Upload
                    </button>
                    <input 
                        type="file" 
                        accept="image/png, image/icon, image/jpeg, image/jpg" 
                        name="icon" 
                        onChange={(e)=>uploadLogo(e)}
                        ref={register({required:true})} 
                    />
                    {errors.icon && 'required.'}
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
    </ Modal>
  )
}


export default AddCategory;