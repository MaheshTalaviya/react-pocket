import { DEFAULT_FEES_SUCCESS, 
        DEFAULT_FEES_ERROR, 
        GET_DEFAULT_FEES, 
        DEFAULT_SETTING_SUCCESS, 
        GET_SETTING_DATA, 
        GET_MANEY_PROVIDER,
        GET_COUNTRY_LIST,
        GET_CATEGORY_SUBCATEGORY_LIST,
        ADD_CATEGORY,
        ADD_SUBCATEGORY,
        UPDATE_CATEGORY_STATUS,
        UPDATE_MP_STATUS,
        ADD_MP,
        GET_ADMIN_LIST,
        ADD_ADMIN_SUCCESS,
        UPDATE_ADMIN_EMAIL,
        ERROR_UPDATE_ADMIN_EMAIL,
        EDIT_PASS_RESPONSE,
        ERROR_UPDATE_ADMIN_PASS
       
      } from "../action/actionTypes";

const initialState = {
  feesSuccessMessage: {},
  feesErrorMessage:{},
  defaultFeesData:{},
  addDefaultSettingMessage:{},
  getDefaultSettingData:{},
  getManeyProviderData:{},
  getCountryData:{},
  getCatSubcatData:{},
  AddCatSuccessMessage:{},
  AddSubCatSuccessMessage:{},
  updateCategoryStatus:{},
  updateMpStatus:{},
  addMpSuccess:{},
  getAdminList:{},
  addAdminSuccussMsg:{},
  updateAdminSuccessMgs:{},
  updateAdminErrorMgs:{},
   updatePassResponse:{},
    updatePassErr:{}
}
const settingData = (state = initialState, action) => {

  switch (action.type) {
    case DEFAULT_FEES_SUCCESS:
      return {
        ...state, 
        feesSuccessMessage: action.payload,
      };
      
    case DEFAULT_FEES_ERROR:
    return {
        ...state, 
        feesErrorMessage: action.payload,
    };

    case GET_DEFAULT_FEES:
     
    return {
        ...state, 
        defaultFeesData: action.payload,
    };

    case DEFAULT_SETTING_SUCCESS:
    return {
        ...state, 
        addDefaultSettingMessage: action.payload,
    };
    case GET_SETTING_DATA:
      return {
        ...state,
        getDefaultSettingData: action.payload,
      };
    case GET_MANEY_PROVIDER:
      
      return{
        ...state,
        getManeyProviderData:action.payload,
      };
    case GET_COUNTRY_LIST:
      return{
        ...state,
        getCountryData:action.payload
      };
    case GET_CATEGORY_SUBCATEGORY_LIST:
      return{
        ...state,
        getCatSubcatData:action.payload
      };
    case ADD_CATEGORY:
      return{
        ...state,
        AddCatSuccessMessage:action.payload
      };
    case ADD_SUBCATEGORY:
      return{
        ...state,
        AddSubCatSuccessMessage:action.payload
      };
    case UPDATE_CATEGORY_STATUS:
      return{
        ...state,
        updateCategoryStatus:action.payload
      };
    case UPDATE_MP_STATUS:
      return{
        ...state,
        updateMpStatus:action.payload
      };
    case ADD_MP:
      return{
        ...state,
        addMpSuccess:action.payload
      };
    case GET_ADMIN_LIST:
      return{
        ...state,
        getAdminList:action.payload
      };
    case ADD_ADMIN_SUCCESS:
      return{
        ...state,
        addAdminSuccussMsg:action.payload
      };
    case UPDATE_ADMIN_EMAIL:
      console.log("state ====",state);
      return{
       ...state,
        updateAdminSuccessMgs:action.payload
      };
    case ERROR_UPDATE_ADMIN_EMAIL:
      return{
        ...state,
        updateAdminErrorMgs:action.payload
      };
      case ERROR_UPDATE_ADMIN_EMAIL:
      return{
        ...state,
        updateAdminErrorMgs:action.payload
      };
      case EDIT_PASS_RESPONSE:
      return{
        ...state,
        updatePassResponse:action.payload
      };
       case ERROR_UPDATE_ADMIN_PASS:
      return{
        ...state,
        updatePassErr:action.payload
      };
   
        
    default:
      return state
  }
}


export default settingData;
