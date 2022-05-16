import { MERCHANTLIST,GET_MERCHANT_BY_REVENUE_API,GET_MERCHANT_TRANSACTION_LIST_API_EXPORT,MERCHANTLISTEXPORT,GET_MERCHANT_BY_FEES_API,GET_MERCHANT_BY_TRANSACTION_API,GET_MERCHANT_TRANSACTION_LIST_API,GET_MERCHANT_TRANSACTION_COUNT_API,GENERATE_TOKEN,MERCHANTTYPE,MERCHANTSUBCATEGORY,UPLOADIMAGE,ADDMERCHANT_SUCCESS,ADDMERCHANT_ERROR,GET_MERCHANT_DETAIL,MERCHANT_STATUS,MERCHANT_TYPE_LIST } from "../actionTypes";
import { merchantUserListApi,marchantByFees,merchantByTransaction,marchantTransactionList,marchantTransactionCount, merchantTypeListApi,getMerchantByRevenueApi, merchantSubCategoryListApi, merchantUploadImageApi, merchantAddApi,merchantEditApi,getMerchantDetailApi,userStatusApi,categoryTypeListApi } from "../../../api/ApiService";
import store from "../../store/store";
import { validateToken } from "../../../utils";

export const merchantUserList = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    merchantUserListApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: MERCHANTLIST, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const merchantUserListExport = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    merchantUserListApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: MERCHANTLISTEXPORT, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const merchantTypeList = () => {
  
  return async (dispatch) => {
  
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    merchantTypeListApi()
      .then(response => {
        if (response && response.status && response.status === 200) {
         
          dispatch({ type: MERCHANTTYPE, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const merchantSubCategoryList = (typeId) => {
 
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    merchantSubCategoryListApi(typeId)
      .then(response => {
    
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: MERCHANTSUBCATEGORY, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const merchantUploadImage = (data) => {
  return async (dispatch) => {
  const response =  await validateToken();
  dispatch({type: GENERATE_TOKEN, payload: response});
  merchantUploadImageApi(data)
  .then(response => {
    if (response && response.status && response.status === 200) {
       dispatch({ type: UPLOADIMAGE, payload: response.data});
    }
  }).catch(({ ...error }) => {
      
    throw error;
  });
};
}

export const merchantAdd = (data) => {
  return async (dispatch) => {
  const response =  await validateToken();
  dispatch({type: GENERATE_TOKEN, payload: response});
  merchantAddApi(data)
  .then(response => {
    if (response && response.status && response.status === 200) {
       dispatch({ type: ADDMERCHANT_SUCCESS, payload: response});
       const filter = {
        "type":[],
        "status":[]
      }
     const formData = {
        "page":1,
        "sort":"",
        "filter":filter
      }
       dispatch(merchantUserList(formData))
    }
  }).catch(({ ...error }) => {
    dispatch({ type: ADDMERCHANT_ERROR, payload: error.response});
    throw error;
  });
};
}

export const getMerchantDetailById = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    getMerchantDetailApi(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_DETAIL, payload: response.data.data});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}

export const merchantEdit = (data) => {
  
  return async (dispatch) => {
    const response =  await validateToken();
    dispatch({type: GENERATE_TOKEN, payload: response});
    merchantEditApi(data)
    .then(response => {
      if (response && response.status && response.status === 200) {
         dispatch({ type: ADDMERCHANT_SUCCESS, payload: response});
         const filter = {
          "type":[],
          "status":[]
        }
       const formData = {
          "page":1,
          "sort":"",
          "filter":filter
        }
         dispatch(merchantUserList(formData))
        // dispatch(getMerchantDetailById(data.id))
      }
    }).catch(({ ...error }) => {
      dispatch({ type: ADDMERCHANT_ERROR, payload: error.response});
      throw error;
    });
  };
}

export const activatekMerchant = data => {
  return async (dispatch) => {

    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    return userStatusApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
         dispatch({ type: MERCHANT_STATUS, payload: response.data.data });

         const filter = {
          "type":[],
          "status":[]
        }
       const formData = {
          "page":1,
          "sort":"",
          "filter":filter
        }
         dispatch(merchantUserList(formData))
        // dispatch(getMerchantDetailById(data.id))
          return true
        }
      })
      .catch(({ ...error }) => {
        throw error;
      });

  };
};


export const getMerchantByRevenueApiData = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    getMerchantByRevenueApi(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_BY_REVENUE_API, payload: response.data.result});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}
export const getMerchantTransactionCountApi = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    marchantTransactionCount(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_TRANSACTION_COUNT_API, payload: response.data.result});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}
export const getMerchantTransactionListApi = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    marchantTransactionList(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_TRANSACTION_LIST_API, payload: response.data});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}

export const getMerchantTransactionListExportApi = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    marchantTransactionList(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_TRANSACTION_LIST_API_EXPORT, payload: response.data});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}

export const getMerchantTransactionCount = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    merchantByTransaction(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_BY_TRANSACTION_API, payload: response.data});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}
export const getMerchantByFeesCount = (id) => {
  return async (dispatch) => {
    const response = await validateToken();
    marchantByFees(id)
    .then(response => {
      if (response && response.status && response.status === 200) {
        dispatch({ type: GET_MERCHANT_BY_FEES_API, payload: response.data});
     }
    }).catch(({ ...error }) => {
       throw error;
    });
  }
}

