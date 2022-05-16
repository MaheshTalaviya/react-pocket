import React,{useEffect,useState} from 'react'
import '../AccountSetting/AccountSetting.css'
import Header from '../../../component/Header';
import AddFeesSetupModal from './AddFeesSetupModal';
import DefaultTaxRateMolde from './DefaultTaxRate';
import DefaultFeesModel from './DefaultFeesModal';
import KycLimitModel from './KycLimitModal';
import KycTransactionLImit from './KycTransactionLImit';
import AddManeyProviderModal from './AddManeyProviderModal';
import UpdateManeyProviderModal from './UpdateManeyProviderIconModal';

import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty } from 'lodash';
import {getDefaultFeesPrice, getDefaultSettingList, mobileManeyProviderList, countryList, deleteMpById,addMobileManeyProvider} from '../../../redux/action/SettingAction/SettingAction'

const DefaultFeesSetup = () => {
  
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenTaxModal, setIsOpenTaxModal] = useState(false)
  const [isOpenDefaultFeesModal, setIsOpenDefaultFeesModal] = useState(false)
  const [isOpenKycModal, setIsOpenKycModal] = useState(false)
  const [isOpenKycTransactionModal, setIsOpenKycTransactionModal] = useState(false)
  const [isIndividual, setIsIndividual] = useState('')
  const [isBusiness, setIsBusiness] = useState('')
  const [isMerchant, setIsMerchant] = useState('')
  const [isDefaultFees, setIsDefaultFees] = useState('')
  const [isTaxRate, setIsTaxRate] = useState('')
  const [isKycLimit, setIsKycLimit] = useState('')
  const [isKycTransactionLimit, setIsKycTransactionLimit] = useState('')
  const [isMpIconModal, setIsMpIconModal] = useState(false)
  const [isManeyProviderModal, setIsManeyProviderModal] = useState(false)
  const [isMpData, setIsMpData] = useState('')
  const [isFirst, setIsFirst] = useState(false)
  const [isMpSuccessMsg, setIsMpSuccessMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch(); 

  const feesData = useSelector(state => state.settingData.defaultFeesData)
  const defaultSettingData = useSelector(state => state.settingData.getDefaultSettingData)
  const maneyProviderData = useSelector(state => state.settingData.getManeyProviderData)
  const addMpSuccessMsg = useSelector(state => state.settingData.addMpSuccess)
  
   useEffect(()=>{
       defaultSettingList()
   },[defaultSettingData]) 
  useEffect(() => {
    dispatch(getDefaultFeesPrice())
    feeDataList()
    dispatch(getDefaultSettingList())
    defaultSettingList()
    dispatch(mobileManeyProviderList())
    // dispatch(countryList())
    if(setIsFirst){
        setIsLoading(false)
        setIsMpSuccessMsg(addMpSuccessMsg)
    }
  },[addMpSuccessMsg])


  const feeDataList =()=>{
    
    if(!isEmpty(feesData)){
        
    feesData.data.map((item, index) => {
            if(item.account_type==='Individual'){
                setIsIndividual(item)
            }
            if(item.account_type==='Business'){
                setIsBusiness(item)
            }
            if(item.account_type==='Merchant'){
                setIsMerchant(item)
            }
        }
    )
    }
  }

  const defaultSettingList =()=>{
    
    if(!isEmpty(defaultSettingData)){

        defaultSettingData.data.map((item, index) => {
            if(item.type==='default_fees'){
                setIsDefaultFees(item)
            }
            if(item.type==='default_tax'){
                setIsTaxRate(item)
            }
            if(item.type==='kyc_limit'){
                setIsKycLimit(item)
            }
            if(item.type==='kyc_transaction_limit'){
                setIsKycTransactionLimit(item)
            }
        }
    )
    }
  }
  

  const openFeesPopup =()=>{
    feeDataList()
    setIsOpenModal(!isOpenModal)
    
  }

  const openTaxPopup =()=>{
      setIsOpenTaxModal(!isOpenTaxModal)
  }
  const openDefaulFeesPopup = ()=>{
    setIsOpenDefaultFeesModal(!isOpenDefaultFeesModal)
  }
  const openKycLimitPopup =()=>{
    setIsOpenKycModal(!isOpenKycModal)
  }
   const openKycTransactionLimitPopup =()=>{
    setIsOpenKycTransactionModal(!isOpenKycTransactionModal)
  }

  const openManeyProviderPopup = ()=>{
      setIsLoading(true)
      dispatch(addMobileManeyProvider());
      setIsFirst(true)
    // setIsManeyProviderModal(!isManeyProviderModal);
  }

  const openManeyProviderIconPopup = (data)=>{
    setIsMpData(data)
    setIsMpIconModal(!isMpIconModal);
  }

  const deleteProvider=(id)=>{
      const data={
        serviceProviderId:id
      }
    dispatch(deleteMpById(data))
  }

  return (
    <div>
      <Header />
       {isOpenModal && 
            <AddFeesSetupModal 
                isModalOpen={isOpenModal} 
                individualData={isIndividual} 
                businessData={isBusiness} 
                merchantData={isMerchant} 
                onClick={() => openFeesPopup()}
            /> 
        }
        {isOpenTaxModal &&
            <DefaultTaxRateMolde
                isModalOpen={isOpenTaxModal} 
                taxRateData={isTaxRate}
                onClick={() => openTaxPopup()}
            />
        }
        {isOpenDefaultFeesModal &&
            <DefaultFeesModel
                isModalOpen={isOpenDefaultFeesModal} 
                defaultFeesData={isDefaultFees}
                onClick={() => openDefaulFeesPopup()}
            />
        }
        {isOpenKycModal &&
            <KycLimitModel
                isModalOpen={isOpenKycModal} 
                kycLimitData={isKycLimit}
                onClick={() => openKycLimitPopup()}
            />
        }

        {isOpenKycTransactionModal &&  <KycTransactionLImit
                isModalOpen={isOpenKycTransactionModal} 
                kycLimitData={isKycTransactionLimit}
                onClick={() => openKycTransactionLimitPopup()}/>
        }
        {isManeyProviderModal &&
            <AddManeyProviderModal
                isModalOpen={isManeyProviderModal} 
                onClick={() => openManeyProviderPopup()}
            />
        }
       
       {isMpIconModal &&
            <UpdateManeyProviderModal
                isModalOpen={isMpIconModal} 
                onClick={() => openManeyProviderIconPopup()}
                data={isMpData}
            />
       }
      <section className="dash-wrap">


        <div className="settings-block sm">
        <h1>Fees and Pricing settings</h1>
        <div className="editBlock">
            <div className="row align-items-center">
            <div className="col-lg-9">
                <h2>Default Pricing Setup</h2>
            </div>
            <div className="col-lg-3">
                <a 
                    data-toggle="modal" 
                    data-target="#editPricingModal" 
                    className="btn btn-block grey-btn sm-btn" 
                    onClick={()=>openFeesPopup()}
                >
                    <i className="icon-icon-edit"></i> Edit
                </a>
            </div>
            </div>
        </div>

        <div className="editBlock-details">
            <div className="row">
            <div className="col-lg-6">
                <div className="editBlock-single">
                <h2>Individuals</h2>
                {!isEmpty(feesData) && feesData.data.map((item, index)=>  item.account_type=='Individual' &&
                    <div key={index}>
                    <h3>Fixed of transaction amount</h3>
                    <p>Percent: {item.payer}%</p>
                    <p>Min Capped amount: {item.minCapped}</p>
                    <p>Max Capped amount: {item.maxCapped}</p>
                    </div>
                )
                }
                </div>
            </div>
            <div className="col-lg-6">
                <div className="editBlock-single">
                <h2>Businesses</h2>
                {!isEmpty(feesData) && feesData.data.map((item, index)=>  item.account_type=='Business' &&
                     <div key={index}>
                        
                        <h3>Percent of trasaction amount</h3>
                        <p>Percent: {item.payer}%</p>
                        <p>Min Capped amount: {item.minCapped}</p>
                        <p>Max Capped amount: {item.maxCapped}</p>
                    </div>
                    )
                    }

                </div>
            </div>
            <div className="col-lg-6">
                <div className="editBlock-single">
                <h2>Merchant</h2>
                {!isEmpty(feesData) && feesData.data.map((item, index)=>  item.account_type=='Merchant' &&
                    <div key={index}>
                        
                        <h3>Percent of trasaction amount</h3>
                        <p>Percent: {item.payer}%</p>
                        <p>Min Capped amount: {item.minCapped}</p>
                        <p>Max Capped amount: {item.maxCapped}</p>
                    </div>
                    )
                    }

                </div>
            </div>
            </div>
        </div>

        <div className="editBlock">
            <div className="row align-items-center">
            <div className="col-lg-9">
                <h2>Default Tax rate on Sales</h2>
                <p>Percent:{isTaxRate.amount}%</p>
            </div>
            <div className="col-lg-3">
                <a 
                    data-toggle="modal" 
                    data-target="#taxRateOnSaleModal" 
                    className="btn btn-block grey-btn sm-btn" 
                    onClick={()=>openTaxPopup()}
                >
                    <i className="icon-icon-edit"></i> Edit
                </a>
            </div>
            </div>
        </div>

        <div className="editBlock">
            <div className="row align-items-center">
            <div className="col-lg-9">
                <h2>Default Fees</h2>
                <p>Percent: {isDefaultFees.amount}%</p>
            </div>
            <div className="col-lg-3">
                <a 
                    data-toggle="modal" 
                    data-target="#taxRateOnSaleModal" 
                    className="btn btn-block grey-btn sm-btn" 
                    onClick={()=>openDefaulFeesPopup()}
                >
                    <i className="icon-icon-edit"></i> Edit
                </a>          
            </div>
            </div>
        </div>

        <div className="editBlock">
            <div className="row align-items-center">
            <div className="col-lg-9">
                <h2>KYC Transfer Limit</h2>
                <p>Capped amount: {isKycLimit.amount}GH₵</p>
            </div>
            <div className="col-lg-3">
                <a 
                    data-toggle="modal" 
                    data-target="#taxRateOnSaleModal" 
                    className="btn btn-block grey-btn sm-btn" 
                    onClick={()=>openKycLimitPopup()}
                >
                    <i className="icon-icon-edit"></i> Edit
                </a> 
                </div>
            </div>
        </div>
           {/* <div className="editBlock">
            <div className="row align-items-center">
            <div className="col-lg-9">
                <h2>KYC Transaction Limit</h2>
               
                <p>No. of Allowed Transaction: {isKycTransactionLimit.amount}GH₵</p>
            </div>
            <div className="col-lg-3">
                <a 
                    data-toggle="modal" 
                    data-target="#taxRateOnSaleModal" 
                    className="btn btn-block grey-btn sm-btn" 
                    onClick={()=>openKycTransactionLimitPopup()}
                >
                    <i className="icon-icon-edit"></i> Edit
                </a> 
                </div>
            </div>
        </div> */}
        </div>


        

        <div className="settings-block sm">
        <h1>Mobile Money Providers</h1>
        <div className="mobileMoney-wrap">
        {!isEmpty(maneyProviderData) &&  maneyProviderData.data.map((item, index)=> 
            <div className="mobileMoney">
            <div className="row align-items-center">
                <div className="col-lg-8">
                <span className="mobileMoney-img">
                    <img src={item.iconUrl} alt /></span>
                <span className="mobileMoney-txt">{item.name}</span>
                </div>
                <div className="col-lg-4 text-right">
                <a className="action-link" onClick={()=>openManeyProviderIconPopup(item)}><i className="icon-icon-edit" /></a>
                <a className="action-link" onClick={()=>deleteProvider(item.id)}><i className="icon-icon-delete" /></a>
                </div>
            </div>
            </div>
        )
        }
        
        </div>
        <input 
            data-toggle="modal" 
            data-target="#mobileMoneyModal" 
            className="btn btn-block green-btn mt-3" 
            type="button" 
            value="Fetch Provider From Uniwallet Api" 
            onClick={() => openManeyProviderPopup()}
        />

        {isLoading && 
             <p className="text-success text-center">Fetching Mobile Proivder From Uniwallet Api...</p>
        }
        {isMpSuccessMsg !='' &&
            <p className="text-success text-center">{isMpSuccessMsg.message}</p>
        }
        
        </div>



      </section>
    </div>
  )
}


export default DefaultFeesSetup;