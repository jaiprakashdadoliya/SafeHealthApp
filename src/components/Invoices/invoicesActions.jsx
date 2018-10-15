import { configConstants } from '../../_constants';
import { invoicesConstants } from './invoicesConstants';
import { invoicesService } from './invoicesService';
import { utilityHelper } from '../../_helpers';

/**
 * invoicesActions
 *
 * @package                RxHealth
 * @subpackage             invoicesActions
 * @category               Actions
 * @DateOfCreation         03 Sept 2018
 * @ShortDescription       This is responsible for all invoice & invoice Actions
 */ 
export const invoicesActions = {
    getInvoiceHistory,
    resetState
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible for get invoice history
* @return                JSON Object
*/
function getInvoiceHistory(postData) {
    return dispatch => {
        dispatch(request());
        invoicesService.getInvoicesHistory(postData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                       dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: invoicesConstants.INVOICE_HISTORY_DATA_REQUEST } }
    function success(result) { return { type: invoicesConstants.INVOICE_HISTORY_DATA_SUCCESS, result} }
    function failure(error) { return { type: invoicesConstants.INVOICE_HISTORY_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: invoicesConstants.INVOICE_HISTORY_RESET_STATE} 
    }
}