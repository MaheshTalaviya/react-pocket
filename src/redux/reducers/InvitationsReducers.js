import { GET_INVITE_LIST,GET_INVITE_TRANACTION_USER_LIST } from "../action/actionTypes";
const initialState = {

  inviteUserList: {},
  inviteUserTransactionList: {},

}
const inviteUserListData = (state = initialState, action) => {
  switch (action.type) {

    case GET_INVITE_LIST:
      return {
        ...state, // not value lose
        inviteUserList: action.payload,
      };
    case GET_INVITE_TRANACTION_USER_LIST:
      return {
        ...state, // not value lose
        inviteUserList: action.payload,
      };  

    default:
      return state
  }
}




export default inviteUserListData;