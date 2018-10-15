import { configConstants } from '../../_constants';
import { paymentsConstants } from './paymentsConstants';
import { paymentsService } from './paymentsService';
import { utilityHelper } from '../../_helpers';

/**
 * paymentsActions
 *
 * @package                RxHealth
 * @subpackage             paymentsActions
 * @category               Actions
 * @DateOfCreation         03 Sept 2018
 * @ShortDescription       This is responsible for all payment & invoice Actions
 */ 
export const paymentsActions = {
    getPaymentHistory,
    resetState
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible for get payment history
* @return                JSON Object
*/
function getPaymentHistory(postData) {
    return dispatch => {
        dispatch(request());
        paymentsService.getPaymentsHistory(postData)
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
    function request() { return { type: paymentsConstants.PAYMENT_HISTORY_DATA_REQUEST } }
    function success(result) { return { type: paymentsConstants.PAYMENT_HISTORY_DATA_SUCCESS, result} }
    function failure(error) { return { type: paymentsConstants.PAYMENT_HISTORY_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: paymentsConstants.PAYMENT_HISTORY_RESET_STATE} 
    }
}