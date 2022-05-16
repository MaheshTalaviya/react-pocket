import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, } from 'react-redux'
import {addAdmin } from '../../../redux/action/SettingAction/SettingAction'
import {approvelsAddAPiRequest}from '../../../redux/action/Approvels/ApprovelsAction'

const AddAdminModel = (props) => {

const [isFirst,setIsFirst] = useState(false)
const [successApiMsg,setSuccessApiMsg] = useState('')

const dispatch = useDispatch(); 
const successMessage = useSelector(state => state.settingData.addAdminSuccussMsg)
 const adminPermission=useSelector(state => state.loginData.loginSuccesData)
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

const addAdminHandler = (data)=>{
    
  const body={
    "name": data.name,
    "email": data.email,
    "password": data.password,
      "permissions": [
        {
            "transactions":{
                "refund": data.refund_transaction
            },
            "users":{
                "blockUser":data.blockUser,
                "preventPayment": data.preventPayment,
                "userAction": data.actionUser,
                "kyc": data.kyc
            },
            "merchants":{
                "addMerchant": data.addMerchant,
                "editMerchant":data.editMerchant,
                "merchantAction": data.actionMerchant
            },
            "others": {
                "changeEmail": data.updateEmail,
                "changePassword": data.updatePassword,
                "addAdmin":data.addAdmin,
                "editAdmin": data.editAdmin,
                "blockAdmin":data.blockAdmin
            }

        }

    ]
}

if(adminPermission?.permissions){
      if(adminPermission.permissions[0].others.blockAdmin === 'full_access'){
 dispatch(addAdmin(body));
      }else{
        var sendReq={
    "action": "Add Admin",
    "action_status": 1,
    "comment": "New admin",
    "details":body}
      }
      dispatch(approvelsAddAPiRequest(sendReq))
      props.onClick()
}else{
 dispatch(addAdmin(body));
}    
   
    setIsFirst(true)
}
return (
  <Modal
    isOpen={props.isModalOpen}
    onRequestClose={() => props.onClick()}
  >
    <div>
      <div className="modal_height" >
        <div className="modal-dialog modal-dialog-centered common-modal modal-large">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add a new admin</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}  >
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body modal_margin">
            {successApiMsg ? <p className="form-text text-center text-success">{successApiMsg}</p> : ''}

            <form onSubmit={handleSubmit(addAdminHandler)}>
              <div className>
                <div className="row modified">
                  <div className="col-sm-5">
                    <div className="form-group">
                      <label htmlFor>Admin Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control"
                        ref={register({required:true})} 
                      />
                      <span className="text-danger">{errors.name && 'required.'}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor>Email address</label>
                      <input 
                        type="text"
                        name="email" 
                        className="form-control" 
                        ref={register({required:true})}
                      />
                      <span className="text-danger">{errors.email && 'required.'}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor>Password</label>
                      <input 
                        type="password" 
                        name="password"
                        className="form-control" 
                        ref={register({required:true})}
                      />
                      <span className="text-danger">{errors.password && 'required.'}</span>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="custom-acc">
                      <div className="form-group">
                        <label htmlFor>Manage permission rights</label>
                      </div>
                      <div className="accordion" id="accordionExample">
                        <div className="card">
                          <div className="card-header">
                            <button className="btn" type="button" data-toggle="collapse" data-target="#transactions-acc" aria-expanded="true">Transactions</button>
                          </div>
                          <div id="transactions-acc" className="collapse show" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="row modified">
                                <div className="col-6">
                                  <label htmlFor>Action</label>
                                </div>
                                <div className="col-6">
                                  <label htmlFor>Access</label>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Refund</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="refund_transaction" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.delete_transaction && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Delete a transaction</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="delete_transaction" ref={register({required:true})}>
                                      <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.delete_transaction && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <button className="btn" type="button" data-toggle="collapse" data-target="#users-acc" aria-expanded="false">Users</button>
                          </div>
                          <div id="users-acc" className="collapse" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="row modified">
                                <div className="col-6">
                                  <label htmlFor>Action</label>
                                </div>
                                <div className="col-6">
                                  <label htmlFor>Access</label>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Block a user</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="blockUser" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.blockUser && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Prevent payment</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="preventPayment" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.preventPayment && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">User (Activate/Deactivate)</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="actionUser" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.deleteUser && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">KYC Management</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <select className="custom-select" name="kyc" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                    </select>
                                    <span className="text-danger">{errors.kyc && 'required.'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <button className="btn" type="button" data-toggle="collapse" data-target="#merchants-acc" aria-expanded="false">Merchants</button>
                          </div>
                          <div id="merchants-acc" className="collapse show" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="row modified">
                                <div className="col-6">
                                  <label htmlFor>Action</label>
                                </div>
                                <div className="col-6">
                                  <label htmlFor>Access</label>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Add a new merchant</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="addMerchant" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.addEditMerchant && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                 <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Edit merchant</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="editMerchant" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.addEditMerchant && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                               <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Merchant (Activate/Deactivate)</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="actionMerchant" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.addEditMerchant && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                               {/* <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Deactivate merchant</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="dactivateMerchant" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.addEditMerchant && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              {/* <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Delete merchants</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="deleteMerchant" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.deleteMerchant && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              {/* <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Create/edit ad campaigns</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="createEditCampaign" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.createEditCampaign && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Deactivate ad campaigns</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="activateDeactivateCampaign" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.activateDeactivateCampaign && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Delete ad campaigns</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="deleteCampaign" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.deleteCampaign && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Restore ad campaigns</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="restoreCampaign" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.restoreCampaign && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <button className="btn" type="button" data-toggle="collapse" data-target="#other-acc" aria-expanded="false">Other</button>
                          </div>
                          <div id="other-acc" className="collapse show" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="row modified">
                                <div className="col-6">
                                  <label htmlFor>Action</label>
                                </div>
                                <div className="col-6">
                                  <label htmlFor>Access</label>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Change email address</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="updateEmail" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.updateEmail && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Change password</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="updatePassword" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.updatePassword && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                   <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Add admin details</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="addAdmin" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.editAdmin && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Edit admin details</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="editAdmin" ref={register({required:true})}>
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.editAdmin && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row align-items-center modified mt-2">
                                <div className="col-6">
                                  <span className="admin-level">Block admin</span>
                                </div>
                                <div className="col-6">
                                  <div className="custom-select-wrap alt full with-border">
                                    <div className="selectImage">
                                      <select className="custom-select" name="blockAdmin" ref={register({required:true})} >
                                        <option value="full_access">Full Access</option>
                                        <option value="view_only">View Only</option>
                                        <option value="with_approval">With Approval</option>
                                      </select>
                                      <span className="text-danger">{errors.blockAdmin && 'required.'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-0 mt-3">
                        <button className="btn btn-block green-btn" type="submit" name="button">Add admin</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  </Modal>

);
}

export default AddAdminModel;