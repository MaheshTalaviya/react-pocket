
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import { Tabs, Tab } from 'react-bootstrap';
import Button from '../../../component/Button/button'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty } from 'lodash';
import {DefaultFeesPriceSave } from '../../../redux/action/SettingAction/SettingAction'


const AddFeesSetupModel = (props) => {
  console.log("props--",props);

    const [isOpened, setIsOpened] = useState(false);
    const [isFeeOpened, setIsFeeOpened] = useState(false);
    const [isPercentOpened, setIsPercentOpened] = useState(false);
    const [isFeeOpened1, setIsFeeOpened1] = useState(false);
    const [isPercentOpened1, setIsPercentOpened1] = useState(false);
    const [isFeeOpened2, setIsFeeOpened2] = useState(false);
    const [isPercentOpened2, setIsPercentOpened2] = useState(false);
    const [isCostBearerOpened, setIsCostBearerOpened] = useState(false);
    const [errorApiMsg, setErrorApiMsg] = useState('');
    const [successApiMsg, setSuccessApiMsg] = useState('');
    const [isFirst, setIsFirst] = useState(false);
    const [isIndividualMinCapped, setIsIndividualMinCapped] = useState('');
    const [isIndividualMaxCapped, setIsIndividualMaxCapped] = useState('');
    const [isIndividualMinCapped1, setIsIndividualMinCapped1] = useState('');
    const [isIndividualMaxCapped1, setIsIndividualMaxCapped1] = useState('');
    const [isIndividualPayer, setIsIndividualPayer] = useState('');
    const [isBusinessMinCapped, setIsBusinessMinCapped] = useState('');
    const [isBusinessMaxCapped, setIsBusinessMaxCapped] = useState('');
    const [isBusinessMinCapped1, setIsBusinessMinCapped1] = useState('');
    const [isBusinessMaxCapped1, setIsBusinessMaxCapped1] = useState('');
    const [isBusinessPayer, setIsBusinessPayer] = useState('');
    const [isMerchantMinCapped, setIsMerchantMinCapped] = useState('');
    const [isMerchantMaxCapped, setIsMerchantMaxCapped] = useState('');
    const [isMerchantMinCapped1, setIsMerchantMinCapped1] = useState('');
    const [isMerchantMaxCapped1, setIsMerchantMaxCapped1] = useState('');
    const [isMerchantPayer, setIsMerchantPayer] = useState('');
  
  let history = useHistory();
  const dispatch = useDispatch(); 

  const feesMessage = useSelector(state => state.settingData.feesSuccessMessage)
  

  useEffect(() => {
    
    if(props.individualData.fees_type==="fixed"){
        setIsFeeOpened(true)
        setIsPercentOpened(false)
        setIsIndividualMinCapped1('')
        setIsIndividualMaxCapped1('')
        setIsIndividualPayer('')
        setIsIndividualMinCapped(props.individualData.minCapped)
        setIsIndividualMaxCapped(props.individualData.maxCapped)
    }
    if(props.individualData.fees_type==="percent"){
      
        setIsFeeOpened(false)
        setIsPercentOpened(true)
        setIsIndividualMinCapped('')
        setIsIndividualMaxCapped('')
        setIsIndividualMinCapped1(props.individualData.minCapped)
        setIsIndividualMaxCapped1(props.individualData.maxCapped)
        setIsIndividualPayer(props.individualData.payer)
    }

    if(props.businessData.fees_type==="fixed"){
        setIsFeeOpened1(true)
        setIsPercentOpened1(false)
        setIsBusinessMinCapped(props.businessData.minCapped)
        setIsBusinessMaxCapped(props.businessData.maxCapped)
        setIsBusinessMinCapped1('')
        setIsBusinessMaxCapped1('')
        setIsBusinessPayer('')
    }
    if(props.businessData.fees_type==="percent"){
      console.log("======",props.businessData);
        setIsFeeOpened1(false)
        setIsPercentOpened1(true)
        setIsBusinessMinCapped('')
        setIsBusinessMaxCapped('')
        setIsBusinessMinCapped1(props.businessData.minCapped)
        setIsBusinessMaxCapped1(props.businessData.maxCapped)
        setIsBusinessPayer(props.businessData.payer)
        
    }

    if(props.merchantData.fees_type==="fixed"){
        setIsFeeOpened2(true)
        setIsPercentOpened2(false)
        setIsMerchantMinCapped(props.merchantData.minCapped)
        setIsMerchantMaxCapped(props.merchantData.maxCapped)
        setIsMerchantPayer('')
        setIsMerchantMinCapped1('')
        setIsMerchantMaxCapped1('')
    }
    if(props.merchantData.fees_type==="percent"){
        setIsFeeOpened2(false)
        setIsPercentOpened2(true)
        setIsMerchantMinCapped('')
        setIsMerchantMaxCapped('')
        setIsMerchantPayer(props.merchantData.payer)
        setIsMerchantMinCapped1(props.merchantData.minCapped)
        setIsMerchantMaxCapped1(props.merchantData.maxCapped)
    }


    if(isFirst && feesMessage?.message){
        setSuccessApiMsg(feesMessage.message) 

        // setIsFeeOpened(false)
        // setIsPercentOpened(false)
        // setIsIndividualMinCapped1('')
        // setIsIndividualMaxCapped1('')
        // setIsIndividualPayer('')
        // setIsIndividualMinCapped('')
        // setIsIndividualMaxCapped('')
        // setIsFeeOpened1(false)
        // setIsPercentOpened1(false)
        // setIsBusinessMinCapped('')
        // setIsBusinessMaxCapped('')
        // setIsBusinessMinCapped1('')
        // setIsBusinessMaxCapped1('')
        // setIsBusinessPayer('')
        // setIsFeeOpened2(false)
        // setIsPercentOpened2(false)
        // setIsMerchantMinCapped('')
        // setIsMerchantMaxCapped('')
        // setIsMerchantPayer('')
        // setIsMerchantMinCapped1('')
        // setIsMerchantMaxCapped1('')

        setTimeout(() =>  
            props.onClick(), 2000
        ) 
       }else{
          setSuccessApiMsg('') 
       }
   
  },[feesMessage,props])


const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook

const  saveIndividualUserFees = (data) =>{

 var payer = 0;
 var receiver = 0;
 var min_capped = 0;
 var max_capped = 0;

 if(data.fees_type==="fixed"){
     payer = 0
     receiver = 0
     min_capped = data.min_capped
   
 }
 if(data.fees_type==="percent"){
     payer = data.percentag
     receiver = 0
     min_capped = data.min_capped_1
     max_capped = data.max_capped_1
 }
 

 const formData ={
    "account_type":"Individual",
    "fees_type":data.fees_type,
    "payer":payer, 
    "receiver":receiver,
    "minCapped":min_capped,
    "maxCapped":max_capped
  }

 
  dispatch(DefaultFeesPriceSave(formData))
  setIsFirst(true)
  
}

const saveBusinessUserFees = (data1) =>{
    var payer = '';
    var receiver = '';
    var min_capped = '';
    var max_capped = '';
    
    if(data1.fees_type==="fixed"){
        payer = 0
        receiver = 0
        min_capped = data1.min_capped2
      
    }
    if(data1.fees_type==="percent"){
        payer = data1.percentag_2
        receiver = 0
        min_capped = data1.min_capped_2
        max_capped = data1.max_capped_2
    }
    const formData1 ={
       "account_type":"Business",
       "fees_type":data1.fees_type,
       "payer":payer, 
       "receiver":receiver,
       "minCapped":min_capped,
       "maxCapped":max_capped
    }
    dispatch(DefaultFeesPriceSave(formData1))
    setIsFirst(true)
      
}

const saveMerchantUserFees =(data2)=>{
    var payer = '';
    var receiver = '';
    var min_capped = '';
    var max_capped = '';
    
    if(data2.fees_type==="fixed"){
        payer = 0
        receiver = 0
        min_capped = data2.min_capped3
      
    }
    if(data2.fees_type==="percent"){
        payer = data2.percentag_3
        receiver = 0
        min_capped = data2.min_capped_3
        max_capped = data2.max_capped_3
    }
    const formData2 ={
       "account_type":"Merchant",
       "fees_type":data2.fees_type,
       "payer":payer, 
       "receiver":receiver,
       "minCapped":min_capped,
       "maxCapped":max_capped

    }
    dispatch(DefaultFeesPriceSave(formData2))
    setIsFirst(true)
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

const  fixedTransToggle1 = (e) => {
    if(e.target.value === 'fixed'){
      setIsPercentOpened1(false);
      setIsFeeOpened1(true);
    }else if(e.target.value === 'percent'){
      setIsFeeOpened1(false);
      setIsPercentOpened1(true);
    }else{
      setIsFeeOpened1(false);
      setIsPercentOpened1(false);
    }
  }

const  fixedTransToggle2 = (e) => {
    if(e.target.value === 'fixed'){
      setIsPercentOpened2(false);
      setIsFeeOpened2(true);
    }else if(e.target.value === 'percent'){
      setIsFeeOpened2(false);
      setIsPercentOpened2(true);
    }else{
      setIsFeeOpened2(false);
      setIsPercentOpened2(false);
    }
  }

const costBearerToggle = (e) => {
  if(e.target.value === 'split_fees'){
    setIsCostBearerOpened(true)
  }else{
    setIsCostBearerOpened(false)
  }
}


  return (
    < Modal
      isOpen={true}
    >
      <div className="modal_height" id="addMerchantModal" tabIndex={-1} >
        <div className="modal-dialog modal-dialog-centered common-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Default Pricing Setup</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body">
           
              <div className="tabSimple">
               <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <Tabs>
                    <Tab eventKey="Individual" title="Individual">
                    <div className="tab-pane fade show active" id="g-info" role="tabpanel">
                    <form onSubmit={handleSubmit(saveIndividualUserFees)}>
                      <div className="form-group">
                          <label style={{ display: 'inline-block' }} htmlFor>Include Fees</label>
                      </div>
                        <div className="formInt">
                          <div className="form-group">
                            <label className="custom-radio inline">Fixed Fee per transaction
                             <input type="radio" 
                                className="yes" 
                                name="fees_type" 
                                value="fixed" 
                                onChange={(e)=>fixedTransToggle(e)} 
                                ref={register}
                                defaultChecked={isFeeOpened}
                            />
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Percent of transaction amount
                            <input 
                                type="radio" 
                                className="no" 
                                name="fees_type" 
                                value="percent" 
                                onChange={(e)=>fixedTransToggle(e)} 
                                ref={register}
                                defaultChecked={isPercentOpened}
                            />
                              <span className="checkmark" />
                            </label>

                            {isFeeOpened ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                             <input 
                                type="text" 
                                className="form-control" 
                                name="min_capped" 
                                placeholder="GH₵" 
                                defaultValue={isIndividualMinCapped}
                                ref={register({required:true})} 
                                onKeyPress={(event) => { if (!/^\d*\.?\d*$/.test(event.key)) { event.preventDefault(); } }}
                            /> 
                             {errors.min_capped && errors.max_capped.type === "required" && <span className="text-danger">Min capped is required</span>}
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
                                    name="percentag" 
                                    placeholder="%" 
                                    defaultValue={isIndividualPayer}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                    {errors.percentag && errors.percentag.type === "required" && <span className="text-danger">Percentag is required</span>}
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount </label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="min_capped_1" 
                                    placeholder="GH₵" 
                                    defaultValue={isIndividualMinCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                     {errors.min_capped_1 && errors.min_capped_1.type === "required" && <span className="text-danger">Min capped is required</span>}
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Max Capped Amount</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="max_capped_1" 
                                    placeholder="GH₵" 
                                    defaultValue={isIndividualMaxCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                     {errors.max_capped_1 && errors.max_capped_1.type === "required" && <span className="text-danger">Max capped is required</span>}
                              </div>
                            </div>
                          </div>
                            : 
                            ''
                            }
                          </div>
                        
                        </div>
                        <input type="submit" value="Save Individual" className="form-control btn btn-block green-btn" />
                            <br/>
                            {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}
                            {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
                            </form>
                       </div>
                       
                    </Tab>
                    <Tab eventKey="Businesses" title="Businesses" >
                      <div className="tab-panel tabs_switch" id="f-setup" role="tabpanel">
                    <form onSubmit={handleSubmit(saveBusinessUserFees)}>
                        <div className="form-group">
                          <label style={{ display: 'inline-block' }} htmlFor>Include Fees</label>
                          
                        </div>
                        <div className="formInt">
                          <div className="form-group">
                            <label className="custom-radio inline">Fixed Fee per transaction
                            <input 
                                type="radio" 
                                className="yes" 
                                name="fees_type" 
                                value="fixed" 
                                onChange={(e)=>fixedTransToggle1(e)} 
                                ref={register}
                                defaultChecked={isFeeOpened1}
                            />
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Percent of transaction amount
                            <input 
                                type="radio" 
                                className="no" 
                                name="fees_type" 
                                value="percent"  
                                onChange={(e)=>fixedTransToggle1(e)} 
                                ref={register}
                                defaultChecked={isPercentOpened1}
                            />
                              <span className="checkmark" />
                            </label>

                            {isFeeOpened1 ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                             <input
                                type="text" 
                                className="form-control" 
                                name="min_capped2" 
                                placeholder="GH₵" 
                                defaultValue={isBusinessMinCapped}
                                ref={register({required:true})}
                                onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                            /> 
                             {errors.min_capped2 && errors.min_capped2.type === "required" && <span className="text-danger">Min capped is required</span>}
                            </div>
                           
                            </div>
                            : 
                            ''
                            }
                            {isPercentOpened1 ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Percent {isBusinessPayer}</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="percentag_2"  
                                    placeholder="%" 
                                    defaultValue={isBusinessPayer}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                {errors.percentag_2 && errors.percentag_2.type === "required" && <span className="text-danger">Percentag is required</span>}
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount </label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="min_capped_2" 
                                    placeholder="GH₵" 
                                    defaultValue={isBusinessMinCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                            {errors.min_capped_2 && errors.min_capped_2.type === "required" && <span className="text-danger">Min capped_2 is required</span>}

                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Max Capped Amount</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="max_capped_2" 
                                    placeholder="GH₵" 
                                    defaultValue={isBusinessMaxCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                     {errors.max_capped_2 && errors.max_capped_2.type === "required" && <span className="text-danger">Max capped is required</span>}
                              </div>
                            </div>

                          </div>
                            : 
                            ''
                            }
                          </div>
                          
                        </div>

                        <input type="submit" value="Save Business" className="form-control btn btn-block green-btn" />
                            <br/>
                            {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}
                            {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
                        
                          </form>

                      </div>
                    </Tab>

                    <Tab eventKey="Merchant" title="Merchant" >
                      <div className="tab-panel tabs_switch" id="f-setup" role="tabpanel">
                    <form onSubmit={handleSubmit(saveMerchantUserFees)}>
                        <div className="form-group">
                          <label style={{ display: 'inline-block' }} htmlFor>Include Fees</label>
                          
                        </div>
                        <div className="formInt">
                          <div className="form-group">
                            <label className="custom-radio inline">Fixed Fee per transaction
                            <input 
                                type="radio" 
                                className="yes" 
                                name="fees_type" 
                                value="fixed" 
                                onChange={(e)=>fixedTransToggle2(e)} 
                                ref={register}
                                defaultChecked={isFeeOpened2}
                            />
                              <span className="checkmark" />
                            </label>
                            <label className="custom-radio inline">Percent of transaction amount
                            <input 
                                type="radio" 
                                className="no" 
                                name="fees_type" 
                                value="percent"  
                                onChange={(e)=>fixedTransToggle2(e)} 
                                ref={register}
                                defaultChecked={isPercentOpened2}
                            />
                              <span className="checkmark" />
                            </label>

                            {isFeeOpened2 ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                             <input
                                type="text" 
                                className="form-control" 
                                name="min_capped3" 
                                placeholder="GH₵" 
                                defaultValue={isMerchantMinCapped}
                                ref={register({required:true})}
                                onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                            /> 
                             {errors.min_capped3 && errors.min_capped3.type === "required" && <span className="text-danger">Min capped is required</span>}
                            </div>
                            </div>
                            : 
                            ''
                            }
                            {isPercentOpened2 ? 
                            <div className="row modified">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Percent</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="percentag_3"  
                                    placeholder="%" 
                                    defaultValue={isMerchantPayer}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                {errors.percentag_3 && errors.percentag_3.type === "required" && <span className="text-danger">Percentag is required</span>}
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Min Capped Amount</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="min_capped_3" 
                                    placeholder="GH₵" 
                                    defaultValue={isMerchantMinCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                            {errors.min_capped_3 && errors.min_capped_3.type === "required" && <span className="text-danger">Min capped_2 is required</span>}

                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Max Capped Amount</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    name="max_capped_3" 
                                    placeholder="GH₵" 
                                    defaultValue={isMerchantMaxCapped1}
                                    ref={register({required:true})}
                                    onKeyPress={(event) =>{if (!/[0-9]/.test(event.key)) {event.preventDefault();} }}
                                />
                                     {errors.max_capped_3 && errors.max_capped_3.type === "required" && <span className="text-danger">Max capped is required</span>}
                              </div>
                            </div>
                          </div>
                            : 
                            ''
                            }
                          </div>
                       
                        </div>

                        <input type="submit" value="Save Merchant" className="form-control btn btn-block green-btn" />
                            <br/>
                            {successApiMsg ? <p className="form-text text-success">{successApiMsg}</p> : ''}
                            {errorApiMsg ? <p className="form-text text-error">{errorApiMsg}</p> : ''}
                        
                          </form>

                      </div>
                    </Tab>

                  </Tabs>
                </ul>
                <div className="tab-content" id="myTabContent">
               </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>

    </Modal >

  );
}

export default AddFeesSetupModel;

