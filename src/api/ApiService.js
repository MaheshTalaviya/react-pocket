import axios from "axios";
import { axiosObj } from "./BaseApi";



export const loginApi = (data) => {
 return axiosObj().post("auth/admin/login", data);
};


export const generateTokenApi = () => {
  return axiosObj(true).post("auth/generate_token")
    .then((response) => {
      return response
    })
    .catch(({ ...error }) => {
      return error
    })

};


export const userDetailsApi = (data) => {
 
  return axiosObj().post("user/list/all",data);
}
export const userDetailsExportApi = (data) => {
 
  return axiosObj().post("user/list/all",data);
}

export const userBlockApi = (data) => {
  return axiosObj().post("user/update/updateUserBlockStatus", data);
}


export const userUnBlockApi = (data) => {
  return axiosObj().post("user/update/updateUserBlockStatus", data);
}

export const userStatusApi = (data) => {
  return axiosObj().post("user/update/user_status", data);
}

export const userKycListApi = (page,status) => {
  return axiosObj().get("com/kyc/list?page="+page+'&status='+status);
}

export const userKycListPendingApi = () => {
  return axiosObj().get("com/kyc/list/pending");
}

export const individualVsBusinessApi =(week) => {
  return axiosObj().get("user/different/individual_vs_business?week="+week);
}

export const recentUserListApi =() => {
  return axiosObj().get("user/recent/list");
}

export const userStatCountApi =() => {
  return axiosObj().get("transaction/admin/payment_count");
}

export const merchantUserListApi =(data) => {
  return axiosObj().post("merchant/list/all",data);
}

export const merchantTypeListApi =() => {
  return axiosObj().get(`merchant/all_type`);
}

export const merchantSubCategoryListApi =(typeId) => {
  return axiosObj().get(`merchant/subcategory/${typeId}`);
}

export const merchantUploadImageApi =(data) => {
  return axiosObj().post("upload/image",data);
}

export const merchantAddApi =(data) => {
  return axiosObj().post("merchant/add",data);
}

export const getMerchantDetailApi =(id) => {
  return axiosObj().get("merchant/details/"+id);
}

export const merchantEditApi =(data) => {
  return axiosObj().post("merchant/edit",data);
}

export const updateKycStatusApi = (data) =>{
  return axiosObj().post("com/update/updateKycStatus",data);
}

export const updatePaymentPermissionApi = (data) =>{
  return axiosObj().post("user/update/payment_permission",data);
}

export const serviceProviderListApi = () =>{
  return axiosObj().get("com/service_provider/list");
}

export const defaultFeesPriceApi = (data) => {
  return axiosObj().post("setting/add_default_fees_price",data);
}

export const getDefaultFeesPriceApi = () =>{
  return axiosObj().get("setting/get_default_fees_price"); 
}
export const addDefaultSettingApi = (data) =>{
  return axiosObj().post("setting/add_default_setting",data); 
}

export const addKycTransationLimitSettingApi = (data) =>{
  return axiosObj().post("com/kyc_transaction_limit",data); 
}
export const getDefaultSettingListApi = () =>{
  return axiosObj().get("setting/get_default_setting"); 
}

export const addMobileManeyProviderApi = () =>{
  return axiosObj().post("com/service_provider/add"); 
}

export const mobileManeyProviderListApi = () =>{
  return axiosObj().get("com/service_provider/list"); 
}

export const updatMobileManeyProviderIconApi = (data) =>{
  return axiosObj().post("com/service_provider/update/icon",data); 
}

export const deleteMobileManeyProviderApi = (data) =>{
  return axiosObj().post("com/service_provider/delete",data); 
}

export const countryListApi = () =>{
  return axiosObj().get("setting/country_list"); 
}
export const getCategorySubcategoryListApi = () =>{
  return axiosObj().get("setting/categoryList"); 
}
export const addCategoryApi = (data)=>{
  return axiosObj().post("merchant/add_type",data);
}
export const editCategoryApi = (data)=>{
  return axiosObj().post("merchant/edit_type",data);
}
export const addSubCategoryApi = (data)=>{
  return axiosObj().post("merchant/add_subcategory",data);
}
export const editSubCategoryApi = (data)=>{
  return axiosObj().post("merchant/edit_subcategory",data);
}
export const updateCategoryStatusApi = (data)=>{
  return axiosObj().post("merchant/updateCategoryStatus",data);
}
export const adminListApi = ()=>{
  return axiosObj().post("admin/list/all");
}
export const addAdminApi = (data)=>{
  return axiosObj().post("admin/add",data);
}
export const editAdminApi = (data)=>{
  return axiosObj().post("admin/edit_permission",data);
}
export const blockUnblockAdminApi = (data)=>{
  return axiosObj().post("admin/update/admin_status",data);
}
export const deleteAdminApi = (id)=>{
  return axiosObj().post("admin/delete/deleteAdmin",id);
}
export const updateAdminEmailApi = (data)=>{
  return axiosObj().post("admin/update_email",data);
}
export const getRecentTransctionApi = ()=>{
  return axiosObj().get("transaction/admin/recent");
}
export const getAllTransctionApi = ()=>{
  return axiosObj().get("transaction/admin/get_all?offset=0&limit=50");
}
export const getTranasctionByIdApi = (id)=>{
  return axiosObj().get("transaction"+id);
}
export const getPaymentVsRequestApi = ()=>{
  return axiosObj().get("transaction/admin/payment_count");
}
export const getAllPageTransactionApi = (data)=>{
  return axiosObj().post("transaction/admin/get_all",data);
}
export const getAllApprovelsApi = (data)=>{
  return axiosObj().post("approvals/list",data);
}
export const getTransactionByTypeApi = (data)=>{
  return axiosObj().post("transaction/admin/transaction_by_type",data);
}
export const userByMobileOperators =(typeId) => {
  return axiosObj().get(`user/users_by_service_provider/${typeId}`);
}
export const gettransactionRecentCountApi = (data)=>{  
  return axiosObj().post("transaction/admin/user_transaction_count",data);
}
export const getAllRecetnTransactionApi = (data)=>{ 
  return axiosObj().post("transaction/admin/user_transaction_list",data);
}
export const getTrasactionDetaisApi =(typeId) => {
  return axiosObj().get(`transaction/${typeId}`);
}
export const getMerchantByRevenueApi =(typeId) => {
  return axiosObj().get(`transaction/admin/merchant_by_revenue/${typeId}`);
}
export const userDailyGrowthtApi = (data)=>{  
  return axiosObj().post("transaction/user_daily_growth",data);
}
export const paymentVsRequestApi = (data)=>{  
  return axiosObj().post("transaction/admin/payment_vs_request",data);
}
export const transactionDailyGrowthApi = (data)=>{  
  return axiosObj().post("transaction/admin_daily_growth",data);
}
export const marchantTransactionCount = (data)=>{  
  return axiosObj().post("transaction/admin/merchant_transaction_count",data);
}
export const marchantTransactionList = (data)=>{  
  return axiosObj().post("transaction/admin/merchant_transaction_list",data);
}
export const getUserReachDeviceApi =(typeId) => {
  return axiosObj().get(`auth/user_reach_by_device/${typeId}`);
}
export const marchantByFees = (typeId)=>{  
  return axiosObj().get(`transaction/admin/merchant_by_fees/${typeId}`);
}
export const merchantByTransaction = (typeId)=>{  
  return axiosObj().get(`transaction/admin/merchant_by_transaction/${typeId}`);
}
export const approvelsAddAPi = (data)=>{  
  return axiosObj().post("approvals/add",data);
}
export const passwordChangeApi = (data)=>{  
  return axiosObj().post("admin/update_password",data);
}
export const approvelPermission = (data)=>{  
  return axiosObj().post("approvals/action",data);
}
export const userDetailsApiData = (data)=>{  
  return axiosObj().get("user/details_by_id/"+data);
}
export const getInviteUserList = (data)=>{  
  return axiosObj().post("invite/completed/user/list",data);
}
export const completeTransactionInviteUser = (data)=>{  
  return axiosObj().get("invite/transaction_completed_user_list");
}
export const inviteUserSendMoney = (data)=>{  
  return axiosObj().post("invite/credit_invited_users",data);
}
