import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
 * headerHelper
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             headerHelper
 * @category               Helper
 * @DateOfCreation         25 June 2018
 * @ShortDescription       This is responsible for exporting all send api header functions
 */

export const headerHelper = {
    getHeaderWithOutAuthorization,
    getHeaderWithAuthorization,
    getJsonDataToFormData,
    appendUserDataInJson
};

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to header set authorization data
* @param                 JSON jsonObj
* @param                 FORMDATA formDataObj
* @return                FORMDATA OBJ
*/
function getHeaderWithOutAuthorization(contentType) {
    let headers = {};
    headers['Content-Type'] = typeof contentType !== 'undefined' && contentType !== '' ? contentType : 'application/json';
    return headers;
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to header set content type with authorization
* @param                 JSON jsonObj contains error object
* @return                String
*/
function getHeaderWithAuthorization(contentType){
    let headers = {};
    let loginAccessToken = utilityHelper.getLoginAccessToken();
    headers['Authorization'] = 'Bearer ' + loginAccessToken;
    headers['Content-Type'] = typeof contentType !== 'undefined' && contentType !== '' ? contentType : 'application/json';
    return headers;
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to convert json data to formdata 
* @param                 JSON jsonObj
* @return                Boolean
*/
function getJsonDataToFormData(stateData){
    let bodyFormData = new FormData();
    bodyFormData.append('resource_type', configConstants.RESOURCE_TYPE);
    bodyFormData = utilityHelper.jsonToFormData(stateData, bodyFormData);
    return bodyFormData;
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to convert json data to formdata 
* @param                 JSON jsonObj
* @return                Boolean
*/
function appendUserDataInJson(content){ 
    if(content === undefined){
        content = {};
    }
    content['resource_type'] = configConstants.RESOURCE_TYPE;
    content['user_id']       = utilityHelper.getUserInfo().user_id;
    content['user_type']     = utilityHelper.getUserInfo().user_type;
    return content;
}


