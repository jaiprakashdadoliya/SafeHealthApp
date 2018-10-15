import { Cookies } from 'react-cookie';
import { configConstants } from '../_constants';
import { sessionService } from '../_packages/redux-react-session';
/**
 * utilityHelper
 *
 * @package                SafeHealth
 * @subpackage             utilityHelper
 * @category               Helper
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for exporting all utility functions
 */

export const utilityHelper = {
    jsonToFormData,
    getFirstErrorMessage,
    getSecondErrorMessage,
    isObjectEmpty,
    getLoginAccessToken,
    getUserInfo,
    doLogout,
    setUpdatedProfile,
    setUpdatedProfileImage,
    setUserAndLoginToken,
    getMonths,
    getYears,
    getCountry,
    getStates,
    getCities,
    getSpecialisation,
    getPatientSymptomsOption,
    getPatientSymptomsOptionTags,
    getGenders,
    getStaffRoles,
    getGender,
    calculateAge,
    getTime,
    changeTimingFormat,
    getArrayDifference,
    getStaticDataConfig,
    getDataConvertToOptionType,
    catchServiceErrorHandel,
    arrayValueToObjectKey,
    getObjectValue,
    mergeMultipleObject,
    dateShowValidation,
    inArray,
    calCulateDivideData,
    getShiftArray,
    getMultiDimensionArrayIndex,
    getWeekdayName,
    getWeekdays,
    getPatientTitle,
    splitDiv,
    changeDateFormat,
    getAppointmentReasons,
    getBookingStatus,
    getMedicineOption,
    calCulateBMI,
    getPatientDiagnosisOption,
    getPatientDiagnosisOptionTags,
    visitAppointmentTimeListingOption,
    getAppointmentReasons1,
    getPatientsPerSlot,
    getSlotDurations,
    dateDataConvert,
    getMedicationTemplate,
    getObjectKeyByValue,
    getReportPeriods,
    getFilters,
    setPatientProfileImage,
    getSystemicAuscultationTable,
    getMedicineDurationUnit,
    getMedicineMealOpt,
    getLabTestOption,
    getTodayDate,
    getFormattedTime
};

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to convert json to formdata 
 * @param                 JSON jsonObj
 * @param                 FORMDATA formDataObj
 * @return                FORMDATA OBJ
 */
function jsonToFormData(jsonObj, formDataObj) {
    for ( var key in jsonObj ) {
        formDataObj.append(key, jsonObj[key]);
    }
    return formDataObj;
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to get first error from response 
 * @param                 JSON jsonObj contains error object
 * @return                String
 */
function getFirstErrorMessage(jsonObj){
    var key = Object.keys(jsonObj)[0];
    var value = jsonObj[key][0];
    return value;
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to get first error from response 
 * @param                 JSON jsonObj contains error object
 * @return                String
 */
function getSecondErrorMessage(jsonObj){
    var key = Object.keys(jsonObj)[0];
    var value = jsonObj[key][1];
    return value;
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to check is object empty 
 * @param                 JSON jsonObj
 * @return                Boolean
 */
function isObjectEmpty(JSONObj){
    if(Object.keys(JSONObj).length === 0){
        return true;
    }else{
        return false;
    }
}

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      This function is responsible set the login access token
                         and user info to cookies
 * @return                String
 */
function setUserAndLoginToken(accessToken, user) {
    const cookies = new Cookies();
    cookies.set(configConstants.LOGIN_TOKEN, accessToken);
    cookies.set(configConstants.USER_INFO, user);
    return true;
}

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      This function is responsible set the updated profile
                         and user info to cookies
 * @return                String
 */
function setUpdatedProfile(user) {
    const cookies = new Cookies();
    cookies.set(configConstants.USER_INFO, user);
    return true;
}

/**
 * @DateOfCreation        18 May 2018
 * @ShortDescription      This function is responsible get the login access token
                         from cookies
 * @return                String
 */
function getLoginAccessToken(){
    const cookies = new Cookies();
    return cookies.get(configConstants.LOGIN_TOKEN);
}

/**
 * @DateOfCreation        18 May 2018
 * @ShortDescription      This function is responsible to get user info from Cookies
 * @return                json object
 */
function getUserInfo(){
    const cookies = new Cookies();
    return cookies.get(configConstants.USER_INFO);
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      This function is responsible remove all cookies
 * @return                Boolean
 */
function doLogout(){
   sessionService.deleteSession();
   sessionService.deleteUser();
   return true;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of years
 * @return                json
 */
function getYears(){
    var years = [];
    for (var i = configConstants.START_YEAR; i <= configConstants.END_YEAR; i++) {
        years.push({
            value: String(i),
            label: i
        });
    }
    return years;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of months
 * @return                json
 */
function getMonths(){
    var months = [];
    var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = configConstants.START_MONTH; i <= configConstants.END_MONTH; i++) {
        months.push({
            value: String(i),
            label: monthNameList[i-1]
        });
    }
    return months;
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible make the JSON of from master spesialisation data
 * @return                json
 */
function getSpecialisation(result){
    var specialisation = [];
    for (var i = 0; i <= result.length - 1 ; i++) {
        specialisation.push({
            value: result[i].spl_id,
            label: result[i].spl_name
        });
    }
    return specialisation;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of states
 * @return                json
 */
function getDataConvertToOptionType(data,name,id){
    var dataArray = [];
    var count = 0;
    for(var row in data) {
        dataArray.push({
            value: String(data[row][id]),
            label: data[row][name]
        });
    }
    return dataArray;
}

function getCountry(country){
    var d = getDataConvertToOptionType(country,'country_name','country_id');
    return d;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of states
 * @return                json
 */
function getStates(states){
    var d = getDataConvertToOptionType(states,'name','id');
    return d;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getCities(cities){
    var d = getDataConvertToOptionType(cities,'name','id');
    return d;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getPatientSymptomsOption(patientSymptomsOptionData){
    var symptomsOptionArray = [];
    var count = 0;
    for(var symptomsOption in patientSymptomsOptionData) {
         symptomsOptionArray.push({
            value: String(patientSymptomsOptionData[symptomsOption].symptom_id),
            label: patientSymptomsOptionData[symptomsOption].symptom_name
        });
    }
    return symptomsOptionArray;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getPatientSymptomsOptionTags(patientSymptomsOptionData){
    var symptomsOptionArray = [];
    var count = 0;
    for(var symptomsOption in patientSymptomsOptionData) {
         symptomsOptionArray.push({
            id: String(patientSymptomsOptionData[symptomsOption].symptom_id),
            text: patientSymptomsOptionData[symptomsOption].symptom_name
        });
    }
    return symptomsOptionArray;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getPatientDiagnosisOption(patientDiseaseOptionData){
    var diseaseOptionArray = [];
    var count = 0;
    for(var diseaseOption in patientDiseaseOptionData) {
         diseaseOptionArray.push({
            value: String(patientDiseaseOptionData[diseaseOption].disease_id),
            label: patientDiseaseOptionData[diseaseOption].disease_name
        });
    }
    return diseaseOptionArray;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getPatientDiagnosisOptionTags(patientDiseaseOptionData){
    var diseaseOptionArray = [];
    var count = 0;
    for(var diseaseOption in patientDiseaseOptionData) {
         diseaseOptionArray.push({
            id: String(patientDiseaseOptionData[diseaseOption].disease_id),
            text: patientDiseaseOptionData[diseaseOption].disease_name
        });
    }
    return diseaseOptionArray;
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This function is responsible make the JSON of cities
 * @return                json
 */
function getLabTestOption(patientLabTestOptionData){
    var labTestOptionArray = [];
    var count = 0;
    for(var labTestOption in patientLabTestOptionData) {
         labTestOptionArray.push({
            id: String(patientLabTestOptionData[labTestOption].lab_test_relation_id),
            text: patientLabTestOptionData[labTestOption].mlt_name
        });
    }
    return labTestOptionArray;
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible make the JSON of Genders
* @return                json
*/
function getGenders(genderId = null){
    var genders = [
                    { value : '1', label : 'Male' },
                    { value : '2', label : 'Female' }, 
                    { value : '3', label : 'Transgender' }
                ];

    if(genderId){
        var id = parseInt(genderId);
        switch(id) {
            case 1:
                return genders[id-1].label;
            case 2:
                return genders[id-1].label;
            case 3:
                return genders[id-1].label;
                break;
        }
    }
    return genders;
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible make the JSON of Staff Roles
* @return                json
*/
function getStaffRoles(roleId = null){
    var staffRoles = [
                    { value : '5', label : 'Nurse' },
                    { value : '6', label : 'Ward Boy' },
                    { value : '7', label : 'Assistant' },
                    { value : '8', label : 'Receptionist' }
                ];
    if(roleId){
        var id = parseInt(roleId);
        switch(id) {
            case 5:
                return staffRoles[id-5].label;
            case 6:
                return staffRoles[id-5].label;
            case 7:
                return staffRoles[id-5].label;
            case 8:
                return staffRoles[id-5].label;
                break;
        }
    }
    return staffRoles;
}

/**
 * @DateOfCreation        20 June 2018
 * @ShortDescription      This function is responsible convert gender int to gender string data
 * @return                String Gender
 */
function getGender(genderId){
    switch(genderId) {
        case 1:
            var gender = "Male";
            break;
        case 2:
            var gender = "Female";
            break;
        case 3:
            var gender = "Transgender";
            break;
        default:
            var gender = "Male";
    }
    return gender;
}

/**
 * @DateOfCreation        20 June 2018
 * @ShortDescription      This function is responsible convert gender int to gender string data
 * @return                String Gender
 */
function getBookingStatus (statusId){
    switch(statusId) {
        case 1:
            var status = {
                label: "Not started",
                class: "text-yellow"
            };
            break;
        case 2:
            var status = {
                label: "In progress",
                class: "text-green" 
            };
            break;
        case 3:
            var status = {
                label: "Completed",
                class: "text-black"
            };
            break;
        case 4:
            var status = {
                label: "Canceled",
                class: "text-red"
            };
            break;
        default:
            var status = {
                label: "Default",
                class: "text-default"
            };
    }
    return status;
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible get array difference and return latest key
 * @return                json
 */
function getArrayDifference(currentKey, events){
    return events.filter(function (i) {
        return currentKey.indexOf(i) === -1;
    });
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible get data retun on StaticDataConfig
 * @return                json
 */
function getStaticDataConfig(staticData,name){
    let getData = [];
    if(typeof staticData === 'object' && staticData.hasOwnProperty(name)){
       getData = staticData[name];
    }
    return getData;
}

/**
 * @DateOfCreation        27 June 2018
 * @ShortDescription      This function is responsible to catech error handel message 
 * @return                json
 */
function catchServiceErrorHandel(response){
    let res = {};
    res['data'] = {};
    res['data']['code'] = configConstants.EXCEPTION_CODE;
    res['data']['message'] = response.message;
    return res;
}

/**
 * @DateOfCreation        27 June 2018
 * @ShortDescription      This function is responsible to flip array key and value
 * @return                json
 */
function arrayValueToObjectKey(arrs, result, arrKey) {
    let rv = {};

    for(let k=0; k< arrs.length; ++k)
    {
        let arr = arrs[k];
        for (let i = 0; i < arr.length; ++i) 
        {
            if(arr[i].indexOf(arrKey) > -1){
                rv[arr[i]] = typeof result === 'object' && result[k][arr[i]] !== undefined && result[k][arr[i]] !== '' ? result[k][arr[i]] :[];   
            } else {
                rv[arr[i]] = typeof result === 'object' && result[k][arr[i]] !== undefined && result[k][arr[i]] !== '' ? result[k][arr[i]] :'';
            }
        }
    }
    return rv;
}

/**
 * @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to get specfice value object from data object
 * @return                json
 */
function getObjectValue(data,key,value){
    let objectData = {};
    for(var row in data) {
        if(typeof data[row] === 'object' && data[row].hasOwnProperty(key) && data[row][key] == value){
           objectData = data[row];
           break;
        }
    }
    return objectData;
}

/**
 * @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to get specfice value object from data object
 * @return                json
 */
function mergeMultipleObject(objectArray){
    let finalData = {};
     for(var row in objectArray) {
        finalData = Object.assign({}, objectArray[row], finalData);
     }
     return finalData;
}

/**
 * @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to date input disable specific dates
 * @return                json
 */
function dateShowValidation(disableDateType){
    var disableDate = disableDateType
     var valid = '';
    switch(disableDate){
        case 'weekend':
            valid = function( current ){
                return current.day() !== 0 && current.day() !== 6;
            };
        break;
        case 'before':
            valid = function( current ){
                return current.isBefore( );
            };
        break;

        case 'after':
            var yesterday = Datetime.moment().subtract(1, 'day');
            valid = function( current ){
                return current.isAfter(yesterday);
            };
        break;
        default :
            valid = function( current ){
                return current;
            };

    }
    return valid;
}

/**
* @DateOfCreation        19 July 2018
* @ShortDescription      This function is responsible set the updated profile
                         and user info to cookies
* @return                String
*/
function setUpdatedProfileImage(profileImage) {
    sessionService.loadUser().then(user => {
        switch(String(user.user_type)){
            case configConstants.USER_TYPE_PATIENT:
               user.pat_profile_img = profileImage;
               break;
            case configConstants.USER_TYPE_DOCTOR:
               user.doc_profile_img = profileImage;
               break;
        }
        sessionService.saveUser(user);
    });
    return true;
}

/**
* @DateOfCreation        19 July 2018
* @ShortDescription      This function is responsible set the updated profile
                         and user info to cookies
* @return                String
*/
function setPatientProfileImage(profileImage) {
    sessionService.loadUser().then(user => {
        user.pat_profile_img = profileImage;
        sessionService.saveUser(user);
    });
    return true;
}

/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible set the updated profile
                         and user info to cookies
* @return                String
*/
function setUpdatedProfile(newUserDetail) {
    sessionService.loadUser().then(user => {
        switch(String(user.user_type)){
            case configConstants.USER_TYPE_PATIENT:
               newUserDetail.pat_profile_img = user.pat_profile_img;
               break;
            case configConstants.USER_TYPE_DOCTOR:
               newUserDetail.doc_profile_img = user.doc_profile_img;
               break;
        }
        sessionService.saveUser(newUserDetail);
    });
    return true;
}

/**
* @DateOfCreation        19 July 2018
* @ShortDescription      This function is responsible to check value in array
* @param                 JSON jsonObj
* @param                 FORMDATA formDataObj
* @return                FORMDATA OBJ
*/
function inArray(needle, haystack) {
    if(haystack != '' && haystack != null && haystack != undefined){
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(typeof(haystack[i]) == 'object'){
                for(var j = 0; j < haystack[i].length; j++) {
                    if(haystack[i][j] == needle) return true;
                }
            }else{
                if(haystack[i] == needle) return true;
            }
        }
    }
    return false;
}

/* @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to two input calCulate Divide operation perform
 * @return                value
 */
function calCulateDivideData(preVal,postVal){
    preVal = parseFloat(preVal);
    postVal = parseFloat(postVal);

    if(isNaN(preVal) || isNaN(postVal) || postVal === undefined || preVal === undefined  || preVal === 0 || postVal === 0){
        return '-';
    }else{
        let res = preVal/postVal;
        return res.toFixed(2);
    }
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible calculate age from DOB
* @return                String Age
*/
function calculateAge(dateString) { 
    var age = false;
    if(dateString != '' && dateString != null && dateString != undefined){
      var today = new Date();
      var birthDate = new Date(dateString.toString());
      age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }
  return age;
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible to get the time dropdown in the Timing section
* @return                json
*/
function getTime(){
    var timeInterval = 30; 
    var times = [{'value':"Off",'label':"Off"}]; 
    var startTime = 480; // minutes count for 08:00 AM 
    var ap = ['AM', 'PM']; // AM-PM
    for (var i=0;startTime<24*60; i++) {
        var hh = Math.floor(startTime/60); 
        var mm = (startTime%60);
        times.push({
            value: ("0" + (hh % 24)).slice(-2) + ("0" + mm).slice(-2),
            label: ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) +' '+ ap[Math.floor(hh/12)]
        });
        startTime = startTime + timeInterval;
    }
    return times;
} 

/**
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible for changing time to proper format from Database
* @return                json
*/
function changeTimingFormat(dbTiming){
    if(dbTiming == ''){
        time = "";
    }else if(dbTiming == 'Off'){
        time = dbTiming;
    }else{
        var hours =  dbTiming.slice(0,2);
        var minutes =  dbTiming.slice(2);

        var hh =  ("0" + ((hours>12) ? (hours-12) : hours)).slice(-2);
        var mm =  ("0" + minutes).slice(-2);
        var ap = ['AM', 'PM']; // AM-PM
        var time = hh + ':' + mm +' '+ ap[Math.floor(hours/12)];
    }
    return time;
} 

/**
* @DateOfCreation        25 June 2018
* @ShortDescription      This function is responsible to display matrix grid in timing list
* @return                json
*/
function getShiftArray(timing){
    var array = [];
    var offArray = {'timing_id' : '', 'start_time':'', 'end_time': '', 'week_day' : '', 'clinic_name' : '' };
    var shifts = [];
    for(var rows in timing){
          array.push(timing[rows].length);
    }
    var max = Math.max(...array);
    for(var i=0; i<max; i++){
        shifts[i] = [];
        for(var j=1; j<=7; j++){
                if(timing[j][i] != undefined){
                    shifts[i].push(timing[j][i]);
                }else{
                    offArray.week_day = j;
                    shifts[i].push(offArray);
                }
        }
    }
        return shifts;
}

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible to find the index of a value in multidimensional array
* @param                 data - Array
* @param                 key of the value to be compared
* @param                 value to be searched for index
* @return                json
*/
function getMultiDimensionArrayIndex(data, name, value){
    for (var i in data) {
        var index = data[i].findIndex(i => i[name] === value);
        if (index > -1) {
            return [i, index];
        }
    }
}

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible to display matrix grid in timing list
* @return                json
*/

function getWeekdayName(weekdayNumber){
    switch(parseInt(weekdayNumber)) {
        case 1:
            var weekdayName = "Monday";
            break;
        case 2:
            var weekdayName = "Tuesday";
            break;
        case 3:
            var weekdayName = "Wednesday";
            break;
        case 4:
            var weekdayName = "Thursday";
            break;
        case 5:
            var weekdayName = "Friday";
            break;
        case 6:
            var weekdayName = "Saturday";
            break;
        case 7:
            var weekdayName = "Sunday";
            break;
        default:
            var weekdayName = "";
    }
    return weekdayName;
} 

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible make the JSON of Genders
* @return                json
*/
function getWeekdays(){
    var weekdays = [
                    { value: '0', label: 'All Days' },
                    { value: '1', label: 'Monday' },
                    { value: '2', label: 'Tuesday' },
                    { value: '3', label: 'Wednesday' },
                    { value: '4', label: 'Thursday' },
                    { value: '5', label: 'Friday' },
                    { value: '6', label: 'Saturday' },
                    { value: '7', label: 'Sunday' },
                ];

    return weekdays;
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible convert gender int to gender string data
* @return                String Gender
*/
function getPatientTitle(title){
    switch(title) {
        case "1":
            var title = 'Ms.';
            break;
        case "2":
            var title = 'Mrs.';
            break;
        case "3":
            var title = 'Dr.';
            break;
        default:
            var title = 'Master.';
    }
    return title;
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible spilit time slot array
* @return                String Gender
*/
function splitDiv(slot){
    var i,j,temparray,chunk = 4;
    var tempArr = [];
    for (i=0,j=slot.length; i<j; i+=chunk) {
        temparray = slot.slice(i,i+chunk);
        tempArr.push(temparray);
    }
    return tempArr;
}

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible to display matrix grid in timing list
* @return                json
*/

function changeDateFormat(date){

    var currentDate = new Date();
    var currentD = currentDate.getDate();
    if(currentD<10) 
    {
        currentD='0'+currentD;
    } 
     var currentm = currentDate.getMonth()+1;
    if(currentm<10) 
    {
        currentm='0'+currentm;
    } 
    var todayDate = currentD+'-'+currentm+'-'+currentDate.getFullYear();

    var slotDate = new Date(date);
    var slotD = slotDate.getDate();
    if(slotD<10) 
    {
        slotD='0'+slotD;
    } 
     var slotm = slotDate.getMonth()+1;
    if(slotm<10) 
    {
        slotm='0'+slotm;
    } 

    var slot = slotD+'-'+slotm+'-'+slotDate.getFullYear();
    if(todayDate == slot)
    {
        return configConstants.CURRENT_DAY;
    }
    return slot;
}

/**
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible make the JSON of booking reason
* @return                json
*/

function getAppointmentReasons(reasonData = null){
      var appointmentReason = getDataConvertToOptionType(reasonData,'appointment_cat_name','appointment_cat_id');
    return appointmentReason;
}

/**
* @DateOfCreation        23 July 2018
* @ShortDescription      This function is responsible make the JSON of booking reason
* @return                json
*/


function getMedicationTemplate(templateData = null){
    var medicationTemplate = getDataConvertToOptionType(templateData,'temp_name','pat_med_temp_id');
    return medicationTemplate;
}

/**
 * @DateOfCreation        20 June 2018
 * @ShortDescription      This function is responsible convert reason int to gender string data
 * @return                String Gender
 */
function getAppointmentReasons1(reasonId){
    switch(parseInt(reasonId)) {
        case 1:
            var reasons = "Annual Physical";
            break;
        case 2:
            var reasons = "General Consultation";
            break;
        case 3:
            var reasons = "General Follow Up";
            break;
        default:
            var reasons = "Illness";
    }
    return reasons;
}

/* @DateOfCreation        07 Aug 2018
 * @ShortDescription      This function is responsible to two input calCulate Divide operation perform
 * @return                value
 */
function calCulateBMI(weight,height){
    weight = parseFloat(weight);
    height = parseFloat(height);

    if(isNaN(weight) || isNaN(height) || height === undefined || weight === undefined  || weight === 0 || height === 0){
        return '';
    }else{
        let res = height/100;
        let heightconvert = Math.pow(res.toFixed(2),2);
        let resData = weight/heightconvert;
        return resData.toFixed(2);
    }
}

/* @DateOfCreation        09 Aug 2018
 * @ShortDescription      This function is responsible to return appointment time listing option
 * @return                value
 */
function visitAppointmentTimeListingOption(data){

    var dataArray = [];
    var count = 0;
    data.map((timeSlot, index)=>{
        if(timeSlot.slot != undefined){
            timeSlot.slot.map((slots,slotIndex)=>{
                var time = changeTimingFormat(slots.slot_time);
                dataArray.push({
                    value: String(slots.slot_time),
                    label: time
                });
            });
        }
        return dataArray;
    });
    var d = getDataConvertToOptionType(dataArray,'label','value');
    return d;
}

/**
* @DateOfCreation        10 Aug 2018
* @ShortDescription      This function is responsible to get the time slot duration dropdown in the Timing section
* @return                json
*/
function getSlotDurations(){
    var durations = [
                    { value: '15', label: '15 Minutes' },
                    { value: '30', label: '30 Minutes' },
                    { value: '45', label: '45 Minutes' },
                    { value: '60', label: '1 Hour' }
                ];
    return durations;
} 

/**
* @DateOfCreation        10 Aug 2018
* @ShortDescription      This function is responsible to get the time slot duration dropdown in the Timing section
* @return                json
*/
function getPatientsPerSlot(){
    var patients = [
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                    { value: '6', label: '6' }
                ];
    return patients;
} 

/* @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to convert input date object to date string only
 * @return                value
 */
function dateDataConvert(dateValue){
    var value = '';
    if(typeof dateValue === 'object'  && dateValue!==null){
       value =  dateValue.format(configConstants.DATE_FORMAT);

    }else if(typeof dateValue === 'string'  && dateValue!==null && dateValue!=''){
         value = moment(dateValue).format(configConstants.DATE_FORMAT)
    }
    return value;

}

/* @DateOfCreation        28 June 2018
 * @ShortDescription      This function is responsible to find key  search by value
 * @return                value
 */
function getObjectKeyByValue(objectData,findValue){
    var key = null;
        for (var prop in objectData)
        {
            if (objectData.hasOwnProperty(prop))
            {
                if (objectData[prop] === findValue)
                {
                    key = prop;
                }
            }
        }

        return key;
}

/**
* @DateOfCreation        31 Aug 2018
* @ShortDescription      This function is responsible make the JSON of Report Periods
* @return                json
*/
function getReportPeriods(){
    var weekdays = [
                    { value : '1', label : "1 Month" },
                    { value : '2', label : "1 Year" },
                ];

    return weekdays;
}

/**
 * @DateOfCreation        20 June 2018
 * @ShortDescription      This function is responsible get filter tag.
 * @return                String Gender
 */
function getFilters(filterKey,filterType){
    var filter = {
        'gender':{
            '1':'Male',
            '2':'Female'
        },
        'consult_fee':{
            '1':'Less than 100',
            '2':'100-500',
            '3':'Greater than 500'
        },
        'hour_filter':{
            '1000':'Before 10:00 AM',
            '1700':'After 05:00 PM',
        },
        'availibity':{
            '2':'Today',
        },
        'distance':{
            '2':'Within 2 KM',
            '5':'Within 5 KM',
            '100':'Greater than 500'
        }
    }
    return filter[filterType][filterKey];
}

/**
 * @DateOfCreation        28 May 2018
 * @ShortDescription      This f Septon is responsible make the JSON of medicines
 * @return                json
 */
function getMedicineOption(medicineOptionData){
    var optionArray = [];
    var count = 0;
    for(var medicineOption in medicineOptionData) {
         optionArray.push({
            value: String(medicineOptionData[medicineOption].medicine_id),
            label: medicineOptionData[medicineOption].medicine_name
        });
    }
    return optionArray;
}

/**
* @DateOfCreation        26 June 2018
* @ShortDescription      This function is responsible to display matrix grid in timing list
* @return                json
*/

function getSystemicAuscultationTable(indexKey){
    switch(indexKey) {
        case 0:
            var auscultation = "Air Entry";
            break;
        case 1:
            var auscultation = "VF, VR";
            break;
        case 2:
            var auscultation = "VBS";
            break;
        case 3:
            var auscultation = "Bronchial Breathing";
            break;
        case 3:
            var auscultation = "Wheeze/Rhonchi";
            break;
        case 4:
            var auscultation = "Crackles";
            break;
        case 5:
            var auscultation = "Whispering Pectroloquy";
            break;
        case 6:
            var auscultation = "Aegophony";
            break;
        case 7:
            var auscultation = "Pleural Rub";
            break;
        default:
            var auscultation = "";
    }
    return auscultation;
} 

function getMedicineDurationUnit(value){
    switch(parseInt(value)) {
        case 1:
            var label = "Days(s)";
            break;
        case 2:
            var label = "Weeks(s)";
            break;
        case 3:
            var label = "Months(s)";
            break;
            var label = "";
    }
    return label;
}

function getMedicineMealOpt(value){
    switch(parseInt(value)) {
        case 1:
            var label = "Before Meal";
            break;
        case 2:
            var label = "After Meal";
            break;
    }
    return label;
}

function getTodayDate(format){
    var today = new Date();
    var date = '';
    switch(format) {
        case 'dd-mm-YYYY':
            date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            break;
        default:    // YYYY-mm-dd
            date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }
    return date;
}

/* @DateOfCreation        10 Oct 2018
 * @ShortDescription      This function is responsible to export file add current time
 * @return                value
 */
function getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    var M = today.getMonth();
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    M = M+1;
    return y + "-" + M + "-" + d + "-" + h + "-" + m + "-" + s;
}