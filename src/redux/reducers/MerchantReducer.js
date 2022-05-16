import { MERCHANTLIST,GET_MERCHANT_TRANSACTION_LIST_API_EXPORT,GET_MERCHANT_BY_FEES_API,GET_MERCHANT_BY_TRANSACTION_API,MERCHANTLISTEXPORT,GET_MERCHANT_TRANSACTION_COUNT_API,GET_MERCHANT_TRANSACTION_LIST_API,MERCHANTTYPE,GET_MERCHANT_BY_REVENUE_API,MERCHANTSUBCATEGORY,UPLOADIMAGE,ADDMERCHANT_SUCCESS,ADDMERCHANT_ERROR,GET_MERCHANT_DETAIL,MERCHANT_STATUS,MERCHANT_TYPE_LIST} from "../action/actionTypes";
const initialState = {
  merchantListSuccesData: {},
  merchanttypeData:{},
  merchantsubcategoryData:{},
  imageData:{},
  addMerchantSuccess:{},
  addMerchantError:{},
  getMerchantDetail:{},
  getMerchantStatus:{},
  getMerchantTypeData:{},
   getMerchantByRevenue:[],
   getMerchantTransactionCount:{},
   getMerchantTransactionList:{},
   getMerchantCount:{},
   getMerchantByFees:{},
   getMerchantExport:{},
   getMerchantTranactionExport:{}
   

}
const merchantData = (state = initialState, action) => {

  switch (action.type) {
    case MERCHANTLIST:
      return {
        ...state, // not value lose
        merchantListSuccesData: action.payload,
      };

    case MERCHANTTYPE:
      return {
        ...state, // not value lose
        merchanttypeData: action.payload,
      };

    case MERCHANTSUBCATEGORY:
      return {
        ...state, // not value lose
        merchantsubcategoryData: action.payload,
      };
    
    case UPLOADIMAGE:
      return {
        ...state, // not value lose
        imageData: action.payload,
      };
    
    case ADDMERCHANT_SUCCESS:
      return {
        ...state, // not value lose
        addMerchantSuccess: action.payload,
      };

    case ADDMERCHANT_ERROR:
    return {
      ...state, // not value lose
      addMerchantError: action.payload,
    };

    case GET_MERCHANT_DETAIL:
    return {
      ...state, // not value lose
      getMerchantDetail: action.payload,
    };
    case MERCHANT_STATUS:
      return {
        ...state, // not value lose
        getMerchantStatus: action.payload,
    };
    case GET_MERCHANT_BY_REVENUE_API:
      return {
        ...state, // not value lose
        getMerchantByRevenue: action.payload,
    };

    case GET_MERCHANT_TRANSACTION_COUNT_API:
      return {
        ...state, // not value lose
        getMerchantTransactionCount: action.payload,
    };

    case GET_MERCHANT_TRANSACTION_LIST_API:
      return {
        ...state, // not value lose
        getMerchantTransactionList: action.payload,
    };

    case GET_MERCHANT_BY_FEES_API:
      return {
        ...state, // not value lose
        getMerchantByFees: action.payload,
    };

    case GET_MERCHANT_BY_TRANSACTION_API:
      return {
        ...state, // not value lose
        getMerchantCount: action.payload,
    };
    case MERCHANTLISTEXPORT:
      return {
        ...state, // not value lose
        getMerchantExport: action.payload,
    };
     case GET_MERCHANT_TRANSACTION_LIST_API_EXPORT:
      return {
        ...state, // not value lose
        getMerchantTranactionExport: action.payload,
    };
   
    default:
      return state
  }
}


export default merchantData;
