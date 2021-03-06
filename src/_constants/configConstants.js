/**
 * configConstants
 *
 * @package                SafeHealth
 * @subpackage             configConstants
 * @category               Constants
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all config related constants
 */
export const configConstants = {
    API_BASE_PATH       :  process.env.API_BASE_PATH,
    SUCCESS_CODE        : '1000',
    ERROR_CODE          : '5000',
    EXCEPTION_CODE      : '3000',
    UNAUTHENTICATE_CODE : '7000',
    RESOURCE_TYPE       : '1',
    LOGIN_TOKEN         : process.env.LOGIN_TOKEN_COOKIE_NAME,
    USER_INFO           : process.env.USER_INFO_COOKIE_NAME,
    SECURE_PROTOCOL     : process.env.SECURE_PROTOCOL,
    START_YEAR          : '1970',
    END_YEAR            : '2018',
    START_MONTH         : '1',
    END_MONTH           : '12',
    USER_TYPE_SUPERADMIN : '4',
    USER_TYPE_ADMIN     : '1',
    USER_TYPE_DOCTOR    : '2',
    USER_TYPE_PATIENT   : '3',
    USER_TYPE_STAFF     : ['5', '6', '7', '8'],
    USER_TYPE_LAB_MANAGER: '9',
    UNAUTHENTICATE      : 'UNAUTHENTICATE',
    MEDIA_BASE_PATH     :  process.env.API_BASE_PATH+'media/',
    PROFILE_BASE_PATH   :  process.env.API_BASE_PATH+'profile-image/',
    PATIENT_PROFILE_PATH:  process.env.API_BASE_PATH+'patient-profile-image/',
    PATIENT_STHUMB_PATH :  process.env.API_BASE_PATH+'patient-profile-thumb-image/small/',
    PATIENT_MTHUMB_PATH :  process.env.API_BASE_PATH+'patient-profile-thumb-image/medium/',
    CONFIRM_ALERT_YES   : 'Yes',
    CONFIRM_ALERT_NO    : 'No',
    BASE_URL            : process.env.BASE_URL,
    DATE_FORMAT         : 'DD/MM/YYYY',
    DATE_FORMAT_DB      : 'YYYY-MM-DD',
    BUTTON_PLEASE_WAIT  : 'Pleas Wait...',
    SAVE_BUTTON         : 'Save',
    OTHER_CITY_MATCH    : 'Other',
    DEFAULT_IMAGE_PATH  :  process.env.STATIC_IMAGE_BASE_PATH+'no-doctor-pic.png',
    DEFAULT_SMALL_PATH  :  process.env.STATIC_IMAGE_BASE_PATH+'no-picx50.png',
    DEFAULT_MEDIUM_PATH :  process.env.STATIC_IMAGE_BASE_PATH+'no-picx100.png',
    PROFILE_LOAING      :  process.env.STATIC_IMAGE_BASE_PATH+'profile-loading.gif',
    SEARCH_LOAING       :  process.env.STATIC_IMAGE_BASE_PATH+'search.gif',
    COUNTRY_CODE_SIGN   : '+',
    WAIT_INTERVAL       : 500,
    CURRENT_DAY         : 'Today',
    PREVIOUS_SLOT       : 'previous',
    NEXT_SLOT           : 'next',
    PAGE_NUMBER         : 0,
    PAGE_SIZE           : 10,
    KEY_CODES           : [188,13],
    DOCTOR_TITLE        : 'Dr.',
    IS_VISIBLE_NO       : 1,
    IS_VISIBLE_YES      : 2,
    SHOW_IN_FOLLOWUP_YES: 2,
    SHOW_IN_FOLLOWUP_NO : 1,
    ORDER               : 1,
    LOADABLE            : 0,
    INDIA_COUNTRY_CODE  : '91',
    EXPORT_PATIENTS     : 'SafeHealth-Patients-Report-',
    EXPORT_PATIENTS_EXTENSION_TYPE_CSV : '.csv',
    EXPORT_PATIENTS_EXTENSION_TYPE_PDF : '.pdf',
};
