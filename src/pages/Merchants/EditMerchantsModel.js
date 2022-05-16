
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import upload from './../../assets/images/upload.png'
import { Tabs, Tab } from 'react-bootstrap';
import Button from './../../component/Button/button'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty } from 'lodash';
import { merchantSubCategoryList, merchantUploadImage, merchantAdd, merchantEdit } from '../../redux/action/MerchantAction/MerchantAction'

import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
import Select from 'react-select';
const EditMerchantsModel = (props) => {
  
 

  const [companyName, setCompanyName] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [phone, setphone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [imgLogo, setImgLogo] = useState('');
  const [merLogoUrl, setMerLogoUrl] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [merCoverUrl, setMerCoverUrl] = useState('');
  const [isOpened, setIsOpened] = useState('');
  const [isFeeOpened, setIsFeeOpened] = useState(false);
  const [isPercentOpened, setIsPercentOpened] = useState(false);
  const [isCostBearerOpened, setIsCostBearerOpened] = useState(false);
  const [errorApiMsg, setErrorApiMsg] = useState('');
  const [successApiMsg, setSuccessApiMsg] = useState('');
  const [isCheckedAllowChat, setIsCheckedAllowChat] = useState('');
  const [isAllowPayment, setIsAllowPayment] = useState('');
  const [isAllowQRCodeScan, setIsAllowQRCodeScan] = useState('');
  const [additionalFieldTrue, setAdditionalFieldTrue] = useState(false);
  const [additionalFieldFalse, setAdditionalFieldFalse] = useState(false);
  const [isAdditionalField, setIsAdditionalField] = useState(false)
  const [isField, setIsField] = useState([{name:''}])
  const [isLocationField, setIsLocationField] = useState(false)
  const [isMerchantTypeId, setMerchantTypeId] = useState('')
  const [isSubCatOpen, setIsSubCatOpen] = useState(true)
  const [allowChat,setAllowChat]=useState(false);
  const [allowPayment,setAllowPayment]=useState(false);
  const [allowQRCodeScan,setAllowQRCodeScan]=useState(false);
  const [isCountryCode,setIsCountryCode]=useState('');
const [slectProvider,setProvider]=useState();
  const [slectProviderOption,setProviderOption]=useState();


  let history = useHistory();
  const dispatch = useDispatch(); 

  
  const merchantSubCatByTypeId = useSelector(state => state.merchantData.merchantsubcategoryData)
  const merchantImages = useSelector(state => state.merchantData.imageData)
  const merchantSuccess = useSelector(state => state.merchantData.addMerchantSuccess)
  const merchantError = useSelector(state => state.merchantData.addMerchantError)
  const mobileMoneyProvider=useSelector(state => state.userData.serviceProviderData)
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)
 
  useEffect(()=>{
   setMerLogoUrl(merchantImages.data)
  },[merchantImages])
  useEffect(()=>{
    setIsCountryCode(props.merchantDetail.countryCode)
  },[props])
  const allowChatChange =(e)=>{
    setAllowChat(e.target.checked)
  }
  const allowPaymentChange =(e)=>{
    setAllowPayment(e.target.checked)
  }
  const allowQRCodeScanChange =(e)=>{
    setAllowQRCodeScan(e.target.checked)
  }

  
 
  useEffect(()=>{
    setAllowChat(props.merchantDetail.additionalFeatures.allowChat)
    setAllowPayment(props.merchantDetail.additionalFeatures.allowPayment)
    setAllowQRCodeScan(props.merchantDetail.additionalFeatures.allowQRCodeScan)
    setImgLogo(props.merchantDetail.companyLogo);
    setMerLogoUrl(props.merchantDetail.companyLogo);
    setCoverImg(props.merchantDetail.coverImageUrl);
    setMerCoverUrl(props.merchantDetail.coverImageUrl);
    setIsOpened(props.merchantDetail.includeFees);
    setIsFeeOpened(props.merchantDetail.includeFees==1?props.merchantDetail.includeFeesData?.fees_type==='fixed'?true:false:'');
    setIsPercentOpened(props.merchantDetail.includeFees==1?props.merchantDetail.includeFeesData?.fees_type==='percent'?true:false:'');
   
    setIsCostBearerOpened(props.merchantDetail.includeFees==1?props.merchantDetail.includeFeesData&&props.merchantDetail.includeFeesData?.cost_bearer==='split_fees'?true:false:'');
    setIsCheckedAllowChat(props.merchantDetail.additionalFeatures?props.merchantDetail.additionalFeatures.allowChat:'');
    setIsAllowPayment(props.merchantDetail.additionalFeatures?props.merchantDetail.additionalFeatures.isAllowPayment:'');
    setIsAllowQRCodeScan(props.merchantDetail.additionalFeatures?props.merchantDetail.additionalFeatures.allowQRCodeScan:'');
    setAdditionalFieldTrue(props.merchantDetail.additionalField===1?true:false);
    setAdditionalFieldFalse(props.merchantDetail.additionalField===0?true:false);
    if(props.merchantDetail.additionalFieldData){
      setIsField(props.merchantDetail.additionalFieldData.length>0 ? props.merchantDetail.additionalFieldData : [{name:''}]);
    }
    setIsAdditionalField(props.merchantDetail.additionalField===1?true:false)
    merchantTypeSelectedId();
   
  },[])
  useEffect(() => {
    

    if( merchantError && merchantError.data !== undefined) {
     
      setSuccessApiMsg('')
      setErrorApiMsg(merchantError.data.message)
       
      
    }else{
      setErrorApiMsg('')
    }
    if( merchantSuccess && merchantSuccess.data !== undefined){
    
      setErrorApiMsg('')
      
      setSuccessApiMsg(merchantSuccess.data.message)
      
      
     
    }else{
      setSuccessApiMsg('')
    }
  },[merchantSuccess,merchantError])

const getSubCategory =(e)=>{
 
  var index = e.nativeEvent.target.selectedIndex;
  var typeName = e.nativeEvent.target[index].text;
  setType(typeName)

 
  if(typeName==="Schools"){
    setIsSubCatOpen(false)
    setIsLocationField(true)
  }else if(typeName==="Travel"){
    setIsSubCatOpen(false)
    setIsLocationField(false)
  } 
  else{
    setIsSubCatOpen(true)
    setIsLocationField(false)
  }

   const typeId = e.currentTarget.value ? e.currentTarget.value : 1
   dispatch(merchantSubCategoryList(typeId))
}

const merchantTypeSelectedId = ()=> {
   

  if(props.merchantDetail.type==="Schools"){
    setIsLocationField(true)
    setIsSubCatOpen(false)
  }
 if(props.merchantDetail.type==="Travel"){
  
     setIsSubCatOpen(false)
  }

   !isEmpty(props.data) && props.data.data.map((item, index) => {
    const { id, type} = item 
    
      
      if(props.merchantDetail.type===type){
        setMerchantTypeId(id)
       
      }
    
   });
}

const merchantTypeOption = ()=> {
 
   return !isEmpty(props.data) && props.data.data.map((item, index) => {
     const { id, type} = item 
    //  if(type==props.merchantDetail.type){
    //     setMerchantTypeId(id)
    //  }
     return (
      <option value={id} >{type}</option>
     )
    });
}

const merchantSubCategoryOption = ()=> {

if(!isEmpty(merchantSubCatByTypeId)){
  
  return  merchantSubCatByTypeId.data.map((item, index) => {
    const { id, subcategory} = item 
   
    return (
     <option  value={subcategory}>{subcategory}</option>
    )
   });
}
else{


  if(props.merchantDetail && props.merchantDetail.subcategory){
    return (
      <option value={props.merchantDetail.subcategory}>{props.merchantDetail.subcategory }</option>
    )
  }
 
}
}

const uploadLogo =(e)=>{
  if (e.target.files[0]) {
     if(e.target.files[0].size <=  5000000){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgLogo(reader.result);
      const data ={
        "type":"adminCompanyLogo",
        "image":reader.result.replace(/^data:(.*,)?/, ''),
        "ext":e.target.files[0].name.split('.').pop()
      }
      dispatch(merchantUploadImage(JSON.stringify(data)));
     
      
    });
     reader.readAsDataURL(e.target.files[0]);

  }
  }
}

const uploadCoverImg = (e) =>{
  if (e.target.files[0]) {
     if(e.target.files[0].size <=  5000000){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setCoverImg(reader.result);
      const data ={
        "type":"adminCompanyCover",
        "image":reader.result.replace(/^data:(.*,)?/, ''),
        "ext":e.target.files[0].name.split('.').pop()
      }
      dispatch(merchantUploadImage(JSON.stringify(data)));
    });
    setMerCoverUrl(merchantImages.data)
    reader.readAsDataURL(e.target.files[0]);
  }
  }
}

const additioanlFieldHander = (e) =>{
 
  if(e.target.value==='true'){
    setIsAdditionalField(true)
  }else{
    setIsAdditionalField(false)
  }

}


const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook
const editMerchant = (data) =>{

 var transJs = '';
  if(data.fees_type==="fixed"){
    transJs = {"amount":data.amount}
  }
  if(data.fees_type==="percent"){
    transJs = {"percent":data.percent,"min_capped":data.min_capped,"max_capped":data.max_capped}
  }
  

  var cost_bearer = ''
  if(data.cost_bearer==='split_fees'){
    cost_bearer = {
      "merchant":data.merchant,
      "user":data.user
    }
  }

  const includesFeeData =[]
  if(data.additionalField==="true" && data.fieldName !== undefined && data.fieldName.length>0){
     data.fieldName.map((val,ind)=>{
      includesFeeData[ind]={"fieldName":val,"fieldType":"textbox"}
    })
  }


  const formData ={
    "id": props.merchantDetail.id,
    "companyName": data.merchantName,
    "tag":data.tag,
    "type": type ||props.merchantDetail.type,
    "location":data.location!=undefined?data.location:'',
    "subcategory": data.subcategory ||props.merchantDetail.subcategory,
    "companyLogo": merLogoUrl,
    "coverImageUrl": merCoverUrl,
    "phone":data.phone,
    "serviceProvider":slectProvider?.value,
    "countryCode":isCountryCode,
    "useremail": data.useremail,
    "website": data.website,
    "description": data.description,
    "additionalFeatures": {
        "allowChat": data.allowChat,
        "allowPayment": data.allowPayment,
        "allowQRCodeScan": data.allowQRCodeScan
    },
    "additionalField": data.additionalField==="true" ? true : false,
    "additionalFieldData": includesFeeData,
    "includeFees": isOpened,
    "includesFeeData":{
      "fees_type":data.fees_type,
      "transaction_amount":transJs, 
      "cost_bearer":data.cost_bearer,
    	"split_fees":cost_bearer
    }   
  }

   if(adminPermission?.permissions){
      if(adminPermission.permissions[0].merchants.editMerchant === 'full_access'){
         dispatch(merchantEdit(formData))
      }else{
      let sendReq={
        "action": "Edit Merchant",
        "action_status": 1,
        "comment": "edit merchant",
        "details":formData
    }
        dispatch(approvelsAddAPiRequest(sendReq))
      }
    }else{
      dispatch(merchantEdit(formData));
    } 
    setTimeout(() => {
      props.onClick() 
    }, 300);   
   
}
const getCountryCode=(e)=>{
  setIsCountryCode( e.currentTarget.value)
}
const  includeFeeToggle = (e) => {
 
  if(e.target.checked===true){
    setIsOpened(true);
    
  }else{
    setIsOpened(false);
   
  }
  
  
}
const  fixedTransToggle = (e) => {
  if(e.target.value === 'fixed'){
    setIsPercentOpened(false);
    setIsFeeOpened(true);
  }else if(e.target.value === 'percent'){
    setIsFeeOpened(false);
    setIsPercentOpened(true);
  }else{
    setIsFeeOpened(false);
    setIsPercentOpened(false);
  }
}
const costBearerToggle = (e) => {
  if(e.target.value === 'split_fees'){
    setIsCostBearerOpened(true)
  }else{
    setIsCostBearerOpened(false)
  }
}

const merchantInfoData=()=>{
 const merchantInfo = props.merchantDetail.data
}

const closeModal =()=>{
  setImgLogo('');
  setMerLogoUrl('');
  setCoverImg('');
  setMerCoverUrl();
  setIsOpened(false);
  setIsFeeOpened(false);
  setIsPercentOpened(false);
  setIsCostBearerOpened(false);
  setErrorApiMsg('');
  setSuccessApiMsg('');
  setIsCheckedAllowChat('');
  setIsAllowPayment('');
  setIsAllowQRCodeScan('');
  setAdditionalFieldTrue(false);
  setAdditionalFieldFalse(false);
  
  props.onClick()
}

const handleAddInput =()=> {
  const values = [...isField];
  values.push({
    name: '',
   
  });
  setIsField(values);
}
const selectChange=(e)=>{
setProvider(e)
}
function handleRemoveInput(i) {
  const values = [...isField];
  values.splice(i, 1);
  setIsField(values);
}

useEffect(()=>{
   
  if(Object.keys(mobileMoneyProvider).length !== 0){
      const tempOptions = [];
      for (const connector of mobileMoneyProvider?.data) {
      
          tempOptions.push({
            label: <div><img src={connector.iconUrl} height="30px" width="30px"/>  {connector.name} </div>,
            value: connector.name,
          });

        }
    setProviderOption(tempOptions)

     var indexVlaue=tempOptions?.findIndex(p => p.value == props.merchantDetail.serviceProvider)
     
    setProvider(tempOptions[indexVlaue])
  }
    

  },[mobileMoneyProvider])
  return (
    < Modal
      isOpen={true}
    >
      <div className="modal_height" id="addMerchantModal" tabIndex={-1} >
        <div className="modal-dialog modal-dialog-centered common-modal" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit  merchant</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModal()}>
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit(editMerchant)}>
  
              <div className="tabSimple">
             
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <Tabs>
                    <Tab eventKey="General Info" title="General Info">
                      <div className="tab-pane fade show active" id="g-info" role="tabpanel">
                        <div className="row modified">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Merchant name</label>
                              <input type="text" className="form-control" name="merchantName" defaultValue={props.merchantDetail.companyName} ref={register ({ required: true })} />
                              <span className="text-danger">{errors.merchantName && 'Merchant name is required.'}</span>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Merchant tag</label>
                              <input type="text" className="form-control" name="tag"  defaultValue={props.merchantDetail.tag} ref={register({ required: true })} />
                              <span className="text-danger">{errors.tag && 'Merchant tag is required.'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Merchant Type</label>
                          <div className="custom-select-wrap full large alltime_maincontainer">
                            <select className="custom-select merchant_select" name="type" ref={register({ required: true })} onChange={(e)=>getSubCategory(e)} defaultValue={isMerchantTypeId}>
                              <option value="">Choose the merchant type</option>
                              
                              { merchantTypeOption()}
                              
                            </select>
                            <i class="fa fa-angle-down"></i>
                            <span className="text-danger">{errors.type && 'Type is required.'}</span>
                          </div>
                        </div>
                        {isLocationField &&
                        
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        <div className="custom-select-wrap full large alltime_maincontainer">
                          <input 
                            type="text"
                            name="location"
                            className="form-control"
                            defaultValue={props.merchantDetail.location}
                            ref={register({ required: true })}
                          />
                         
                          <span className="text-danger">{errors.location && 'Location is required.'}</span>
                        </div>
                      </div>

                      }
                      {isSubCatOpen &&
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Subcategory</label>
                          <div className="custom-select-wrap full large alltime_maincontainer">
    
                            <select className="custom-select merchant_select" name="subcategory" defaultValue={isMerchantTypeId}  ref={register({ required: false })} >
                            {/* {props.merchantDetail && props.merchantDetail.subcategory !==''  ? merchantSubCategoryOption() :<option value="">Choose the subcategory</option> }   */}
                            
                            { merchantSubCategoryOption()}
                            <option value="">Choose the subcategory</option> 
                            </select>
                            <i class="fa fa-angle-down"></i>
                            <span className="text-danger">{errors.subcategory && 'Subcategory tag is required.'}</span>
                          </div>
                        </div>
                      }
                        <div className="form-group">
                          <div className="row align-items-center modified">
                            <div className="col-sm-6">
                              <label htmlFor>Upload logo</label>
                              <div className="photoView">
                                <div className="photoView-cont">
                                  <img src={imgLogo ? imgLogo : upload} alt="" style={{"max-width": "150px", "height": "100px"}}/>
                                </div>
                              </div>
                              <div className="uploadBtn-wrap alt mt-3">
                                <div className="uploadBtn">
                                  <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-upload" /> Upload</button>
                                  <input type="file" accept="image/png, image/icon, image/jpeg, image/jpg"  name="merchantLogo" onChange={(e)=>uploadLogo(e)} ref={register()}/>
                                </div>
                                <span className="text-danger">{errors.merchantLogo && 'MerchantLogo  is required.'}</span>
                                <span>or drag it in</span>
                                <p>Supported formats are JPEG, SVG <br /> or PNG. Max file size is 5 MB.</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <label htmlFor>Cover image</label>
                              <div className="photoView">
                                <div className="photoView-cont">
                                <img src={coverImg ? coverImg : upload} alt="" style={{"max-width": "150px", "height": "100px"}}/>
                                </div>
                              </div>
                              <div className="uploadBtn-wrap alt mt-3">
                                <div className="uploadBtn">
                                  <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-upload" /> Upload</button>
                                  <input type="file" accept="image/png, image/icon, image/jpeg, image/jpg"  name="merchantCover" onChange={(e)=>uploadCoverImg(e)} ref={register()}/>
                                </div>
                                <span className="text-danger">{errors.merchantCover && 'merchantCover  is required.'}</span>
                                <span>or drag it in</span>
                                <p>Supported formats are JPEG, SVG <br /> or PNG. Max file size is 5 MB.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row modified">
                          <div className="col-sm-6">
                              <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Mobile Money Provider</label>
                              <div className="cust-form">

                                <div className="custom-select-wrap full large alltime_maincontainer" style={{height:"50px"}}>
                               
                                  <Select
                                   className="custom-sec2"
                                  style={{height:"50px"}}
                                  isSearchable={false}
                                onChange={selectChange}
        value={slectProvider}
       
        options={slectProviderOption}
      />  
       
                              </div>
                         
                        </div></div>
                            {/* <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Phone number</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                name="phone" 
                                defaultValue={props.merchantDetail.phone} 
                                ref={register({ required: true })}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                              />
                              <span className="text-danger">{errors.phone && 'Phone tag is required.'}</span>
                            </div> */}
                        
                          </div>
                          <div className="col-sm-6">
                              <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">Phone number</label>
                              <div className="cust-form">

                                <div className="select-box11">
                                <select className="custom-select merchant_select" name="countryCode"  onChange={(e)=>getCountryCode(e)} >
                                  <option selected={isCountryCode ==='+91' ? 'selected': ''} value="+91">+91</option>
                                  <option selected={isCountryCode ==='+233' ? 'selected': ''}value="+233">+233</option>
                                </select>
                              </div>

                              <div className="customCountryCode">
                              <input 
                                type="text" 
                                className="form-control" 
                                name="phone"  
                                defaultValue={props.merchantDetail.phone} 
                                ref={register({ required: true, maxLength: 10})}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                              />
                              <span className="text-danger">{errors.phone && 'Phone  is required.'}</span>
                              </div>
                              </div>
                              
                             
                            </div>
                          </div>
                        </div>
                        <div className="row">
                           <div className="col-sm-6"> <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email address</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                name="useremail" 
                                defaultValue={props.merchantDetail.useremail} 
                                ref={register({ required: true, pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }  })}
                                
                              />
                              {errors.useremail && errors.useremail.type === "required" && <span className="text-danger">Email is required</span>}
                              {errors.useremail && errors.useremail.type === "pattern" && <span className="text-danger">Invalid email</span> }
                              
                            </div> </div>
                            <div className="col-sm-6">  <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Website URL</label>
                          <input 
                              type="text" 
                              className="form-control" 
                              name="website" 
                              defaultValue={props.merchantDetail.website} 
                              ref={register({ required: true})}
                          />
                          {errors.website && errors.website.type === "required" && <span className="text-danger">Website is required</span>}
                         
                        </div></div>

                        </div>
                       
                       
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Description</label>
                          <textarea name="name" className="form-control" name="description" defaultValue={props.merchantDetail.description} ref={register({ required: true })}/>
                          <span className="text-danger">{errors.description && 'Description is required.'} </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor>Additional features <span>(choose at least one)</span> </label>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  name="allowChat" checked={allowChat}  onChange={allowChatChange} ref={register} />
                              <span className="checkmark" />
                              <span className="ml-4"> Allow Chat </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="no" name="allowPayment" checked={allowPayment} onChange={allowPaymentChange}  ref={register}/>
                              <span className="checkmark" />

                              <span className="ml-4"> Allow Payment </span>
                            </label>
                          </div>

                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="no" name="allowQRCodeScan"  checked={allowQRCodeScan} onChange={allowQRCodeScanChange} ref={register}/>
                              <span className="checkmark" />

                              <span className="ml-4"> Allow QR Code Scan </span>
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor>Are there any additional fileds required for payment?</label>
                          <label className="custom-radio inline">Yes
                          <input 
                            type="radio" 
                            className="yes" 
                            name="additionalField" 
                            value="true" 
                            defaultChecked={additionalFieldTrue} 
                            ref={register({required:true})}
                            onChange={(e)=>additioanlFieldHander(e)}
                            />
                            <span className="checkmark" />
                          </label>
                          <label className="custom-radio inline">No
                          <input 
                            type="radio" 
                            className="no" 
                            name="additionalField" 
                            value="false" 
                            defaultChecked={additionalFieldFalse} 
                            ref={register({required:true})}
                            onChange={(e)=>additioanlFieldHander(e)}
                            />
                            <span className="checkmark" />
                          </label>

                          {isAdditionalField
                          ?
                          <>
                           <div className="cons act mb-4" >
                          {isField.map((field,index)=>{
                            const fieldName = `fieldName[${index}]`;
                            return(
                              <div className="row modified mb-3" key={index}>
                              <div className="col-lg-6">
                                <input 
                                  type="text"
                                  name={fieldName}
                                  defaultValue={field.fieldName}
                                  className="form-control"
                                  ref={register({required:true})}
                                  placeholder="Enter field titile"
                                />
                                 {errors.fieldName && errors.fieldName.type === "required" && <span className="text-danger"> required</span>}
                              </div>
                              
                            </div>
                            )
                          })
                          }
                          <button type="button" className="btn grey-btn sm-btn" onClick={()=>handleAddInput()}> Add field </button>
                          </div>
                          </>
                          :
                          ''
                          }
                        </div>
                      </div>

                    </Tab>
                    <Tab eventKey="Fees Setup" title="Fees Setup" >
                      <div className="tab-panel tabs_switch" id="f-setup" role="tabpanel">
                        <div className="form-group">
                          <label style={{ display: 'inline-block' }} htmlFor>Include Fees</label>
                          <label className="switch ml-2">
                            <input id="priceChanger" type="checkbox" name="includeFees"  defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFees:''} onChange={(e)=>includeFeeToggle(e)} ref={register}/>
                            <span className="slider round" />
                          </label>
                        </div>
                        <div className={isOpened ? "formInt" : "formInt form-group-inactive"}>
                          <div className="form-group">
                            <label className="custom-radio inline">Fixed Fee per transaction 
                          <input type="radio" className="yes" name="fees_type" value="fixed" defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFeesData?.fees_type==='fixed'?true:false:''} onChange={(e)=>fixedTransToggle(e)} ref={register}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Percent of transaction amount
                          <input type="radio" className="no" name="fees_type" value="percent" defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFeesData&&props.merchantDetail.includeFeesData?.fees_type==='percent'?true:false:''} onChange={(e)=>fixedTransToggle(e)} ref={register}/>
                              <span className="checkmark" />
                            </label>

                            {isFeeOpened ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                             <input 
                              type="text" 
                              className="form-control" 
                              name="amount" 
                              placeholder="GHC" 
                              ref={register}
                              onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                              defaultValue={props.merchantDetail.includeFees==1&&props.merchantDetail.includeFeesData.fees_type==='fixed'?props.merchantDetail.includeFeesData.transaction_amount.amount:''} 
                            /> 
                            </div>
                            </div>
                            : 
                            ''
                            }
                            {isPercentOpened ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Percent</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="percent"  
                                  placeholder="%" 
                                  ref={register}
                                  onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                  defaultValue={props.merchantDetail.includeFees==1?props.merchantDetail.includeFeesData.transaction_amount.percent:''}  
                                />
                               
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="min_capped" 
                                  placeholder="GH₵" 
                                  ref={register}
                                  onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                  defaultValue={props.merchantDetail.includeFees==1&&props.merchantDetail.includeFeesData.fees_type==='percent'?props.merchantDetail.includeFeesData.transaction_amount.min_capped:''}  
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  name="max_capped" 
                                  placeholder="GH₵" 
                                  ref={register}
                                  onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                  defaultValue={props.merchantDetail.includeFees==1&&props.merchantDetail.includeFeesData.fees_type==='percent'?props.merchantDetail.includeFeesData.transaction_amount.max_capped:''}  
                                />
                              </div>
                            </div>
                          </div>
                            : 
                            ''
                            }
                          </div>
                          <div className="form-group">
                            <label htmlFor>Cost bearer</label>
                            <label className="custom-radio inline">Sender
                          <input type="radio" className="yes" name="cost_bearer" value="sender" defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFeesData?.cost_bearer==='sender'?true:false:''} onChange={(e)=>costBearerToggle(e)}ref={register({ required: isOpened })}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Receiver
                          <input type="radio" className="no" name="cost_bearer" value="receiver" defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFeesData?.cost_bearer==='receiver'?true:false:''} onChange={(e)=>costBearerToggle(e)}ref={register({ required: isOpened })}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Split fees
                            <input type="radio" className="no" name="cost_bearer" value="split_fees" defaultChecked={props.merchantDetail.includeFees===1?props.merchantDetail.includeFeesData?.cost_bearer==='split_fees'?true:false:''} onChange={(e)=>costBearerToggle(e)} ref={register({ required: isOpened })}/>
                              <span className="checkmark" />
                            </label>
<p className="text-danger">{errors.cost_bearer && 'Cost bearer  is required.'}</p>
                            {isCostBearerOpened 
                              ?
                              <div className="row modified">
                                <div className="col-sm-4">
                                  <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Merchant</label>
                                    <input 
                                      type="text"
                                      className="form-control" 
                                      name="merchant"  
                                      placeholder="%" 
                                      ref={register}
                                      onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                      defaultValue={props.merchantDetail.includeFees==1&&props.merchantDetail.includeFeesData?.cost_bearer==='split_fees'?props.merchantDetail.includeFeesData.split_fees.merchant:''}
                                    />
                                  
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">User</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      name="user" 
                                      placeholder="%" 
                                      ref={register}
                                      onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                      defaultValue={props.merchantDetail.includeFees==1&&props.merchantDetail.includeFeesData?.cost_bearer==='split_fees'?props.merchantDetail.includeFeesData.split_fees.user:''}

                                    />
                                  </div>
                                </div>
                              </div>
                           : 
                           ''
                          }
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </ul>
                <div className="tab-content" id="myTabContent">
                <input type="submit" value="Save " className="btn btn-block green-btn" />
                <br/>
                {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}
                {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </Modal >

  );
}

export default EditMerchantsModel;

