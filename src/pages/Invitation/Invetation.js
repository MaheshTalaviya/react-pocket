import React, { useEffect, useState } from 'react'

import Header from '../../component/Header';
import ApprovalIdModal from './ApprovalIdModal';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {getInviteApiData,getInviteUserApiData,inviteUserSendData} from '../../redux/action/Invitations/InvitationsActions'
import { useDispatch, useSelector, } from 'react-redux'
import Select from 'react-select';
import { useHistory } from "react-router-dom";
const Invetation = () => {
const dispatch = useDispatch(); 
const [isShowApprovalId, setIsShowApprovalId] = useState(false);
const [approvalDetails, setApprovalDetails]   = useState({})
const [approvalApiResponse, setApprovalApiResponse]   = useState('')
const merchantList = useSelector(state => state.invitationData.inviteUserList)
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
  // const selectMonthChange=(selectedOption)=>{
  //   dispatch(getInviteApiData({sort:selectedOption.value}))
  //   setSelectMonth(selectedOption)
  // }

  const approvalIdModelClose = () => {
    setIsShowApprovalId(false)
  }

  useEffect(()=>{
    setApprovalApiResponse(merchantList?.result)
   // console.log(merchantList?.result?.reverse())
  },[merchantList])

  const sendMoney =(data)=>{
    dispatch(inviteUserSendData(data))
    dispatch(getInviteApiData({}))
  }
  

  // getting list of approval data 

  const renderTableData = () => {
    return !isEmpty(approvalApiResponse) && approvalApiResponse.map((item , index) => {
     
     const {userId,name,phone,amount,countryCode,serviceProvider,profileImage} = item ; 
     item.page=isCurrentPage
     item.filter=slectAll
     
     return (
        <tr key={index}>
          <td> #{userId}</td>
         
          <td>
            <div className="sender"><span className="sender-img"><img src={profileImage} /></span>
              <span className="sender-txt">{name}</span>
            </div>
          </td>
          <td >{countryCode}-{phone}</td>
           <td >GH₵ {amount}</td>
          <td >{serviceProvider}</td>
          <td>
            
           {slectAll ==='pending' ?<input type="button" style={{width:"40%"}} class="btn btn-block green-btn" onClick={()=>{sendMoney(item)}} value="Send "/>:''}  
              {/* <a data-toggle="modal" data-target="#transModal-2" onClick={() =>{setApprovalDetails(item);  setIsShowApprovalId(!isShowApprovalId)} }  href="#"><i className="icon-icon-tick" /></a>
              <a data-toggle="modal" data-target="#transModal" onClick={() =>{setApprovalDetails(item);  setIsShowApprovalId(!isShowApprovalId)} }  className="close-btn ml-2" href="#"><i className="icon-icon-close2" /></a> */}
           
          </td>
        </tr>
        )
    })
  }
const paginationHander = (pageNumber) => {
    // console.log("----------------pageNumber",pageNumber);
    setIsCurrentPage(pageNumber);

   dispatch(getInviteApiData({}))
    
  }

  const nextPaginationHander = (pageNumber) => {
    if(isCurrentPage !== pageNumber){
    const p = isCurrentPage+1;
    setIsCurrentPage(p);

   dispatch(getInviteApiData({}))
   
    }
  }

  const previousPaginationHander = () => {
    if(isCurrentPage>1){
      const p = isCurrentPage-1;
      setIsCurrentPage(p);
     dispatch(getInviteApiData({}))
    }
  }

  const firstPaginationHander = () => {
     const p = 1;
      setIsCurrentPage(p);
      dispatch(getInviteApiData({}))
   
  }
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
      setIsCurrentPage(p);
    dispatch(getInviteApiData({}))
    
  }
useEffect(()=>{
  
  if(slectAll ==='pending'){
     dispatch(getInviteApiData({}))
  }else{
     dispatch(getInviteUserApiData({}))
  }

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
              <h2>Invitations</h2>
              <div className="table-btn">
                <div className="custom-select-wrap alt">
                  <div className="selectImage">
                     <select className="custom-select" name="state"onChange={sortDonutHander}>
                      {/* <option value="all">All</option> */}
                      <option  value="pending">Pending</option>
                      <option  value="approved">Completed</option>
                      {/* <option  value="declined">Decline</option> */}
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
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Amount</th>
                      <th>Service Provider</th>
                      {slectAll ==='pending' ?<th>Action</th>:''} 
                  
                    </tr>
             
                      {renderTableData()}
                    </tbody></table>
                </div>
              </div>
              
            </div>
             {/* <div className="site-pagination">
              { paginationList()}
            </div> */}
          </div>
        </div>
      </section>
      
    </div>
  )

}

export default Invetation;