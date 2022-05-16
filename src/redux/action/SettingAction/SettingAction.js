import {GENERATE_TOKEN,ERROR_UPDATE_ADMIN_PASS,EDIT_PASS_RESPONSE, DEFAULT_FEES_SUCCESS,DEFAULT_FEES_ERROR, GET_DEFAULT_FEES, DEFAULT_SETTING_SUCCESS, GET_SETTING_DATA, GET_MANEY_PROVIDER, GET_COUNTRY_LIST, GET_CATEGORY_SUBCATEGORY_LIST, ADD_CATEGORY, ADD_SUBCATEGORY,UPDATE_CATEGORY_STATUS,UPDATE_MP_STATUS,ADD_MP,ADD_ADMIN_SUCCESS,ADD_ADMIN_ERROR,GET_ADMIN_LIST,UPDATE_ADMIN_EMAIL,ERROR_UPDATE_ADMIN_EMAIL } from "../actionTypes";

import { defaultFeesPriceApi,passwordChangeApi, getDefaultFeesPriceApi,addKycTransationLimitSettingApi, addDefaultSettingApi, getDefaultSettingListApi, mobileManeyProviderListApi,countryListApi,getCategorySubcategoryListApi,addCategoryApi,addSubCategoryApi,editCategoryApi,editSubCategoryApi,updateCategoryStatusApi,updatMobileManeyProviderIconApi,deleteMobileManeyProviderApi,addMobileManeyProviderApi,addAdminApi,adminListApi,editAdminApi,blockUnblockAdminApi,deleteAdminApi,updateAdminEmailApi } from "../../../api/ApiService";

import store from "../../store/store";
import { validateToken } from "../../../utils";

export const DefaultFeesPriceSave = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    defaultFeesPriceApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: DEFAULT_FEES_SUCCESS, payload: response.data});
          dispatch(getDefaultFeesPrice())
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const getDefaultFeesPrice = () => {
  
    return async (dispatch) => {
      
      const response = await validateToken();
  
      dispatch({ type: GENERATE_TOKEN, payload: response });
      
      getDefaultFeesPriceApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
          
            dispatch({ type: GET_DEFAULT_FEES, payload: response.data});
          }
        })
        .catch(({ ...error }) => {
        
          throw error;
        });
  
    };
  };

  export const addDefaultSetting = (data) => {
  
    return async (dispatch) => {
      
      const response = await validateToken();
  
      dispatch({ type: GENERATE_TOKEN, payload: response });
      
      addDefaultSettingApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
          
            dispatch({ type: DEFAULT_SETTING_SUCCESS, payload: response.data});
            dispatch(getDefaultSettingList())
          }
        })
        .catch(({ ...error }) => {
        
          throw error;
        });
  
    };
  };
   export const addTransactionKycLimitSetting = (data) => {
  
    return async (dispatch) => {
      
      const response = await validateToken();
  
      dispatch({ type: GENERATE_TOKEN, payload: response });
      
      addKycTransationLimitSettingApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
          
            dispatch({ type: DEFAULT_SETTING_SUCCESS, payload: response.data});
            dispatch(getDefaultSettingList())
          }
        })
        .catch(({ ...error }) => {
        
          throw error;
        });
  
    };
  };

  

  export const getDefaultSettingList = () => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      getDefaultSettingListApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: GET_SETTING_DATA, payload: response.data});
          }
        })
        .catch(({ ...error }) => {
        
          throw error;
        });
  
    };
  };

  export const mobileManeyProviderList = () => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      mobileManeyProviderListApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: GET_MANEY_PROVIDER, payload: response.data});
          }
        })
        .catch(({ ...error }) => {
        
          throw error;
        });
  
    };
  };

  export const countryList = () => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      countryListApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: GET_COUNTRY_LIST, payload: response.data});
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
  
    };
  };

  export const getCategorySubList = () => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      getCategorySubcategoryListApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: GET_CATEGORY_SUBCATEGORY_LIST, payload: response.data});
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
  
    };
  };

  export const addCategory = (data) => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      addCategoryApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_CATEGORY, payload: response.data});
            dispatch(getCategorySubList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
  
    };
  };

  export const editCategory = (data) => {
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      editCategoryApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_CATEGORY, payload: response.data});
            dispatch(getCategorySubList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
  
    };
  };
  
  export const addSubCategory = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      addSubCategoryApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_SUBCATEGORY, payload: response.data});
            dispatch(getCategorySubList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const editSubCategory = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      editSubCategoryApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_SUBCATEGORY, payload: response.data});
            dispatch(getCategorySubList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const updateCategoryStatus = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      updateCategoryStatusApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: UPDATE_CATEGORY_STATUS, payload: response.data});
            dispatch(getCategorySubList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const updateMpIcon = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      updatMobileManeyProviderIconApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: UPDATE_MP_STATUS, payload: response.data});
            dispatch(mobileManeyProviderList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const deleteMpById = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      deleteMobileManeyProviderApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: UPDATE_MP_STATUS, payload: response.data});
            dispatch(mobileManeyProviderList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const addMobileManeyProvider = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      addMobileManeyProviderApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_MP, payload: response.data});
            dispatch(mobileManeyProviderList())
          }
        })
        .catch(({ ...error }) => {
            throw error;
        });
    };
  };

  export const adminList = () => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      adminListApi()
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: GET_ADMIN_LIST, payload: response.data});
           
          }
        })
        .catch(({ ...error }) => {
           throw error;
        });
    };
  };

  export const addAdmin = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      addAdminApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data});
            dispatch(adminList())
          }
        })
        .catch(({ ...error }) => {
          dispatch({ type: ADD_ADMIN_ERROR, payload: error.response});
            throw error;
        });
    };
  };

  export const editAdmin = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      editAdminApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data});
            dispatch(adminList())
          }
        })
        .catch(({ ...error }) => {
          dispatch({ type: ADD_ADMIN_ERROR, payload: error.response});
            throw error;
        });
    };
  };
  
  export const blockUnblockAdmin = (data) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      blockUnblockAdminApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data});
            dispatch(adminList())
          }
        })
        .catch(({ ...error }) => {
          dispatch({ type: ADD_ADMIN_ERROR, payload: error.response});
            throw error;
        });
    };
  };

  export const deleteAdmin = (id) => {
   
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      deleteAdminApi(id)
        .then(response => {
          if (response && response.status && response.status === 200) {
            dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data});
            dispatch(adminList())
          }
        })
        .catch(({ ...error }) => {
          dispatch({ type: ADD_ADMIN_ERROR, payload: error.response});
            throw error;
        });
    };
  };

  export const updateAdminEmail = (data) => {
  
    return async (dispatch) => {
      const response = await validateToken();
      dispatch({ type: GENERATE_TOKEN, payload: response });
      updateAdminEmailApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            console.log("response.data===",response.data);
            dispatch({ type: UPDATE_ADMIN_EMAIL, payload: response.data});
            
          } 
        })
        .catch(({ ...error }) => {
          dispatch({ type: ERROR_UPDATE_ADMIN_EMAIL, payload: error});
           throw error; 
        });
    };
  };

  export const updateAdminPassword = (data) => {
  
    return async (dispatch) => {
      const response = await validateToken();
     
      dispatch({ type: GENERATE_TOKEN, payload: response });
      passwordChangeApi(data)
        .then(response => {
          if (response && response.status && response.status === 200) {
            // console.log("response.data===",response.data);
             dispatch({ type: EDIT_PASS_RESPONSE, payload: response.data});
            
          } 
        })
        .catch(({ ...error }) => {
         dispatch({ type: ERROR_UPDATE_ADMIN_PASS, payload: error});
           throw error; 
        });
    };
  };
  
  
  