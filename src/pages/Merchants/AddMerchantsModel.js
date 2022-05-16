
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import upload from './../../assets/images/upload.png'
import { Tabs, Tab } from 'react-bootstrap';
import Button from './../../component/Button/button'
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty, set } from 'lodash';
import { merchantSubCategoryList, merchantUploadImage, merchantAdd } from '../../redux/action/MerchantAction/MerchantAction'
import Select from 'react-select';
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'


const AddMerchantsModel = (props) => {
  const [isStatus, setIsStatus] = useState([]);
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
  const [imgLogo, setImgLogo] = useState("");
  const [merLogoUrl, setMerLogoUrl] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [merCoverUrl, SetMerCoverUrl] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isFeeOpened, setIsFeeOpened] = useState(false);
  const [isPercentOpened, setIsPercentOpened] = useState(false);
  const [isCostBearerOpened, setIsCostBearerOpened] = useState(false);
  const [errorApiMsg, setErrorApiMsg] = useState('');
  const [successApiMsg, setSuccessApiMsg] = useState('');
  const [isAdditionalField, setIsAdditionalField] = useState(false)
  const [isField, setIsField] = useState([{name:''}])
  const [isLocationField, setIsLocationField] = useState(false)
  const [isSubCatOpen, setIsSubCatOpen] = useState(true)
  const [isMerchantPer,setIsMerchantPer] = useState("")
  const [isUserPer,setIsUserPer] = useState("")
  const [isCountryCode,setIsCountryCode]=useState('+233');
  const [slectProvider,setProvider]=useState();
  const [slectProviderOption,setProviderOption]=useState();
  const [allowChat,setAllowChat]=useState();
  const [allowPayment,setAllowPaymentChat]=useState();
  const [allowQrScan,setAllowQrScan]=useState();

  let history = useHistory();
  const dispatch = useDispatch(); 



  
  const merchantSubCatByTypeId = useSelector(state => state.merchantData.merchantsubcategoryData)
  const merchantImages = useSelector(state => state.merchantData.imageData)
  const merchantSuccess = useSelector(state => state.merchantData.addMerchantSuccess)
  const merchantError = useSelector(state => state.merchantData.addMerchantError)
  const mobileMoneyProvider=useSelector(state => state.userData.serviceProviderData)
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)

  useEffect(()=>{
   
  
      const tempOptions = [];
      for (const connector of mobileMoneyProvider?.data) {
      
          tempOptions.push({
            label: <div><img src={connector.iconUrl} height="30px" width="30px"/>  {connector.name} </div>,
            value: connector.name,
          });

        }
    setProviderOption(tempOptions)
      setProvider(tempOptions[3])

  },[mobileMoneyProvider])

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
    //  props.onClick()
//      document.getElementById("rest-form").reset();
    }else{
      setSuccessApiMsg('')
    }
    
  },[merchantSuccess,merchantError])

const getSubCategory =(e)=>{
  var index = e.nativeEvent.target.selectedIndex;
  var typeName = e.nativeEvent.target[index].text;
  
  console.log("+++++",typeName);
  if(typeName==="Schools"){
    setIsSubCatOpen(false)
    setIsLocationField(true)
  }else if(typeName==="Travel"){
    setIsSubCatOpen(false)
    setIsLocationField(false)
  } else{
    setIsSubCatOpen(true)
    setIsLocationField(false)
  }

  setType(typeName)
   const typeId = e.currentTarget.value ? e.currentTarget.value : 1
   dispatch(merchantSubCategoryList(typeId))
}
const getCountryCode=(e)=>{
  setIsCountryCode( e.currentTarget.value)
}

 const onChangeStatusHandler =(e)=>{
    
    const options = isStatus
    let index
    if (e.target.checked) {
      options.push(e.target.value)
    } else {
      index = options.indexOf(e.target.value)
      options.splice(index, 1)
    }

    options.sort()    
   
    setIsStatus(options)
   
  }
const merchantTypeOption = ()=> {
 
   return !isEmpty(props.data) && props.data.data.map((item, index) => {
     const { id, type} = item 
     return (
      <option value={id} >{type}</option>
     )
    });
}

const merchantSubCategoryOption = ()=> {

  return !isEmpty(merchantSubCatByTypeId) && merchantSubCatByTypeId.data.map((item, index) => {
    const { id, subcategory} = item 
    return (
     <option value={subcategory}>{subcategory}</option>
    )
   });
}

const uploadLogo =(e)=>{

  if (e.target.files[0]) {
    //console.log(e.target.files[0].name.split('.').pop())
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
 useEffect(()=>{
   setMerLogoUrl(merchantImages.data)
  },[merchantImages])
const uploadCoverImg = (e) =>{
  if (e.target.files[0]) {
     if(e.target.files[0].size <=  5000000){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setCoverImg(reader.result);
      console.log(reader)
      const data ={
        "type":"adminCompanyCover",
        "image":reader.result.replace(/^data:(.*,)?/, ''),
        "ext":e.target.files[0].name.split('.').pop()
      }
      dispatch(merchantUploadImage(JSON.stringify(data)));
    });
    SetMerCoverUrl(merchantImages.data)
    reader.readAsDataURL(e.target.files[0]);
  }
} 
}

const additioanlFieldHander = (e) =>{
  console.log(e.target.value)
  if(e.target.value==='true'){
    setIsAdditionalField(true)
  }else{
    setIsAdditionalField(false)
  }

}
const allowChange=(e)=>{
  setAllowChat(e.target.checked)
}
const allowQrChange=(e)=>{
  setAllowQrScan(e.target.checked)
}
const allowPaymentChnage=(e)=>{
  setAllowPaymentChat(e.target.checked)
}
const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook
const saveMerchant = (data) =>{
 console.log("data.includeFees==",data);
 var transJs = '';
  if(data.fees_type==="fixed"){
    transJs = {"amount":data.transaction_amount}
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
    "companyName": data.merchantName,
    "tag":data.tag,
    "type": type,
    "location":data.location!=undefined?data.location:'',
    "subcategory": data.subcategory,
    "companyLogo": merLogoUrl,
    "coverImageUrl": merCoverUrl,
    "phone":data.phone,
    "countryCode":isCountryCode,
    "useremail": data.useremail,
    "website": data.website,
    "description": data.description,
    "additionalFeatures": {
        "allowChat": allowChat,
        "allowPayment":allowPayment,
        "allowQRCodeScan": allowQrScan
    },
    "feesType":isStatus,
    "additionalField": data.additionalField==="true" ? true : false,
    "additionalFieldData": includesFeeData,
    "includeFees": isOpened,
    "serviceProvider":slectProvider.value,
    "includesFeeData":{
      "fees_type":data.fees_type,
      "transaction_amount":transJs, 
      "cost_bearer":data.cost_bearer,
    	"split_fees":cost_bearer
    }
  }

 
 if(adminPermission?.permissions){
      if(adminPermission.permissions[0].merchants.addMerchant === 'full_access'){
         dispatch(merchantAdd(formData))
      }else{
      let sendReq={
        "action": "Add Merchant",
        "action_status": 1,
        "comment": "add merchant",
        "details":formData
    }
        dispatch(approvelsAddAPiRequest(sendReq))
      }
    }else{
       dispatch(merchantAdd(formData))
    }    
    setTimeout(() => {
      props.onClick() 
    }, 300);  
}

const selectChange=(e)=>{
setProvider(e)
}
const  includeFeeToggle = (e) => {
  
  setIsOpened(wasOpened => !wasOpened);
  
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
const handleAddInput =()=> {
  const values = [...isField];
  values.push({
    name: '',
   
  });
  console.log("values-----",values);
  setIsField(values);
}
function handleRemoveInput(i) {
  const values = [...isField];
  values.splice(i, 1);
  setIsField(values);
}

const splitMerchantPercent=(e)=>{
  setIsMerchantPer(e.target.value);
  setIsUserPer(100-(e.target.value));
  
}

const splitUserPercent=(e)=>{
  setIsUserPer(e.target.value);
  setIsMerchantPer(100-(e.target.value));
  
 
}
  return (
    < Modal
      isOpen={true}
    >
      <div className="modal_height"  >
        <div className="modal-dialog modal-dialog-centered common-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adding a new merchant</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit(saveMerchant)} id="rest-form">
  
              <div className="tabSimple">
               <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <Tabs>
                    <Tab eventKey="General Info" title="General Info" >
                      <div className="tab-pane fade show active" id="g-info" role="tabpanel">
                        <div className="row modified">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Merchant name</label>
                              <input type="text" className="form-control" name="merchantName" ref={register ({ required: true })} />
                              <span className="text-danger">{errors.merchantName && 'Merchant name is required.'}</span>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Merchant tag</label>
                              <input type="text" className="form-control" name="tag" ref={register({ required: true })} />
                              <span className="text-danger">{errors.tag && 'Merchant tag is required.'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Merchant Type</label>
                          <div className="custom-select-wrap full large alltime_maincontainer">
                            <select className="custom-select merchant_select" name="type" ref={register({ required: true })} onChange={(e)=>getSubCategory(e)}>
                              <option value="">Choose the merchant type</option>
                              
                              { merchantTypeOption()}
                              
                            </select>
                            <i class="fa fa-angle-down"></i>
                            <span className="text-danger">{errors.type && 'Type is required.'}</span>
                          </div>
                        </div>

                        {isLocationField &&
                        <div>
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        <div className="custom-select-wrap full large alltime_maincontainer">
                          <input 
                            type="text"
                            name="location"
                            className="form-control"
                            ref={register({ required: true })}
                          />
                         
                          <span className="text-danger">{errors.location && 'Location is required.'}</span>
                        </div>
                      </div>
                       <div className="form-group">
                          <label htmlFor>Fees Details/Fee Type</label>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"   value="School/Tuition Fees " name="feestype" onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4">School/Tuition Fees </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  value="Admissions Fees" name="feestype"onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Admissions Fees </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  value="Hostel/Residential Fees" name="feestype"onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Hostel/Residential Fees </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  value="Tuition Fees" name="feestype"onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Tuition Fees</span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  value="Exams" name="feestype"onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Exams </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes" value="Annual/Subscription Fees" onChange={(e)=>onChangeStatusHandler(e)}name="feestype"  ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Annual/Subscription Fees </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  value="Other Fees" name="feestype"onChange={(e)=>onChangeStatusHandler(e)} ref={register({ required:true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Other Fees</span>
                            </label>
                          </div>
                          
                      <p className="text-danger">{errors.feestype && 'Fees Details/Fee Type is required.'}</p>
                        </div>
                       
                        </div>
                          
                      

                      }
                      {isSubCatOpen &&
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Subcategory</label>
                          <div className="custom-select-wrap full large alltime_maincontainer">
                            <select className="custom-select merchant_select" name="subcategory" ref={register({ required:false })} >
                              <option value="">Choose the subcategory</option>
                             
                              {merchantSubCategoryOption()}
                            </select>
                            <i class="fa fa-angle-down"></i>
                            {/* <span className="text-danger">{errors.subcategory && 'Subcategory tag is required.'}</span> */}
                          </div>
                        </div>
                      }
                        <div className="form-group">
                          <div className="row align-items-center modified">
                            <div className="col-sm-6">
                              <label htmlFor>Upload logo</label>
                              <div className="photoView">
                                <div className="photoView-cont">
                                  <img src={imgLogo ? imgLogo : upload} alt="" style={{"max-width": "150px", "max-height": "100px"}}/>
                                </div>
                              </div>
                              <div className="uploadBtn-wrap alt mt-3">
                                <div className="uploadBtn">
                                  <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-upload" /> Upload</button>
                                  <input type="file" name="merchantLogo" accept="image/png, image/icon, image/jpeg, image/jpg"  onChange={(e)=>uploadLogo(e)} ref={register({ required: true })}/>
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
                                <img src={coverImg ? coverImg : upload} alt="" style={{"max-width": "150px", "max-height": "100px"}}/>
                                </div>
                              </div>
                              <div className="uploadBtn-wrap alt mt-3">
                                <div className="uploadBtn">
                                  <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-upload" /> Upload</button>
                                  <input type="file" name="merchantCover" accept="image/png, image/icon, image/jpeg, image/jpg" onChange={(e)=>uploadCoverImg(e)} ref={register({ required: true })}/>
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
                        
                        
                          </div>
                                    <div className="col-sm-6">
                            <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">Phone number</label>
                              <div className="cust-form">

                                <div className="select-box11">
                                <select className="custom-select merchant_select" name="countryCode" onChange={(e)=>getCountryCode(e)}  style={{height:'38px'}} >
                                 <option value="+233">+233</option>
                                  <option value="+91">+91</option>
                                  
                                </select>
                              </div>

                              <div className="customCountryCode">
                              <input 
                                type="text" 
                                style={{height:'38px'}}
                                className="form-control" 
                                name="phone"  
                                maxlength="10"
                                
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
                      <div className="col-sm-6">  <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email address</label>
                              <input 
                                type="text" 
                                className="form-control"
                                name="useremail" 
                                ref={register({ required: true, pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                } 
                                })}
                              />
                              
                              {errors.useremail && errors.useremail.type === "required" && <span className="text-danger">Email is required</span>}
                              {errors.useremail && errors.useremail.type === "pattern" && <span className="text-danger">Invalid email</span> }

                            </div></div>
                      <div className="col-sm-6">  <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Website URL</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="website" 
                            ref={register({ required: true})}
                          />
                          
                          {errors.website && errors.website.type === "required" && <span className="text-danger">Website is required</span>}
                          
                        </div></div>
                      </div>
                        
                        
                       
                       
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Description</label>
                          <textarea name="name" className="form-control" name="description"  ref={register({ required: true })}/>
                          <span className="text-danger">{errors.description && 'Description is required.'} </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor>Additional features <span>(choose at least one)</span></label>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="yes"  name="addionalFeture" onChange={allowChange} ref={register({ required: true })} />
                              <span className="checkmark" />
                              <span className="ml-4"> Allow Chat </span>
                            </label>
                          </div>
                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="no" name="addionalFeture" onChange={allowPaymentChnage} ref={register({ required: true })}/>
                              <span className="checkmark" />

                              <span className="ml-4"> Allow Payment </span>
                            </label>
                          </div>

                          <div className="labelinputspan">
                            <label className="custom-check alt inline">
                              <input type="checkbox" className="no" name="addionalFeture" onChange={allowQrChange} ref={register({ required: true })}/>
                              <span className="checkmark" />

                              <span className="ml-4"> Allow QR Code Scan </span>
                            </label>
                          </div>
                          {errors.addionalFeture && <p className="text-danger"> Additional feature is required.</p>}
                        </div>
                        <div className="form-group">
                          <label htmlFor>Are there any additional fileds required for payment?</label>
                          <label className="custom-radio inline">Yes
                        <input 
                          type="radio" 
                          className="yes" 
                          name="additionalField" 
                          value="true" 
                          ref={register}
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
                            ref={register({required:true})}
                            onChange={(e)=>additioanlFieldHander(e)}
                            />
                            <span className="checkmark" />
                          </label>
                        </div>

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

                    </Tab>
                    <Tab eventKey="Fees Setup" title="Fees Setup" >
                      <div className="tab-panel tabs_switch" id="f-setup" role="tabpanel">
                        <div className="form-group">
                          <label style={{ display: 'inline-block' }} htmlFor>Include Fees</label>
                          <label className="switch ml-2">
                            <input id="priceChanger" type="checkbox" name="includeFees" ref={register} onChange={(e)=>includeFeeToggle(e)} ref={register}/>
                            <span className="slider round" />
                          </label>
                        </div>
                        <div className={isOpened ? "formInt" : "formInt form-group-inactive"}>
                          <div className="form-group">
                            <label className="custom-radio inline">Fixed Fee per transaction
                          <input type="radio" className="yes" name="fees_type" value="fixed" onChange={(e)=>fixedTransToggle(e)} ref={register}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Percent of transaction amount
                          <input type="radio" className="no" name="fees_type" value="percent" onChange={(e)=>fixedTransToggle(e)} ref={register}/>
                              <span className="checkmark" />
                            </label>

                            {isFeeOpened ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                             <input 
                                type="text" 
                                className="form-control" 
                                name="transaction_amount" 
                                placeholder="GHC" ref={register}
                                
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
                                />
                               
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount</label>
                                <input type="text" 
                                  className="form-control" 
                                  name="min_capped" 
                                  placeholder="GHC" 
                                  ref={register}
                                  onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Max Capped Amount</label>
                                <input type="text" 
                                  className="form-control" 
                                  name="max_capped" 
                                  placeholder="GHC" 
                                  ref={register}
                                  onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
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
                          <input type="radio" className="yes" name="cost_bearer" value="sender" onChange={(e)=>costBearerToggle(e)} ref={register({ required: isOpened })}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Receiver
                          <input type="radio" className="no" name="cost_bearer" value="receiver" onChange={(e)=>costBearerToggle(e)} ref={register({ required: isOpened })}/>
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Split fees
                            <input type="radio" className="no" name="cost_bearer" value="split_fees" onChange={(e)=>costBearerToggle(e)} ref={register({ required: isOpened })}/>
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
                                      value={isMerchantPer}
                                      onChange={(e)=>splitMerchantPercent(e)}
                                      onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
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
                                      value={isUserPer}
                                      onChange={(e)=>splitUserPercent(e)}
                                      onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
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
                <div className="tab-content"  id="myTabContent" >
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

export default AddMerchantsModel;

