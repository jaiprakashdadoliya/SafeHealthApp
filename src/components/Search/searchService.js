import axios from "axios"; 
import { configConstants } from '../../_constants';
import { utilityHelper, history } from '../../_helpers';

/**
 * searchService
 *
 * @package                SafeHealth
 * @subpackage             searchService
 * @category               Service
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const searchService = {
    getSearchResult,
    getSearchSpecialisationResult
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch experience api
* @return                Response JSON
*/
function getSearchResult(query) {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'search/cities',
        data    : {"query":query},
        headers : { 
                'Content-Type': 'application/json' 
            }
    })
    .then(response => {
        return response;
    })
    .catch(function (response) {
            return response;
    });
}


/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch experience api
* @return                Response JSON
*/
function getSearchSpecialisationResult(city_id, search = '') {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'search/doctors/specialisation',
        data    : {"city_id":city_id,"search":search},
        headers : { 
                'Content-Type': 'application/json' 
            }
    })
    .then(response => {
        return response;
    })
    .catch(function (response) {
            return response;
    });
}


