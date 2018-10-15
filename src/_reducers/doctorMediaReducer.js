/**
 * doctorMedia
 *
 * @package                SafeHealth
 * @subpackage             doctorMedia
 * @category               Reducers
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all state related to doctor media
 */

import {configConstants, doctorMediaConstants} from '../_constants';

export function doctorMedia(state = {request: false,mediaData:[], isDelete:false, progressValue:0, progressIndex:null}, action) {

    switch (action.type) {
        case doctorMediaConstants.DR_MEDIA_REQUEST:
            return { request: true, mediaData:[], loader:true};
        case doctorMediaConstants.DR_MEDIA_SUCCESS:
            return { request: true, mediaData:action.mediaData.result, loader:false};
        case doctorMediaConstants.DR_MEDIA_FAILURE:
            return { request: false, error : action.error, mediaData:{}};
        case doctorMediaConstants.DR_MEDIA_DELETE_REQUEST:
            return { isDelete: false, mediaData:action.mediaData};
        case doctorMediaConstants.DR_MEDIA_DELETE_SUCCESS:
            return { isDelete: true, mediaId : action.mediaId, mediaData:action.mediaData };
        case doctorMediaConstants.DR_MEDIA_DELETE_FAILURE:
            return { isDelete: false, error : action.error};
        case doctorMediaConstants.DR_MEDIA_ADD_REQUEST:
            return { isAdded: false, mediaData:action.mediaData, loader:true, isAdded:true};
        case doctorMediaConstants.DR_MEDIA_PROGRESS:
            return {progressValue:action.progressValue, progressIndex:action.progressIndex, mediaData:action.mediaData, progress:true};
        case doctorMediaConstants.DR_MEDIA_ADD_SUCCESS:
            return {...state, mediaData: [...state.mediaData, action.newMedia], loader:false, progressIndex:null, progress:false, isAdded:true}
        case doctorMediaConstants.DR_MEDIA_ADD_FAILURE:
            return { isAdded: false, loader:true, error : action.error, mediaData:action.mediaData, loader:false};
        case doctorMediaConstants.DR_MEDIA_RESET_STATE:
            return { ...state,error: false };
        case configConstants.UNAUTHENTICATE:
            return {...state, isUserNotValid : true, errorMsg : false}
        default:
            return state
    }
}
