/**
 * patientReportsService
 *
 * @package                SafeHealth
 * @subpackage             Patient Reports
 * @category               Service
 * @DateOfCreation         4 Oct 2018
 * @ShortDescription       This is responsible for calling all api related to patient reports
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        4 Oct 2018
* @ShortDescription      This function is responsible to call patient reports api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientReportsService = {
    getReportsFilterDataService,
    getReportPatientsService
};

/**
* @DateOfCreation        4 Oct 2018
* @ShortDescription      This function is responsible to call Fetch filter required data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getReportsFilterDataService(filterData) {
    return axios({
            method  : 'POST',
            url     : configConstants.API_BASE_PATH+'doctor/reports/filter-data',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(filterData),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        4 Oct 2018
* @ShortDescription      This function is responsible to call Fetch patients data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getReportPatientsService(filterData) {
    let fileType = configConstants.EXPORT_PATIENTS_EXTENSION_TYPE_CSV;
    if(filterData.export_type != undefined && filterData.export_type == 'pdf'){
        fileType = configConstants.EXPORT_PATIENTS_EXTENSION_TYPE_PDF;
    } 

    return axios({
            method  : 'POST',
            url     : configConstants.API_BASE_PATH+'doctor/reports/get-patients',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(filterData),
        }).then(function (response) {

            if(response.data.code != undefined){
                return response;
            } else {
                if(filterData.export_type != undefined && filterData.export_type == 'csv'){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', configConstants.EXPORT_PATIENTS+utilityHelper.getFormattedTime()+fileType);
                    document.body.appendChild(link);
                    link.click();  
                } else if(filterData.export_type != undefined && filterData.export_type == 'pdf'){
                    window.open(response.data, '_blank');
                }                 
            }
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}