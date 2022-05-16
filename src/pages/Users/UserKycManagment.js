import React, { useState, useEffect } from 'react'
import user1 from './../../assets/images/user-2.jpg'
import ApprovalId from "./KycApprovalIdModal";
import Header from '../../component/Header';
import { userKycManagmentData } from '../../redux/action/UserAction/UserAction'
import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty } from 'lodash';
import moment from 'moment'
const UsersKyc = () => {

  const [isShowApprovalId, setIsShowApprovalId] = useState(false);
  const [isUserData, setIsUserData] = useState(false);
  const [isCurrentPage,setIsCurrentPage] = useState(1)
  const [isSort, setIsSort] = useState('pending');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userKycManagment)
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)


  const  sortHander = (e) => {
    
      setIsSort(e.currentTarget.value);
    dispatch(userKycManagmentData(1,e.currentTarget.value))
  }
  useEffect(() => {
    dispatch(userKycManagmentData(isCurrentPage,isSort))
  }, [])

  const userApprovalModelClose = () => {
    setIsShowApprovalId(false)
  }

  const showUserApprovalModel = (item) => {
    if(adminPermission.role ==='admin' &&  adminPermission.permissions[0].users.kyc ==='view_only' ){
      return true
    }else{
setIsShowApprovalId(true)
    setIsUserData(item)
    }
    
  }

  const paginationHander = (pageNumber) => {
    setIsCurrentPage(pageNumber);
    dispatch(userKycManagmentData(pageNumber,isSort))
  }

  const nextPaginationHander = (pageNumber) => {
    if(isCurrentPage !== pageNumber){
    const p = isCurrentPage+1;
    setIsCurrentPage(p);
    dispatch(userKycManagmentData(p,isSort))
    }
  }

  const previousPaginationHander = () => {
    if(isCurrentPage>1){
      const p = isCurrentPage-1;
      setIsCurrentPage(p);
      dispatch(userKycManagmentData(p,isSort))
    }
  }

  const firstPaginationHander = () => {
     const p = 1;
      setIsCurrentPage(p);
      dispatch(userKycManagmentData(p,isSort))
   
  }
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
      setIsCurrentPage(p);
      dispatch(userKycManagmentData(p,isSort))
    
  }

  const paginationList =()=>{

    // const pageNumbers=[]; 
    // for(var i=1; i <= userData.totalPage; i++){
    //   pageNumbers.push(i)
    // }

    // const renderPageNumbers = pageNumbers.map(number => {
    //   return (
    //     <li key={number} onClick={(i)=>paginationHander(number)}>
    //     <a className={userData.currentPage==number ? "active" : '' }>{number}
    //     </a>
    //     </li>
    //   );
    // });
     const pageNumbers=[]; 
    for(var i=1; i <= userData?.totalPage; i++){
      pageNumbers.push(i)
    }
   
    const renderPageNumbers = pageNumbers.map(number => {
      if ( number === parseInt(userData?.currentPage) - 2 || number === parseInt(userData?.currentPage) + 2) {
        return <span>...</span>
      } else if (number < 2 || number === pageNumbers.length || parseInt(userData?.currentPage)===number || parseInt(userData?.currentPage)===number - 1 || parseInt(userData?.currentPage)===number + 1) {
        return (
        <li key={number} onClick={(i)=>paginationHander(number)}>
        <a className={parseInt(userData?.currentPage)==number ? "active" : '' }>{number}
        </a>
        </li>
      );
      }
      
    });
    return <ul>
        <li><a className="nxt" onClick={()=>firstPaginationHander()} ><i className="fa fa-angle-double-left" aria-hidden="true" /></a></li>
        <li><a className="nxt" onClick={()=>previousPaginationHander()}><i className="fa fa-angle-left" aria-hidden="true" /></a></li>
         {renderPageNumbers}
        <li><a className="nxt" onClick={()=>nextPaginationHander(userData.totalPage)}><i className="fa fa-angle-right" aria-hidden="true" /></a></li>
        <li><a className="nxt" onClick={()=>lastPaginationHander(userData.totalPage)} ><i className="fa fa-angle-double-right" aria-hidden="true" /></a></li>
      </ul> 
              
  }

  const renderTableData = () => {
    // let status = {
    //   'pending': 2,
    //   'approved': 1,
    //   'declined': 3
    // };
    // if(!isEmpty(userData)){
    //   userData.data.sort((a, b) => status[a.status] - status[b.status]);
    // }
   

   return !isEmpty(userData) && !isEmpty(userData) && userData.data.map((item, index) => {

      const { uploadedDocumentUrl, approvalId, comment, reason, idType, idNumber, name, profileImage,  useremail, submittedDate, userId,status } = item //destructuring
      const time = moment(submittedDate).format('LT')
      const date = moment(submittedDate).format("MMM D YYYY")
     
      return (
        <tr>

          <td >#{approvalId}</td>
          <td><div className="date" >{date} <span>{time}</span></div></td>
          <td>
            <div className="sender">
              <span className="sender-img" ><img src={profileImage ? profileImage : user1} alt="" /></span>
              <span className="sender-txt" >{name} <br /> <small>#{userId}</small></span>
            </div>
          </td>
          <td >{idType}</td>
          <td >{idNumber}</td>
          <td>{status}</td>
          <td>{reason}</td>
          
          <td>
            
              {/* {adminPermission.role ==='admin' &&  adminPermission.permissions[0].users.kyc !=='view_only' ? '':<span className="act-btn"><a data-toggle="modal" data-target="#transModal" onClick={() => showUserApprovalModel(item)} href="#"><i className="icon-icon-tick" /></a>
              <a data-toggle="modal" data-target="#transModal-2" onClick={() => showUserApprovalModel(item)} className="close-btn ml-2" href="#"><i className="icon-icon-close2" /></a></span> } */}
             <span className="act-btn " > <a className={adminPermission.role ==='admin' &&  adminPermission.permissions[0].users.kyc ==='view_only' ? 'disabled':''} onClick={() => showUserApprovalModel(item)} href="#"><i className="icon-icon-tick" /></a>
              <a  className={`close-btn ml-2 ${adminPermission.role ==='admin' &&  adminPermission.permissions[0].users.kyc ==='view_only' ? 'disabled':''}`} href="#" onClick={() => showUserApprovalModel(item)}><i className="icon-icon-close2" /></a></span>
            
          </td>
        </tr>

      )
    })
  }
  return (
    <div>
      <Header />


      <ApprovalId isModalOpen={isShowApprovalId} onClick={() => userApprovalModelClose()} slectFilter={isSort} isCurrentPage={isCurrentPage}isUserData={isUserData} />
      <section className="dash-wrap">
        <div className="sec-block alt first">
          <div className="block-single auto">
            <div className="block-heading" style={{display:"flex",margin:"0px",justifyContent:"space-between"}}>
              <h2>KYC Management</h2>
               <div className="alt " style={{minWidth:"125px",display:"inline-block",position:"relative"}}>
                  <div className="selectImage">
                   <select className="custom-select" name="state" onChange={(e)=>sortHander(e)}>
                      {/* <option value="">All</option> */}
                      <option select value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="declined">Declined</option>
                     
                    </select>
                  </div>
                </div>
            </div>
            
            <div className="transaction-main">
              <div className="transaction-table">
                <div className="table-responsive">
                  <table className="table theme-table">
                    <tbody><tr>

                      <th>Approval ID</th>
                      <th>Date submitted</th>
                      <th>User</th>
                      <th>ID Type</th>
                      <th>ID Number</th>
                      <th>Status</th>
                      <th>Comment</th>
                      <th style={{ width: '140px' }}>Action</th>
                    </tr>
                      {renderTableData()}
                    
                    </tbody></table>
                </div>
              </div>
            </div>
            <div className="site-pagination">
            {paginationList()}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default UsersKyc;
