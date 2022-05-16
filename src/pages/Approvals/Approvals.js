import React, { useEffect, useState } from 'react'
import './Approvals.css'
import Header from '../../component/Header';
import ApprovalIdModal from './ApprovalIdModal';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {getAllApprovelsApiData} from '../../redux/action/Approvels/ApprovelsAction'
import { useDispatch, useSelector, } from 'react-redux'
import Select from 'react-select';
import { useHistory } from "react-router-dom";
const Approvals = () => {
  const dispatch = useDispatch(); 
  const [isShowApprovalId, setIsShowApprovalId] = useState(false);
  const [approvalDetails, setApprovalDetails]   = useState({})
  const [approvalApiResponse, setApprovalApiResponse]   = useState('')
  const merchantList = useSelector(state => state.approvalData.ApprovelsListData)
  const [selectMonth,setSelectMonth]=useState();
   const [isCurrentPage, setIsCurrentPage] = useState(1);
     const [slectAll, setSelectAll] = useState('pending');

   

const adminDetail = useSelector(state => state.loginData.loginSuccesData)
 var history = useHistory();  
useEffect(()=>{
    if(adminDetail?.role !=='superadmin'){
      
       history.push('/dashboard')
    }
     // dispatch(getAllApprovelsApiData({status:slectAll,page:1}))
   // setSelectMonth({ value: 6, label: '6 Months' })
    //dispatch(getAllApprovelsApiData({sort:6}))
  },[])
  const selectMonthChange=(selectedOption)=>{
    dispatch(getAllApprovelsApiData({sort:selectedOption.value}))
    setSelectMonth(selectedOption)
  }

  const approvalIdModelClose = () => {
    setIsShowApprovalId(false)
  }

  useEffect(()=>{
    setApprovalApiResponse(merchantList?.result)
   // console.log(merchantList?.result?.reverse())
  },[merchantList])

  const approvalData  = [{
    id:32323, 
    requestedAt:434234,
    sender: "Ron",
    actionRequired: 'Full Re',
    comment: 'Yo this is trial'  
  }, {
    id:43434, 
    requestedAt:43242342,
    sender: "Joy",
    actionRequired: 'Full Re',
    comment: 'Yo this is trial'  
  }]

  // getting list of approval data 

  const renderTableData = () => {
    return !isEmpty(approvalApiResponse) && approvalApiResponse.map((item , index) => {
     
     const {approvalId, createdDate, adminName, action, comment} = item ; 
     item.page=isCurrentPage
     item.filter=slectAll
     
     return (
        <tr key={index}>
          <td > #{approvalId}</td>
          <td><div className="date">{moment(createdDate).format('LL')}<span onClick={() =>{setApprovalDetails(item);  setIsShowApprovalId(!isShowApprovalId)} }>{moment(createdDate).format('HH:MM A')}</span></div></td>
          <td>
            <div className="sender">
              <span className="sender-txt">{adminName}</span>
            </div>
          </td>
          <td >{action}</td>
          <td >{comment}</td>
          <td>
            <span className="act-btn">
              <a data-toggle="modal" data-target="#transModal-2" onClick={() =>{setApprovalDetails(item);  setIsShowApprovalId(!isShowApprovalId)} }  href="#"><i className="icon-icon-tick" /></a>
              <a data-toggle="modal" data-target="#transModal" onClick={() =>{setApprovalDetails(item);  setIsShowApprovalId(!isShowApprovalId)} }  className="close-btn ml-2" href="#"><i className="icon-icon-close2" /></a>
            </span>
          </td>
        </tr>
        )
    })
  }
const paginationHander = (pageNumber) => {
    // console.log("----------------pageNumber",pageNumber);
    setIsCurrentPage(pageNumber);

   dispatch(getAllApprovelsApiData({status:slectAll,page:pageNumber}))
    
  }

  const nextPaginationHander = (pageNumber) => {
    if(isCurrentPage !== pageNumber){
    const p = isCurrentPage+1;
    setIsCurrentPage(p);

   dispatch(getAllApprovelsApiData({status:slectAll,page:p}))
   
    }
  }

  const previousPaginationHander = () => {
    if(isCurrentPage>1){
      const p = isCurrentPage-1;
      setIsCurrentPage(p);
     dispatch(getAllApprovelsApiData({status:slectAll,page:p}))
    }
  }

  const firstPaginationHander = () => {
     const p = 1;
      setIsCurrentPage(p);
      dispatch(getAllApprovelsApiData({status:slectAll,page:p}))
   
  }
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
      setIsCurrentPage(p);
    dispatch(getAllApprovelsApiData({status:slectAll,page:p}))
    
  }
useEffect(()=>{
  dispatch(getAllApprovelsApiData({status:slectAll,page:isCurrentPage}))
},[slectAll])
   const  sortDonutHander = (e) => {
   
      setSelectAll(e.currentTarget.value);}

const paginationList =()=>{

    // const pageNumbers=[]; 
    // for(var i=1; i <= merchantList.totalPage; i++){
    //   pageNumbers.push(i)
    // }
    // const renderPageNumbers = pageNumbers.map(number => {
    //   return (
    //     <li key={number} onClick={(i)=>paginationHander(number)}>
    //     <a className={merchantList.currentPage==number ? "active" : '' }>{number}
    //     </a>
    //     </li>
    //   );
    // });
    const pageNumbers=[]; 
    for(var i=1; i <= merchantList?.totalPage; i++){
      pageNumbers.push(i)
    }
    if(merchantList?.totalPage > 3){

    }
    const renderPageNumbers = pageNumbers.map(number => {
      if ( number === merchantList?.currentPage - 2 || number === merchantList?.currentPage + 2) {
        return <span>...</span>
      } else if (number < 2 || number === pageNumbers.length || merchantList?.currentPage===number || merchantList?.currentPage===number - 1 || merchantList?.currentPage===number + 1) {
        return (
        <li key={number} onClick={(i)=>paginationHander(number)}>
        <a className={merchantList?.currentPage==number ? "active" : '' }>{number}
        </a>
        </li>
      );
      }
      
    });
    return <ul>
        <li><a className="nxt" onClick={()=>firstPaginationHander()} ><i className="fa fa-angle-double-left" aria-hidden="true" /></a></li>
        <li><a className="nxt" onClick={()=>previousPaginationHander()}><i className="fa fa-angle-left" aria-hidden="true" /></a></li>
         {renderPageNumbers}
        <li><a className="nxt" onClick={()=>nextPaginationHander(merchantList.totalPage)}><i className="fa fa-angle-right" aria-hidden="true" /></a></li>
        <li><a className="nxt" onClick={()=>lastPaginationHander(merchantList.totalPage)} ><i className="fa fa-angle-double-right" aria-hidden="true" /></a></li>
      </ul> 
              
  }


  return (
    <div>
      <Header />
      {/* {isShowApprovalId ?
        <ApprovalIdModal onClick={() => setIsShowApprovalId(!isShowApprovalId)} />
        : ( */}

      <ApprovalIdModal isModalOpen={isShowApprovalId} onClick={() => approvalIdModelClose()} data={approvalDetails}/>
      <section className="dash-wrap">
        <div className="sec-block alt first">
          <div className="block-single auto">
            <div className="block-heading mb-3">
              <h2>Approvals</h2>
              <div className="table-btn">
                <div className="custom-select-wrap alt">
                  <div className="selectImage">
                     <select className="custom-select" name="state"onChange={sortDonutHander}>
                      {/* <option value="all">All</option> */}
                      <option  value="pending">Pending</option>
                      <option  value="approved">Approvel</option>
                      <option  value="declined">Decline</option>
                    </select>
                    
                  </div>
                  {/* <Select
                   
        value={selectMonth}
        onChange={selectMonthChange}
        options={options}
      /> */}
                </div> 
               </div>
            </div>
            <div className="transaction-main">
              <div className="transaction-table">
                <div className="table-responsive">
                  <table className="table theme-table">
                    <tbody><tr>
                      <th>Approval ID</th>
                      <th>Date requested</th>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Comment</th>
                      <th style={{ width: '140px' }}>Action</th>
                    </tr>
             
                      {renderTableData()}
                    </tbody></table>
                </div>
              </div>
              
            </div>
             <div className="site-pagination">
              { paginationList()}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )

}

export default Approvals;