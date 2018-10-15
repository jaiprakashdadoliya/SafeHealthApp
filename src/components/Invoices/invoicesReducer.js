import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import { invoicesConstants } from './invoicesConstants';

/**
 *Payments History Reducer
 *
 * @package                RxHealth
 * @subpackage             Payments History Reducer
 * @category               Reducers
 * @DateOfCreation         03 Sept 2018
 * @ShortDescription       This is responsible for all state related to Payment history
 */

//Initial State on load state and initial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    invoicesHistory             : [],
    isPaymentHistoryFetched: false,
};

export function invoices(state = initialState, action) {
    switch (action.type) {
        case invoicesConstants.INVOICE_HISTORY_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case invoicesConstants.INVOICE_HISTORY_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case invoicesConstants.INVOICE_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                isPaymentHistoryFetched : true,
                invoicesHistory          : action.result.result
            };

        case invoicesConstants.INVOICE_HISTORY_RESET_STATE:
            return {
                ...state,
                submitted                   : false,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
                invoicesHistory      : [],
                isPaymentHistoryFetched: false,
            };
        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid : true,
                errorMsg       : false
            };
        default:
            return state
    }
}