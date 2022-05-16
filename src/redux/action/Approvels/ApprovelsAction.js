import { GENERATE_TOKEN,GET_ALL_APPROVELS_API } from "../actionTypes";
import { getAllApprovelsApi,approvelsAddAPi,approvelPermission} from "../../../api/ApiService";
import store from "../../store/store";
import { validateToken } from "../../../utils";
import {  toast } from 'react-toastify';
  
//import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export const getAllApprovelsApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      getAllApprovelsApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_ALL_APPROVELS_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const approvelsAddAPiRequest = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      approvelsAddAPi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
         if(response?.data?.label==='success'){
              toast.success(response?.data?.message)
                      }else{
              toast.error(response?.data?.message)
          }
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};
export const approvelsPermission = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
      approvelPermission(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          //dispatch({ type: GET_ALL_APPROVELS_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};