import { 
    USERDETAILS,
    USERBLOCKSTATUS, 
    USERKYCMANAGMENT, 
    GENERATE_TOKEN, 
    USERUNBLOCKSTATUS, 
    INDIVISUALVSBUSINESS, 
    RECENTUSERLIST, 
    USERSTATCOUNT, 
    UPDATE_KYC_SUCCESS,
    USER_STATUS,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_ERROR,
    GET_USER_DAILY_GROWTH_API,
    SERVICEPROVIDER_SUCCESS,
    GET_RECENT_TRANSACTION,
    GET_ALL_TRANSACTION,
    GET_TRANSACTION_BY_ID,
    GET_PAYMENT_VS_REQUEST,
    GET_PAYMENT_VS_REQUEST_API,
    GET_USER_DETAILS,
    GET_USER_BY_MOBILE_OPERATOR_API,GET_USER_RECENT_TRASACTION_EXPORT_API,GET_USER_TRANSACTION_COUNT_API,GET_USER_RECENT_TRASACTION_API,GET_USER_REACH_DEVICE_API,EXPORT_USER_DATA
  } from "../actionTypes";

import { userDetailsApi,userDetailsApiData,userDailyGrowthtApi,userDetailsExportApi,getUserReachDeviceApi,paymentVsRequestApi, getAllRecetnTransactionApi,userBlockApi, userKycListApi, userUnBlockApi, gettransactionRecentCountApi,individualVsBusinessApi, recentUserListApi, userStatCountApi, updateKycStatusApi,userStatusApi,updatePaymentPermissionApi,serviceProviderListApi,getRecentTransctionApi,getAllTransctionApi,getTranasctionByIdApi,getPaymentVsRequestApi,userByMobileOperators } from "../../../api/ApiService";

import store from "../../store/store";
import { validateToken } from "../../../utils";

export const addUserData = (data) => {

  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    userDetailsApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
       
          dispatch({ type: USERDETAILS, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
        // dispatch({ type: USERDETAILS, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });

  };
};
export const exportUserData = (data) => {

  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    userDetailsExportApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
       
          dispatch({ type: EXPORT_USER_DATA, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
        // dispatch({ type: USERDETAILS, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });

  };
};


export const blockUser = data => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    return userBlockApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
          // console.log("respon12", response.data.data)

          dispatch({ type: USER_STATUS, payload: response.data.data });
          const filter = {
            "account_type":[],
            "service_provider": [],
            "status":[]
          }
          const formData = {
            "page":1,
            "sort":"",
            "filter":filter
          }
          dispatch(addUserData(formData));
          return true
        }
      })
      .catch(({ ...error }) => {
        // dispatch({ type: USERBLOCKSTATUS, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });

  };
};


export const unBlockUserStatus = data => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    userUnBlockApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
          // console.log("respon12", response.data.data)
          dispatch({ type: USERUNBLOCKSTATUS, payload: response.data.data });
        }
      })
      .catch(({ ...error }) => {
        // dispatch({ type: USERBLOCKSTATUS, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });

  };
};

export const activatekUser = data => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    return userStatusApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
          // console.log("respon12", response.data.data)

          dispatch({ type: USERBLOCKSTATUS, payload: response.data.data });
          const filter = {
            "account_type":[],
            "service_provider": [],
            "status":[]
          }
          const formData = {
            "page":1,
            "sort":"",
            "filter":filter
          }
          dispatch(addUserData(formData));
          return true
        }
      })
      .catch(({ ...error }) => {
        // dispatch({ type: USERBLOCKSTATUS, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });

  };
};

export const userKycManagmentData = (page,status) => {

  return async (dispatch) => {

    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });

    userKycListApi(page,status)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: USERKYCMANAGMENT, payload: response.data });
        }
      })
      .catch(({ ...error }) => {

        throw error;
      });
  };
};

export const individualVSBusinessList = (week) => {

  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    individualVsBusinessApi(week)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {
          // console.log("respon12", response.data)
          dispatch({ type: INDIVISUALVSBUSINESS, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};

export const recentUserList = () => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    recentUserListApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: RECENTUSERLIST, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};

export const userStatCount = () => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    userStatCountApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: USERSTATCOUNT, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};


export const updateKycStatus = (data) => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    updateKycStatusApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: UPDATE_KYC_SUCCESS, payload: response.data});
         
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};

export const paymentPermissionStatus = (data) => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    updatePaymentPermissionApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: PAYMENT_STATUS_SUCCESS, payload: response.data});
          
          const filter = {
            "account_type":[],
            "service_provider": [],
            "status":[]
          }
          const formData = {
            "page":1,
            "sort":"",
            "filter":filter
          }
          dispatch(addUserData(formData));
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};

export const serviceProviderList = () => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });

    serviceProviderListApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: SERVICEPROVIDER_SUCCESS, payload: response.data});
          
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};

export const getRecentTransactionList = () => {
  
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getRecentTransctionApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
          dispatch({ type: GET_RECENT_TRANSACTION, payload: response.data});
          
        } 
      })
      .catch(({ ...error }) => {
       
         throw error; 
      });
  };
};

export const getAllTransactionList = () => {
  
  return async (dispatch) => {
    
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getAllTransctionApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
          dispatch({ type: GET_ALL_TRANSACTION, payload: response.data});
          
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getTransactionById = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getTranasctionByIdApi(id)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_TRANSACTION_BY_ID, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getPaymentVsRequest = () => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getPaymentVsRequestApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_PAYMENT_VS_REQUEST, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};


export const getUserByMobileOperators = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    userByMobileOperators(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_BY_MOBILE_OPERATOR_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getRecentTransactionCount = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    gettransactionRecentCountApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_TRANSACTION_COUNT_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};
export const getRecentTransactionAll = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getAllRecetnTransactionApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_RECENT_TRASACTION_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getRecentTransactionExportAll = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getAllRecetnTransactionApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_RECENT_TRASACTION_EXPORT_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};
export const getUserDailyGrowthAll = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    userDailyGrowthtApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_DAILY_GROWTH_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getDashboardPaymentVsRequestApi = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    paymentVsRequestApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_PAYMENT_VS_REQUEST_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getDashboarduserReachDeviceApi = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    getUserReachDeviceApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_REACH_DEVICE_API, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};

export const getUserDetailsApi = (data) => {
  return async (dispatch) => {
    const response = await validateToken();
    dispatch({ type: GENERATE_TOKEN, payload: response });
    userDetailsApiData(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
           dispatch({ type: GET_USER_DETAILS, payload: response.data});
        } 
      })
      .catch(({ ...error }) => {
        throw error; 
      });
  };
};







