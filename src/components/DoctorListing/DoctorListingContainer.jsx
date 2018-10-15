/**
 * DoctorListingContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorListingContainer
 * @category               Container Component
 * @DateOfCreation         16 july 2018
 * @ShortDescription       This component is reponsible for logic in doctor listing
 */
import React from "react";
import { connect } from 'react-redux';
import { DoctorListing } from "./DoctorListing";
import { doctorListingActions } from './doctorListingActions';
import { doctorDetailActions } from '../BookAppointments/DoctorDetails/doctorDetailActions';
import { configConstants } from '../../_constants';
import { Loading } from '../../global';
import { WebsiteHeaderContainer } from '../WebsiteHeader';
import { utilityHelper } from '../../_helpers';
import { WebsiteFooter } from '../WebsiteHeader/WebsiteFooter';
import { appointmentActions } from '../BookAppointments/Appointment/appointmentActions'

class DoctorListingContainer extends React.Component {

  /**
   * @DateOfCreation        16 july 2018
   * @ShortDescription      Contructor is responsible to function declaration
   * @param                 props
   * @return                Nothing
   */
    constructor(props, context) {
        super(props, context);

        this.addAppointmentShowHandle = this.addAppointmentShowHandle.bind(this);
        this.addAppointmentHideHandle = this.addAppointmentHideHandle.bind(this);
        this.previousSlot = this.previousSlot.bind(this);
        this.nextAvailableSlot = this.nextAvailableSlot.bind(this);
        this.nextSlot = this.nextSlot.bind(this);
        this.handleDoctorDetail = this.handleDoctorDetail.bind(this);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.pageNavigation = this.pageNavigation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.resetFilter        = this.resetFilter.bind(this);
        this.doctorAlertShowHandle  = this.doctorAlertShowHandle.bind(this);
        this.doctorAlertHideHandle = this.doctorAlertHideHandle.bind(this);
        this.sendingRequest = true;
        this.isSourceListing = true;
        this.ids = {};
        this.state = {
            doctorAlert              : false,
            addAppointmentShowHandle : false,
            doctorInitialListing : '',
            appointmentDetail : {
                'user_id' : '',
                'clinic_id' : '',
                'timing_id' : '',
                'booking_date' : '',
                'booking_time' : '', 
            },
            doctorDetail : {
                    'title'             : 'Dr.',
                    'user_firstname'    : '',
                    'user_lastname'     : '',
                    'doc_deg_name'      : '',
                    'spl_name'          : '',
                    'doc_address_line1' : '',
                    'doc_address_line2' : '',
                    'doc_pincode'       : '',
                    'doc_profile_img'   : '',
                    'doc_rating'        : '',
            },
          buttonDisable: false,
          filters:{
                    'filter_gender'          : '4',
                    'filter_consulting_fee'  : '',
                    'filter_hours_before_10' : '',
                    'filter_hours_after_05'  : '',
                    'filter_availability'    : '1',
                    'detected_lat'           : '',
                    'detected_lng'           : '',
                    'filter_distance'        : ''

          },
          sortBy:{
                    'doctor_name'    : ''
          }
        };
    }


    resetFilter(){
        this.setState({
            filters : {
                'filter_gender'          : '4',
                'filter_consulting_fee'  : '',
                'filter_hours_before_10' : '',
                'filter_hours_after_05'  : '',
                'filter_availability'    : '1',
                'detected_lat'           : '',
                'detected_lng'           : '',
                'filter_distance'        : ''

            }
        },function(){
            this.handlePaginationClick(this.props.page);
        })
    }


    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle load doctor listing
     * @return                Nothing
     */

    componentWillMount(){
        const { dispatch } = this.props;
        var splId = this.props.match.params.splId;
        var cityId = this.props.match.params.cityId;
        var srvId = this.props.match.params.srvId;
        var splTagId = this.props.match.params.splTagId;
        var page = configConstants.PAGE_NUMBER;
        if(this.props.match.params.latitude != undefined && this.props.match.params.longitude != undefined){
            var lat = String(this.props.match.params.latitude);
            var lng = String(this.props.match.params.longitude);
            var currentlat = lat.replace(',','.');
            var currentlng = lng.replace(',','.');
            const { filters }            = this.state;
            this.setState({
                filters : {
                    ...filters,
                    'detected_lat'           : currentlat,
                    'detected_lng'           : currentlng
                }
            });
        }
        splId = (splId != undefined) ? splId : '';
        cityId = (cityId != undefined) ? cityId : '';
        srvId = (srvId != undefined) ? srvId : '';
        splTagId = (splTagId != undefined) ? splTagId : '';
        this.ids = {
                'splId':splId,
                'cityId':cityId,
                'srvId':srvId,
                'splTagId':splTagId
              };
        var pageSize = configConstants.PAGE_SIZE;
        
        setTimeout(function () {
            dispatch(doctorListingActions.doctorListing(this.ids, page, pageSize, this.state.filters, this.state.sortBy));
        }.bind(this), 500);        
    }

     /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        var { name, value }        = event.target;
        const { filters }            = this.state;
        if(!event.target.checked){
            value = '';
        }
        this.setState({
            filters : {
                   ...filters,
                    [name]: value
                },
        },function(){
            this.handlePaginationClick(this.props.page);
        });
    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(event) {
        var { name, value }    = event.target;
        const { sortBy }       = this.state;
        if(event.target.value  == 'default'){
            value = '';
        }
        this.setState({
            sortBy : {
                   ...sortBy,
                    [name]: value
                },
        },function(){
            this.handlePaginationClick(this.props.page);
        });
    }


    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle show appointment model
    * @return                Nothing
    */
    addAppointmentShowHandle(detail, slot) {
        let loginAcess = utilityHelper.getLoginAccessToken();
        if(!loginAcess){
            const { dispatch } = this.props;
            dispatch(doctorDetailActions.loginShowHandle());
        }else{
            let userType = utilityHelper.getUserInfo().user_type;
            let userId = utilityHelper.getUserInfo().user_id;
            if(userType == configConstants.USER_TYPE_PATIENT){
                var detailArray = detail.doc_timing_slot[0];
                const { dispatch } = this.props;
                dispatch(doctorDetailActions.isSlotAvailable(detailArray.timing_id, detailArray.date, slot, userId));
                dispatch(appointmentActions.getAppointmentReasons(detail.user_id));
                this.setState({ 
                    appointmentDetail : {
                            'user_id'       : detailArray.user_id,
                            'clinic_id'     : detailArray.clinic_id,
                            'timing_id'     : detailArray.timing_id,
                            'booking_date'  : detailArray.date,
                            'booking_time'  : slot, 
                    },
                    doctorDetail : {
                            'title'             : 'Dr.',
                            'user_firstname'    : detail.user_firstname,
                            'user_lastname'     : detail.user_lastname,
                            'doc_deg_name'      : detail.doc_deg_name,
                            'spl_name'          : detail.spl_name,
                            'doc_address_line1' : detail.doc_address_line1,
                            'doc_address_line2' : detail.doc_address_line2,
                            'doc_pincode'       : detail.doc_pincode,
                            'doc_profile_img'   : detail.doc_profile_img,
                            'doc_rating'        : detail.overall_average,
                            'doc_review_count'  : detail.doc_review_count,
                    },
                    addAppointmentShowHandle: true,

                });
            }else{
              this.doctorAlertShowHandle();
            }
        }
    }

    /**
    * @DateOfCreation        26 Sep 2018
    * @ShortDescription      This function is responsible to handle hide Doctor alert model
    * @return                Nothing
    */
    doctorAlertShowHandle() {
        this.setState({ doctorAlert: true });
    }
    /**
    * @DateOfCreation        26 Sep 2018
    * @ShortDescription      This function is responsible to handle hide Doctor alert model
    * @return                Nothing
    */
    doctorAlertHideHandle() {
        this.setState({ doctorAlert: false });
    }

    /**
    * @DateOfCreation        16 july 2018
    * @ShortDescription      This function is responsible to handle hide appointment model
    * @return                Nothing
    */
    addAppointmentHideHandle() {
        this.setState({ addAppointmentShowHandle: false });
    }

   /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle previous timeslot
    * @return                Nothing
    */
    previousSlot(timeSlot){
        var clinicId = timeSlot.clinic_id;
        var slotDate = timeSlot.date;
        const { dispatch } = this.props;
        dispatch(doctorListingActions.getTimeSlot(clinicId, slotDate, configConstants.PREVIOUS_SLOT, this.state.filters));  
    }

    /**
    * @DateOfCreation        24 August 2018
    * @ShortDescription      This function is responsible to handle next available timeslot
    * @return                Nothing
    */
    nextAvailableSlot(timeSlot){
        var clinicId = timeSlot.clinic_id;
        var slotDate = timeSlot.date;
        const { dispatch } = this.props;
        dispatch(doctorListingActions.getTimeSlot(clinicId, slotDate, '', this.state.filters));  
    }

   /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle next timeslot
    * @return                Nothing
    */
    nextSlot(timeSlot){
        var clinicId = timeSlot['clinic_id'];
        var slotDate = timeSlot['date'];
        const { dispatch } = this.props;
        dispatch(doctorListingActions.getTimeSlot(clinicId, slotDate, configConstants.NEXT_SLOT, this.state.filters));
    }

   /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle old and updated props and update slots
    * @return                Nothing
    */
    componentWillReceiveProps(nextProps){
        const {doctorInitialListing,timing} = this.state;
        if(nextProps.getTimeSlotDone){
            var updatedDoctorListing = 
                    doctorInitialListing.length > 0 ? doctorInitialListing.map((listing, listingIndex) =>{
                        nextProps.timeSlots.map((timeslot, slotIndex)=>{
                            if(listing.clinic_id == timeslot.clinic_id)
                            {
                                listing.doc_timing_slot = [];
                                listing.doc_timing_slot.push(timeslot);
                            }
                        });
                        return listing;
                    }) : [];
            this.setState({
              doctorInitialListing: updatedDoctorListing
            })
        }else{
            this.setState({
              doctorInitialListing: nextProps.doctorListing
            })
        }
        this.sendingRequest = nextProps.sendingRequest;
    }

   /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handleDoctorDetail(result){
        if(result != null){
            this.props.history.push('/bookappointments/'+result);
        }
    }


    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handlePaginationClick(pageNo){
        const { dispatch } = this.props;
        var pageSize = configConstants.PAGE_SIZE;

        dispatch(doctorListingActions.doctorListing(this.ids, pageNo, pageSize, this.state.filters, this.state.sortBy));

        if(pageNo == 0){
            this.setState({
              buttonDisable: true
            })            
        }
    }


    pageNavigation(currentPage,direction,totalPage){
      if(direction == configConstants.PREVIOUS_SLOT && currentPage >= 1){
        this.handlePaginationClick(currentPage-1);
      }else{
        this.setState({
          buttonDisable: true
        })
      }

      if(direction == configConstants.NEXT_SLOT  && currentPage < totalPage){
        this.handlePaginationClick(currentPage+1);
      }else{
        this.setState({
          buttonDisable: true
        })
      }
    }

    /**
     * @DateOfCreation        18 july 2018
     * @ShortDescription      pass all required detail for display doctor list
     * @return                Nothing
     */
    render() {
        return(
              <div className="page-container">
                <div className="wrap-inner-content">
                  <WebsiteHeaderContainer 
                    history     ={this.props.history}
                    loginShow   = {this.props.loginShow}
                    search      = {false}
                />
                { this.state.doctorInitialListing != undefined ?
                    <DoctorListing
                        addAppointmentShowHandle = {this.addAppointmentShowHandle} 
                        addAppointmentHideHandle = {this.addAppointmentHideHandle} 
                        addAppointmentShow       = {this.state.addAppointmentShowHandle}
                        doctorListing            = {this.state.doctorInitialListing}
                        previousSlot             = {this.previousSlot}
                        nextAvailableSlot        = {this.nextAvailableSlot}
                        nextSlot                 = {this.nextSlot}
                        handleDoctorDetail       = {this.handleDoctorDetail} 
                        pages                    = {this.props.pages}
                        page                     = {this.props.page}
                        handlePaginationClick    = {this.handlePaginationClick}
                        pageSize                 = {configConstants.PAGE_SIZE}
                        pageNavigation           = {this.pageNavigation}
                        buttonDisable            = {this.state.buttonDisable}
                        appointmentDetail        = {this.state.appointmentDetail} 
                        doctorDetail             = {this.state.doctorDetail}
                        handleInputChange        = {this.handleInputChange} 
                        handleSelectChange       = {this.handleSelectChange}
                        sendingRequest           = {this.sendingRequest}
                        searchedCity             = {this.props.searchedCity}
                        searchedCount            = {this.props.searchedCount}
                        searchedSpl              = {this.props.searchedSpl}
                        resetFilter              = {this.resetFilter}
                        defaultFilters           = {this.state.defaultFilters}
                        filters                  = {this.state.filters}
                        isSourceListing          = {this.isSourceListing}
                        appointmentReason        = {this.props.appointmentReason}
                        doctorAlertHideHandle    = {this.doctorAlertHideHandle}
                        doctorAlert              = {this.state.doctorAlert}
                    /> : <Loading />
                }
                <WebsiteFooter/>
              </div>
            </div>
        );
    }
}

/**
* @DateOfCreation        16 july 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {doctorListing,timeSlots,getTimeSlotDone,pages,page,sendingRequest,searchedCity, searchedCount, searchedSpl} = state.doctorListing;
    const { loginShow } = state.doctorDetail;
    const { appointmentReason } = state.appointment;
    return {
       doctorListing,
       timeSlots,
       getTimeSlotDone,
       pages,
       page,
       loginShow,
       sendingRequest,
       searchedCity,
       searchedCount,
       searchedSpl,
       appointmentReason
    };
}

const connectedDoctorListingContainer = connect(mapStateToProps)(DoctorListingContainer);
export { connectedDoctorListingContainer as DoctorListingContainer }; 


