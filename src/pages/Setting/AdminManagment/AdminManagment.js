import React, { useEffect,useState } from 'react'
import '../AdminManagment/AdminManagment.css'
import Header from '../../../component/Header';
import AddNewAdminModal from './AddNewAdminModal'
import EditAdminModal from './EditAdminModal'
import moment from 'moment'
import { useDispatch, useSelector, } from 'react-redux'
import { isEmpty } from 'lodash';
import {adminList,blockUnblockAdmin,deleteAdmin} from '../../../redux/action/SettingAction/SettingAction'
import {approvelsAddAPiRequest}from '../../../redux/action/Approvels/ApprovelsAction'

const AdminManagment = () => {

  const dispatch = useDispatch(); 
  const adminData = useSelector(state => state.settingData.getAdminList)
  const successMessage = useSelector(state => state.settingData.addAdminSuccussMsg)
  const adminPermission=useSelector(state => state.loginData.loginSuccesData)
  const [isAddAdmin, setIsAddAdmin] = useState(false);
  const [isEditAdmin, setIsEditAdmin] = useState(false);
  const [isEditAdminData, setIsEditAdminData] = useState('');

  useEffect(() => {
   dispatch(adminList())
   
  },[])

  const addAdminModelClose = () => {
    setIsAddAdmin(false)
  }

  const editAdminModelClose = () => {
    setIsEditAdmin(false)
  }

  const editAdminModel = (item) => {
    setIsEditAdminData(item)
    setIsEditAdmin(!isEditAdmin)
  }

  const adminStatus=(id, status)=>{

   if(status==1){
      status=0;
    }else{
      status=1;
    }
  
    const data={
      id,status
    } 
   if(adminData?.permissions){
      if(adminData.permissions[0].others.blockAdmin === 'full_access'){
         dispatch(blockUnblockAdmin(data))
      }else{
        let sendReq={
    "action": "Block Admin",
    "action_status": status,
    "comment": "",
    "details": {
        "adminId": id
    }
}
dispatch(approvelsAddAPiRequest(sendReq))
      }
   }else{
 dispatch(blockUnblockAdmin(data))
   }  
    
     
  }

  const deleteAdminById=(id)=>{
      const status =0;
      dispatch(deleteAdmin({id,status}))
  }

  const renderTableData = () => {
    return  !isEmpty(adminData) && adminData.data.map((item, index) => {

      const { id,name,email,profileImage,lastVisit,status,createdAt,role} = item 
      return (
        <tr key={index}>
          <td>#{id}</td>
          <td><div className="date">{moment(createdAt).format('LL')} <span>{moment(createdAt).format('HH:MM A')}</span></div></td>
          <td>
            <div className="">
              <span className="sender-txt">{name}</span>
            </div>
          </td>
          <td>{email}</td>
          <td>{role}</td>
          <td><div className="date">{lastVisit&& moment(lastVisit).format('LL')} <span>{lastVisit&& moment(lastVisit).format('HH:MM A')}</span></div></td>
          <td>
            <a data-toggle="modal" data-target="#addAdminModal-2" className={`action-link ${adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.editAdmin ==='view_only' ? 'disabled':''}`} onClick={() =>{ 
          if(adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.editAdmin ==='view_only'){
            return true
          }else{
editAdminModel(item)
          }
          }}    ><i className="icon-icon-edit" /></a>
            <a 
              className={`${status===1 ? "action-link" : "action-link-danger"} ${adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.blockAdmin ==='view_only' ? 'disabled':''}`}
              href="#"
            
              onClick={()=>{
              if(adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.blockAdmin ==='view_only')
              {
                return true
              }else{
adminStatus(id,status)
              }
              }}
            ><i className="icon-icon-lock" />
            </a>
            <a className="action-link" href="#" onClick={()=>deleteAdminById(id)}>
              <i className="icon-icon-delete" /></a>
          </td>
        </tr>

      )
    })
  }

  return (
    <div>
      <Header />



      <AddNewAdminModal 
        isModalOpen={isAddAdmin} 
        onClick={() => addAdminModelClose()}
      />
    {isEditAdmin &&
      <EditAdminModal 
        isModalOpen={isEditAdmin} 
        onClick={() => editAdminModelClose()} 
        data={isEditAdminData}
      />
    }

      <section className="dash-wrap">
        <div className="sec-block alt first">
          <div className="block-single auto">
            <div className="block-heading mb-3">
              <h2>Admin's management</h2>
              <div className="table-btn">
                <a data-toggle="modal" data-target="#addAdminModal" className={`link green ${adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.addAdmin ==='view_only' ? 'disabled':''}`} onClick={() => {
                  if(adminPermission.role ==='admin' &&  adminPermission.permissions[0].others.addAdmin ==='view_only')
                  {
                    return true
                  }else{
                    setIsAddAdmin(!isAddAdmin)}
                  }
                  }>Add a new admin</a>
              </div>
            </div>
            <div className="transaction-main">
              <div className="transaction-table">
                <div className="table-responsive">
                  <table className="table theme-table">
                    <tbody>
                      <tr>
                        <th>Admin ID</th>
                        <th>Date added</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Last visit</th>
                        <th style={{ width: '160px' }}>Action</th>
                      </tr>
                     
                      {renderTableData()}
                    </tbody></table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


export default AdminManagment;