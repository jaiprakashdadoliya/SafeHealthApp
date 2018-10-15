import { configConstants } from '../../_constants';
import { searchConstants } from './searchConstants';
/**
 * searchConstants
 *
 * @package                SafeHealth
 * @subpackage             searchConstants
 * @category               Reducers
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible for all state related to patient
 */

const defaultState = { 
                        cityResult:[],
                        loading:false,
                        specialityResult:[],
                        doctorsResult : [],
                        clinicResult : [],
                        tagResult : [],
                        servicesResult  : [],
                        specialityLoading : false,
                        cityResultFetched : false,
                     };
export function search(state = defaultState, action) {
  switch (action.type) {
    
    // Fetch Reducer's
    case searchConstants.SEARCH_CITY_FETCH_REQUEST:
      return {
        ...state,
        loading:true
      };
    case searchConstants.SEARCH_CITY_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg          : action.success, 
        cityResult          : action.result,
        loading             : false,
        cityResultFetched   : true,
      };
    case searchConstants.SEARCH_CITY_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };


    case searchConstants.SEARCH_SP_FETCH_REQUEST:
      return {
        ...state
      };
    case searchConstants.SEARCH_SP_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg                : action.success, 
        specialityResult          : action.result[0].speciality,
        doctorsResult             : action.result[0].doctors,
        clinicResult              : action.result[0].clinic,
        tagResult                 : action.result[0].tags,
        servicesResult            : action.result[0].services,
        specialityResultFetched   : true,
        cityResultFetched         : false,
      };
    case searchConstants.SEARCH_SP_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error,
        specialityResult      : [],
        doctorsResult         : [],
        clinicResult          : []
      };


    case searchConstants.SEARCH_UPDATE_STATE:
    return {
        ...state,
        cityResult              : [],
        successMsg              : false,
        errorMsg                : false,
        loading                 : false,
        specialityResultFetched : false,
        specialityResult        : [],
        doctorsResult           : [],
        clinicResult            : [],
        cityResultFetched : false,
    }
    
    case configConstants.UNAUTHENTICATE:
    return {
      ...state,
      isUserNotValid : true
    }
    default:
      return state
  }
}
