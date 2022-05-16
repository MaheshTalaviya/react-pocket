import { combineReducers } from "redux";
import loginData from "../reducers/LogInReducers"
import userData from "../reducers/UserReducers"
import merchantData from "../reducers/MerchantReducer"
import settingData from "../reducers/SettingReducer"
import transactionData from "../reducers/TransactionReducer"
import approvalData from '../reducers/ApprovelsReducers'
import invitationData from '../reducers/InvitationsReducers'
const rootReduser = combineReducers({
  loginData,
  userData,
  merchantData,
  settingData,
  transactionData,
  approvalData,
  invitationData
})

export default rootReduser;