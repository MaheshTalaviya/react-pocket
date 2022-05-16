import React,{useEffect,useState} from 'react'
import Header from '../../../component/Header';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch, useSelector, } from 'react-redux'
import { addSubCategory } from '../../../redux/action/SettingAction/SettingAction'

import { isEmpty } from 'lodash';

const AddSubCategory = (props) => {
  
 const [isFirst,setIsFirst] = useState(false)
 const [successApiMsg, setSuccessApiMsg] = useState('');

  const dispatch = useDispatch(); 
  const successMessage = useSelector(state => state.settingData.AddSubCatSuccessMessage)



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
 
  const saveSubCategory = (data)=>{
    console.log("data",data);
    const formData ={
        "typeId":props.catId,
        "subcategory":data.subcategory
    }
    // console.log("formData",formData);
      dispatch(addSubCategory(formData))
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
            <h5 className="modal-title" id="exampleModalLabel">Add a new sub-category</h5>
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
        <form onSubmit={handleSubmit(saveSubCategory)}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name Sub category</label>
            <input 
                type="text" 
                name="subcategory" 
                className="form-control" 
                ref={register({required:true})} 
            />
           {errors.subcategory && 'required.'}
            </div>
           
            <input className="btn btn-block green-btn mt-4" type="submit" defaultValue="Save" />
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
    </ Modal>
  )
}


export default AddSubCategory;