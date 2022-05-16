import { USERDETAILS, USERBLOCKSTATUS,GET_USER_DETAILS,GET_USER_REACH_DEVICE_API,GET_PAYMENT_VS_REQUEST_API,GET_USER_RECENT_TRASACTION_EXPORT_API,EXPORT_USER_DATA,GET_USER_RECENT_TRASACTION_API,GET_USER_DAILY_GROWTH_API, GET_USER_TRANSACTION_COUNT_API,USERKYCMANAGMENT, USERUNBLOCKSTATUS, INDIVISUALVSBUSINESS, RECENTUSERLIST, USERSTATCOUNT, UPDATE_KYC_SUCCESS, USER_STATUS, PAYMENT_STATUS_SUCCESS, PAYMENT_STATUS_ERROR, SERVICEPROVIDER_SUCCESS, GET_RECENT_TRANSACTION,GET_ALL_TRANSACTION,GET_TRANSACTION_BY_ID,GET_PAYMENT_VS_REQUEST,GET_USER_BY_MOBILE_OPERATOR_API } from "../action/actionTypes";
const initialState = {
  userSuccesData: {},
  userBlockStatus: {},
  userUnBlockStatus: {},
  userKycManagment: {},
  individualVSBusiness: {},
  recentUser:{},
  countUserStat:{},
  kycStatusMessage:{},
  userSattus:{},
  paymentPermissionStatus:{},
  serviceProviderData:{},
  recentTransactionData:{},
  transactionData:{},
  transactionById:{},
  paymentVsRequestData:{},
  userByMobileOperators:{},
  userDailyGrowth:{},
  dashBoardPaymentVsRequest:{},
  dashBoardUserReachDevice:{},
  exportObj:{},
  userDetailsObj:{}
}

const userData = (state = initialState, action) => {

  switch (action.type) {
    case USERDETAILS:
      return {
        ...state, // not value lose
        userSuccesData: action.payload,

      };
    case USERBLOCKSTATUS:
      return {
        ...state, // not value lose
        userBlockStatus: action.payload,

      };
    case USERUNBLOCKSTATUS:
      return {
        ...state, // not value lose
        userUnBlockStatus: action.payload,

      };

    case USERKYCMANAGMENT:
      return {
        ...state, // not value lose
        userKycManagment: action.payload,

      };
    
    case INDIVISUALVSBUSINESS:
      return {
        ...state, // not value lose
        individualVSBusiness: action.payload,

      };
    
    case RECENTUSERLIST:
      return{
        ...state,
        recentUser: action.payload
      };
    
    case USERSTATCOUNT:
      return{
        ...state,
        countUserStat: action.payload
    };

    case UPDATE_KYC_SUCCESS:
      return{
        ...state,
        kycStatusMessage:action.payload
      };
    
    case USER_STATUS:
      return {
        ...state, // not value lose
        userSattus: action.payload,

    };
    case PAYMENT_STATUS_SUCCESS:
      return {
        ...state, // not value lose
        paymentPermissionStatus: action.payload,

    };
    case SERVICEPROVIDER_SUCCESS:
      return{
        ...state,
        serviceProviderData:action.payload
      };
    case GET_RECENT_TRANSACTION:
      return{
        ...state,
        recentTransactionData:action.payload
      };
    case GET_ALL_TRANSACTION:
    
    return{
      ...state,
      transactionData:action.payload
    };
    case GET_TRANSACTION_BY_ID:
      return{
        ...state,
        transactionById:action.payload
      };
    case GET_PAYMENT_VS_REQUEST:
      return{
        ...state,
        paymentVsRequestData:action.payload
      }
    case GET_USER_BY_MOBILE_OPERATOR_API:
      return{
        ...state,
        userByMobileOperators:action.payload
      }
       case GET_USER_TRANSACTION_COUNT_API:
      return{
        ...state,
        userRecentTransactionCount:action.payload
      }
      case GET_USER_RECENT_TRASACTION_API:
      return{
        ...state,
        userRecentTransactionAll:action.payload
      }
       case GET_USER_DAILY_GROWTH_API:
      return{
        ...state,
        userDailyGrowth:action.payload
      }
       case GET_PAYMENT_VS_REQUEST_API:
      return{
        ...state,
        dashBoardPaymentVsRequest:action.payload
      }
        case GET_USER_REACH_DEVICE_API:
      return{
        ...state,
        dashBoardUserReachDevice:action.payload
      }
       case EXPORT_USER_DATA:
      return{
        ...state,
        exportObj:action.payload
      }
      case GET_USER_RECENT_TRASACTION_EXPORT_API:
      return{
        ...state,
        exportTransactionObj:action.payload
      }
      case GET_USER_DETAILS:
      return{
        ...state,
        userDetailsObj:action.payload
      }

      
      
    default:
      return state
  }
}


export default userData;
