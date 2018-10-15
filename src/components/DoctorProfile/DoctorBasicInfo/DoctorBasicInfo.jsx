import React from "react";
import { connect } from 'react-redux';
import { fontawesome, FontAwesomeIcon} from '../../../global';
import { faUnlockAlt } from '@fortawesome/fontawesome-free-solid';
import { faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faGraduationCap } from '@fortawesome/fontawesome-free-brands';
import { DoctorBasicInfoEdit } from "./DoctorBasicInfoEdit";
import { DoctorProfileImage } from "./DoctorProfileImage";
import { doctorProfileActions, headerActions, regionActions } from '../../../_actions';
import { configConstants, doctorProfileConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
/**
 * DoctorBasicInfo
 *
 * @package                SafeHealth
 * @subpackage             DoctorBasicInfo
 * @category               Component
 * @DateOfCreation         5 june 2018
 * @ShortDescription       This component is reponsible for show doctor profile
 */

class DoctorBasicInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.basicInfoEditShowHandle  = this.basicInfoEditShowHandle.bind(this);
    this.basicInfoEditHideHandle  = this.basicInfoEditHideHandle.bind(this);
    this.basicInfoImageShowHandle = this.basicInfoImageShowHandle.bind(this);
    this.basicInfoImageHideHandle = this.basicInfoImageHideHandle.bind(this);
    this._onChange                = this._onChange.bind(this);
    this.handleClick              = this.handleClick.bind(this);
    this.redirectToSocialUrl      = this.redirectToSocialUrl.bind(this);
    this.isRegionSuccess          = false;
    this.state = {
      profileImage:'',
      validationMsg:'',
      basicInfoEditShow: false,
      basicInfoImageShow: false,
      user : {
          detail: {
            user_id           : '',
            user_firstname    : '',
            user_lastname     : '',
            user_email        : '',
            user_mobile       : '',
            user_gender       : '',
            user_type         : '',
            doc_short_info    : '',
            doc_consult_fee   : '',
            doc_address_line1 : '',
            doc_address_line2 : '',
            doc_profile_img   : '',
            city_id           : '',
            country_id        : '',
            user_country_code : '',
            state_id          : '',
            doc_pincode       : '',
            doc_facebook_url  : '',
            doc_twitter_url   : '',
            doc_linkedin_url  : '',
            doc_google_url    : '',
            doc_deg_name      : '',
            doc_other_city    : '',
            doc_latitude      : '',
            doc_longitude     : '',
            doc_reg_num       : '',
          },
          doc_other_city_visible: false,
          validate:{
            user_firstname    : {isValid:true, message: ''},
            user_lastname     : {isValid:true, message: ''},
            user_mobile       : {isValid:true, message: ''},
            doc_consult_fee   : {isValid:true, message: ''},
            doc_pincode       : {isValid:true, message: ''},
            doc_facebook_url  : {isValid:true, message: ''},
            doc_twitter_url   : {isValid:true, message: ''},
            doc_linkedin_url  : {isValid:true, message: ''},
            doc_google_url    : {isValid:true, message: ''},
            state_id          : {isValid:true, message: ''},
            city_id           : {isValid:true, message: ''},
            doc_address_line1 : {isValid:true, message: ''},
            doc_reg_num       : {isValid:true, message: ''},
          }
      }
    };
  }
 /**
   * @DateOfCreation        29 May 2018
   * @ShortDescription      This function is responsible to handle show profile model
   * @return                Nothing
   */
  basicInfoEditShowHandle() {
    this.setState({ basicInfoEditShow: true });
    const { dispatch } = this.props;
    // dispatch(doctorProfileActions.getCities(this.props.profileDetail.state_id));
  }

  /**
   * @DateOfCreation        29 May 2018
   * @ShortDescription      This function is responsible to handle close profile model
   * @return                Nothing
   */
  basicInfoEditHideHandle() {
    this.setState({ basicInfoEditShow: false });
  }

  /**
   * @DateOfCreation        29 May 2018
   * @ShortDescription      This function is responsible to handle show profile model
   * @return                Nothing
   */
  basicInfoImageShowHandle() {
    this.setState({ basicInfoImageShow: true });
  }

  /**
   * @DateOfCreation        29 May 2018
   * @ShortDescription      This function is responsible to handle close profile model
   * @return                Nothing
   */
  basicInfoImageHideHandle() {
    this.setState({ basicInfoImageShow: false });
  }

  /**
   * @DateOfCreation        29 May 2018
   * @ShortDescription      This function is responsible to handle set profile state
   * @return                Nothing
   */
  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(doctorProfileActions.getProfileDetail());
  }
  /**
    * @DateOfCreation        29 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorise user
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
            dispatch(headerActions.logout());
        }
    }

    redirectToSocialUrl(pageUrl){
      window.location.href = '/'+pageUrl;
    }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle preview image
   * @return                Nothing
   */
  _onChange(event){

    const { detail,validate } = this.state.user;
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        var imageSize = event.target.files[0].size;
        if(imageSize > 2097152){
           this.setState({
              profileImage:'',
              validationMsg: doctorProfileConstants.DR_IMG_SIZE_VALID_MSG
            })
        } else {
          var Extension = event.target.files[0].type.split('/')[1];
          var ExtensionArray = ["gif","png","jpeg","jpg"];
          if (ExtensionArray.indexOf(Extension) > 0) {
              reader.onload = (e) => {
               this.setState({
                  profileImage : e.target.result,
                  validationMsg: ''
               })
              };
          } else {
            this.setState({
              profileImage:'',
              validationMsg: doctorProfileConstants.DR_IMG_TYPE_VALID_MSG
            })
          }
        }
    }
    this.basicInfoImageShowHandle();
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load detail
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){

    /*updated profile image*/
    if(nextProps.doc_profile_img){
      const { detail,validate } = this.state.user;
      this.setState({
        user:{
          detail:{
             ...detail,
            doc_profile_img : nextProps.doc_profile_img
          }
        }
      });
    }

    /*onload profile detail*/
    if(nextProps.profileDetail){
      var loggedInUser = nextProps.profileDetail;
      for(var k in loggedInUser){
       this.state.user.detail[k]=loggedInUser[k] != null ? loggedInUser[k] : '';
      }

      var profile_image = nextProps.profileDetail.doc_profile_img;
      this.state.user.detail.doc_profile_img = (profile_image!='') ? profile_image : configConstants.DEFAULT_IMAGE_PATH;

      if(this.isRegionSuccess === false){
          const { dispatch }  = this.props;
          dispatch(regionActions.getCities(nextProps.profileDetail.state_id));
          dispatch(regionActions.getStates(nextProps.profileDetail.country_id));

          this.isRegionSuccess = true;
      }
    }

    /*updated profile detail*/
    if(nextProps.updatedDetail){
      for(var k in nextProps.updatedDetail){
          this.state.user.detail[k]=nextProps.updatedDetail[k] != null ? nextProps.updatedDetail[k] : '';
      }
    }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle trigger event of file upload
   * @return                Nothing
   */
  handleClick(event) {
    if(this.refs.fileUploader.value){
      this.refs.fileUploader.value = "";
    }
    this.refs.fileUploader.click();
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle render page
   * @return                Nothing
   */
  render() {
        return (
          <div>
              <DoctorBasicInfoEdit
              basicInfoEditShow = {this.state.basicInfoEditShow}
              basicInfoEditHideHandle = {this.basicInfoEditHideHandle}
              payload         = {this.state.user}
              country         = {this.props.country}
              cities          = {this.props.cities}
              states          = {this.props.states}
              />
              <DoctorProfileImage
                basicInfoImageShow = {this.state.basicInfoImageShow}
                basicInfoImageHideHandle = {this.basicInfoImageHideHandle}
                profileImageUrl = {this.state.profileImage}
                validationMsg = {this.state.validationMsg}
              />
              <div className="col-md-3 rp">
                  <div className="inner-content doctor-view-section">
                      <div className="doctor-profile-img">
                           <div className="avatar">
                          {this.props.fetchRequest ? <img src={configConstants.PROFILE_LOAING} />
                            : <img src={(this.state.user.detail.doc_profile_img !== '') ? this.state.user.detail.doc_profile_img : configConstants.DEFAULT_IMAGE_PATH}
                           onClick={this.handleClick} />
                          }
                          <input type="file" id="file" ref="fileUploader" style={{display: "none"}} onChange={this._onChange}/>
                          </div>
                          <h3>Dr. {this.props.user.user_firstname+' '+this.props.user.user_lastname } </h3>
                          <h4>{this.state.user.detail.doc_deg_name}</h4>
                          <h5>{this.props.user.user_mobile}</h5>
                          { (this.state.user.detail.doc_short_info) ? <p>{this.state.user.detail.doc_short_info}</p> : ''}
                          <div className="row">
                              <div className="col-md-8">
                                  <div className="social-media">
                                    <a onClick={this.redirectToSocialUrl.bind(null,this.state.user.detail.doc_facebook_url)} target="_blank" className="btn icon-btn green"><FontAwesomeIcon icon={faFacebookF} /> </a>
                                      <a href={this.state.user.detail.doc_twitter_url ? this.state.user.detail.doc_twitter_url : 'javascript:void(0)'} target="_blank" className="btn icon-btn green"><FontAwesomeIcon icon={faTwitter} /> </a>
                                      <a href={this.state.user.detail.doc_linkedin_url ? this.state.user.detail.doc_linkedin_url : 'javascript:void(0)'} target="_blank" className="btn icon-btn green"><FontAwesomeIcon icon={faLinkedinIn} /> </a>
                                      <a href={this.state.user.detail.doc_google_url ? this.state.user.detail.doc_google_url : 'javascript:void(0)'} target="_blank" className="btn icon-btn green"><FontAwesomeIcon icon={faGooglePlusG} />  </a>
                                  </div>
                              </div>
                              <div className="profile-edit-img col-md-4 text-right">
                                  <a href="javascript:void(0);" onClick={this.basicInfoEditShowHandle} className="btn table-btn green">Edit</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for profile
 * @return                profile detail
 */
function mapStateToProps(state) {
    const { profileDetail, fetchRequest,isUserNotValid,state_id,doc_profile_img,updatedDetail} = state.doctorProfile;
    return {
        profileDetail,
        isUserNotValid,
        state_id,
        doc_profile_img,
        updatedDetail,
        fetchRequest,
        user: state.session.user
    };
}
const connectedDoctorBasicInfo = connect(mapStateToProps)(DoctorBasicInfo);
export { connectedDoctorBasicInfo as DoctorBasicInfo }

 
