import {GET_ALL_TRANSACTION_API,GET_TRASACTION_DETAILS_API_EXPORT,GET_TRASACTION_DETAILS_API_EXPORT_CLEAR,GET_TRANSACTION_BY_TYPE_API,GET_TRASACTION_DETAILS_API,GET_TRANSACTION_DAILY_GROWTH_API,GET_ALL_TRANSACTION_API_EXPORT } from "../action/actionTypes";
const initialState = {
  transactionApiData:{},
  tranactionApiExport:{},tranactionApiDatailExport:{}
}
const transactionData = (state = initialState, action) => {

  switch (action.type) {
    case GET_ALL_TRANSACTION_API:
      return {
        ...state, // not value lose
        userSuccesData: action.payload,

      };
      case GET_TRANSACTION_BY_TYPE_API:
      return {
        ...state, // not value lose
        transactionByTpe: action.payload,

      };
       case GET_TRASACTION_DETAILS_API:
      return {
        ...state, // not value lose
        transactionDetails: action.payload,

      };

       case GET_TRANSACTION_DAILY_GROWTH_API:
      return {
        ...state, // not value lose
        tranactionDailyGrowth: action.payload,

      };
       case GET_ALL_TRANSACTION_API_EXPORT:
      return {
        ...state, // not value lose
        tranactionApiExport: action.payload,

      };
       case GET_TRASACTION_DETAILS_API_EXPORT:
      return {
        ...state, // not value lose
        tranactionApiDatailExport: action.payload,

      };
       case GET_TRASACTION_DETAILS_API_EXPORT_CLEAR:
      return {
        ...state, // not value lose
        tranactionApiDatailExport: action.payload,

      };
      
    
    default:
      return state
  }
}

export default transactionData;
