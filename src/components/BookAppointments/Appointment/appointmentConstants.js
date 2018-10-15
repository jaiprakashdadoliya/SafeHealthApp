/**
 * appointmentConstants
 *
 * @package                SafeHealth
 * @subpackage             appointmentConstants
 * @category               Constants
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible for appointment action names
 */
export const appointmentConstants = {

    // Fetch Action Constants
    APT_FETCH_REQUEST     : 'APT_FETCH_REQUEST',
    APT_FETCH_SUCCESS     : 'APT_FETCH_SUCCESS',
    APT_FETCH_FAILURE     : 'APT_FETCH_FAILURE',

    // Update Action Constants
    APT_UPDATE_REQUEST    : 'APT_UPDATE_REQUEST',
    APT_UPDATE_SUCCESS    : 'APT_UPDATE_SUCCESS',
    APT_UPDATE_FAILURE    : 'APT_UPDATE_FAILURE',

    // Add Action Constants
    APT_ADD_REQUEST       : 'APT_ADD_REQUEST',
    APT_ADD_SUCCESS       : 'APT_ADD_SUCCESS',
    APT_ADD_FAILURE       : 'APT_ADD_FAILURE',

    //update State
    APT_UPDATE_STATE       : 'APT_UPDATE_STATE',
    APT_UNAUTHENTICATED    : 'User not logged in!',
    APT_PAYMENT_MODE_VALID : 'Select payment mode',
    APT_IS_PROFILE_VISIBLE_YES : '2',

    //Slot Availability Check
    PATIENT_ALREADY_BOOKED_DAY : 'PATIENT_ALREADY_BOOKED_DAY',
    PATIENT_ALREADY_BOOKED_CONFIRM : 'You have already booked an appointment for the day. Do you wish to continue?',

    APT_REASON_REQUEST: 'APT_REASON_REQUEST',
    APT_REASON_SUCCESS: 'APT_REASON_SUCCESS',
    APT_REASON_FAILURE: 'APT_REASON_FAILURE',

};
