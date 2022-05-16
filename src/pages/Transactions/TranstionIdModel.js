import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import user from './../../assets/images/user-2.jpg'
import user1 from './../../assets/images/user-5.jpg'
import {getTransactionDetailsApiData}from '../../redux/action/TransactionAction/TransactionAction'
import { useDispatch, useSelector, } from 'react-redux'
import 'react-calendar/dist/Calendar.css';
import { jsPDF } from "jspdf";
import {approvelsAddAPiRequest}from '../../redux/action/Approvels/ApprovelsAction'
import { renderToString,renderToStaticMarkup } from 'react-dom/server'
import {GET_TRASACTION_DETAILS_API_EXPORT_CLEAR} from '../../redux/action/actionTypes'
import ExportData from './export';
//getTransactionDetailsApiData
//transactionDetails
const TranstionIdModel = (props) => {
  const dispatch = useDispatch(); 
     const adminPermission=useSelector(state => state.loginData.loginSuccesData)
  const transactionDetail = useSelector(state => state.transactionData.transactionDetails)
  useEffect(()=>{
    dispatch(getTransactionDetailsApiData(props.transactionDataById.transactionId))
  },[])
  // useEffect(()=>{
  //   console.log(transactionDetail && transactionDetail?.data?.transactionDetails?.transactionDate)
  // },[transactionDetail])

  const exportPDf=()=>{
     const doc = new jsPDF('p','pt','a4');
 
 let a =renderToString(<ExportData data={transactionDetail.data?.transactionDetails} schoolData={transactionDetail.data?.paymentDetails} />)

  doc.html(a,{callback:function(doc){
 doc.save('transactionDetails.pdf')
  dispatch({ type: GET_TRASACTION_DETAILS_API_EXPORT_CLEAR, payload:''});
    //window.open(doc.output('bloburl'))
  }})
  }
  const refundBtn=(con)=>{
 //console.log(transactionDetail?.data?.transactionDetails)
 const resData={
    "action": "Refund",
    "action_status": 1,
    "comment": "Refund amount ",
    "details":transactionDetail?.data?.transactionDetails
};
  if(con=='Debited'){
    if(adminPermission?.permissions){
      if(adminPermission.permissions[0].transactions.refund === 'full_access'){
        dispatch(approvelsAddAPiRequest(resData))
      }else if(adminPermission.permissions[0].transactions.refund === 'view_only'){
         return true
      }
      else{
        dispatch(approvelsAddAPiRequest(resData))
      }
   }else{
  dispatch(approvelsAddAPiRequest(resData))
   }
   
  }else{
    return true
  }
 
}
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>

        <div className="transition_modalpage" id="transModal" tabIndex={-1} >
          <div className="modal-dialog modal-dialog-centered common-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Transaction ID #{transactionDetail && transactionDetail?.data?.transactionDetails?.transactionId}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()} >
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">

                <div className="trans-details">
                  <div className="row modified">
                    <div className="col-sm-9">
                      <div className="trans-details-left">
                        <span className="transDate">{transactionDetail && transactionDetail?.data?.transactionDetails?.transactionDate}</span>
                        <span className="transName">GH₵ {transactionDetail && transactionDetail?.data?.transactionDetails?.amount}.00</span>
                        <span className="transStat">{transactionDetail && transactionDetail?.data?.transactionDetails?.transactionStatus}</span>
                        <div className="row modified">
                          <div className="col-lg-6 tarnsDetails">
                            <span className="popTitle">Sender</span>
                            <div className="sender">
                              <span className="sender-img"><img src={transactionDetail && transactionDetail?.data?.transactionDetails?.senderAvtar} alt="" /></span>
                              <span className="sender-txt">{transactionDetail && transactionDetail?.data?.transactionDetails?.senderName} <br /> <a href="#">dihunter228@gmail.com</a></span>
                            </div>
                          </div>
                          <div className="col-lg-6 tarnsDetails">
                            <span className="popTitle">Receiver</span>
                            <div className="sender">
                              <span className="sender-img-comp"><img src={transactionDetail && transactionDetail?.data?.transactionDetails?.receiverAvtar} alt="" /></span>
                              <span className="sender-txt">{transactionDetail && transactionDetail?.data?.transactionDetails?.receiverName}</span>
                            </div>
                          </div>
                          <div className="col-sm-6 tarnsDetails">
                            <span className="popTitle">Method</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.transactionDetails?.method}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails">
                            <span className="popTitle">Type</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.transactionDetails?.type}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails" style={{display:transactionDetail && transactionDetail?.data?.transactionDetails?.type ==='Schools' ?"block":"none"}}>
                            <span className="popTitle">Institute</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.paymentDetails?.data?.institute}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails" style={{display:transactionDetail && transactionDetail?.data?.transactionDetails?.type ==='Schools' ?"block":"none"}}>
                            <span className="popTitle">Location</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.paymentDetails?.data?.location}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails" style={{display:transactionDetail && transactionDetail?.data?.transactionDetails?.type ==='Schools' ?"block":"none"}}>
                            <span className="popTitle">Fee Details</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.paymentDetails?.data?.fee_detail}</span>
                          </div>
                          <div className="col-sm-6 tarnsDetails" style={{display:transactionDetail && transactionDetail?.data?.transactionDetails?.type ==='Schools' ?"block":"none"}}>
                            <span className="popTitle">Student Number</span>
                            <span className="popDesc">{transactionDetail && transactionDetail?.data?.paymentDetails?.data?.student_number}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="trans-details-right">
                        <ul className="transLink">
                          
                         
                         <li><a className={`${adminPermission.role ==='admin' &&  adminPermission.permissions[0].transactions.refund ==='view_only' ? 'disabled':''} ${transactionDetail && transactionDetail?.data?.transactionDetails?.transactionStatus==='Debited'? 'activeBtnColor':'disabled'}`} style={{border:"none", position:"relative"}} onClick={()=>{refundBtn(transactionDetail && transactionDetail?.data?.transactionDetails?.transactionStatus)}}><i className="icon-icon-refund" /> Refund</a></li>
                          <li><a onClick={exportPDf} style={{cursor:"pointer"}}><i className="icon-icon-download" /> Export</a></li>

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Modal>

  );
}

export default TranstionIdModel;