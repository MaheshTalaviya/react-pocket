import { GENERATE_TOKEN,GET_ALL_TRANSACTION_API,GET_TRASACTION_DETAILS_API_EXPORT,GET_ALL_TRANSACTION_API_EXPORT, GET_TRANSACTION_BY_TYPE_API,GET_TRASACTION_DETAILS_API,GET_TRANSACTION_DAILY_GROWTH_API } from "../actionTypes";
import { getAllPageTransactionApi,getTransactionByTypeApi,getTrasactionDetaisApi,transactionDailyGrowthApi} from "../../../api/ApiService";
import store from "../../store/store";
import { validateToken } from "../../../utils";

export const getAllPageTransactionApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    getAllPageTransactionApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_ALL_TRANSACTION_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};


export const getAllPageTransactionApiDataExport = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    getAllPageTransactionApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_ALL_TRANSACTION_API_EXPORT, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const getTransactionByTypeApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    getTransactionByTypeApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_TRANSACTION_BY_TYPE_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const getTransactionDetailsApiData = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    getTrasactionDetaisApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_TRASACTION_DETAILS_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const getTransactionDetailsApiDataExport = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    getTrasactionDetaisApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_TRASACTION_DETAILS_API_EXPORT, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};

export const getTransactionDailyGrowth = (data) => {
  
  return async (dispatch) => {
    
    const response = await validateToken();

    dispatch({ type: GENERATE_TOKEN, payload: response });
    
    transactionDailyGrowthApi(data)
      .then(response => {
        if (response && response.status && response.status === 200) {
        
          dispatch({ type: GET_TRANSACTION_DAILY_GROWTH_API, payload: response.data});
        }
      })
      .catch(({ ...error }) => {
      
        throw error;
      });

  };
};


