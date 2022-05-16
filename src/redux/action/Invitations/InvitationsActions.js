import { GENERATE_TOKEN,GET_INVITE_LIST ,GET_INVITE_TRANACTION_USER_LIST} from "../actionTypes";
import {getInviteUserList,completeTransactionInviteUser,inviteUserSendMoney} from "../../../api/ApiService";
import store from "../../store/store";
import { validateToken } from "../../../utils";
import {  toast } from 'react-toastify';
export const getInviteApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      getInviteUserList(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_INVITE_LIST, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};
export const getInviteUserApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      completeTransactionInviteUser(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_INVITE_TRANACTION_USER_LIST, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};
export const inviteUserSendData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      inviteUserSendMoney(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        toast.warning(response?.data?.message)
         // dispatch({ type: GET_INVITE_TRANACTION_USER_LIST, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};