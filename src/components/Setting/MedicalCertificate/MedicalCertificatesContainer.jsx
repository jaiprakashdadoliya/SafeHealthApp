import React from "react";
import { connect } from 'react-redux';
import {SideMenu} from './../../SideMenu';
import {MedicalCertificates} from './MedicalCertificates';
import {SaveMedicalCertificateText} from './SaveMedicalCertificateText';
import {medicalCertificatesActions} from './medicalCertificatesActions';
import {medicalCertificatesConstants} from './medicalCertificatesConstants';
import { Loading } from './../../../global';
import { utilityHelper } from './../../../_helpers';
import Loadable from 'react-loadable';

const HeaderContainer = Loadable({
    loader: () => import('./../../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

class MedicalCertificatesContainer extends React.Component {

    constructor(props){
        super(props);
        this.editTextShowHandle = this.editTextShowHandle.bind(this);
        this.editTextHideHandle = this.editTextHideHandle.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.handleClose        = this.handleClose.bind(this);
        this.handleSave         = this.handleSave.bind(this);
        this.userInfo           = utilityHelper.getUserInfo();
        this.state              = this.initialState;
    }

    get initialState() {
        return {
            medicalCertificateTextData : {
                mc_id            : '',
                mc_text          : '',
                effect_date      : utilityHelper.getTodayDate(),
                certificate_date : utilityHelper.getTodayDate(),
            },
            title : medicalCertificatesConstants.MEDICAL_CERTIFICATES_EDIT_HEADING,
            editTextShow : false
        }
    }

    /**
     * @DateOfCreation        26 Sept 2018
     * @ShortDescription      This function is responsible to get the list of Clinical Notes from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(medicalCertificatesActions.getMedicalCertificatesData());
    }

    /**
     * @DateOfCreation        14 June 2018
     * @ShortDescription      This function is responsible to show clinic detail on edit clinic view.
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.isUpdateDone == true) {
            setTimeout(function() { 
                this.handleClose();
            }.bind(this), 2000);
        }else{
            const { medicalCertificateTextData } = this.state;
            if(newProps.isMedicalCertificatesDataFetched && newProps.medicalCertificatesData) {
                if(newProps.medicalCertificatesData.mc_id){
                    this.setState({
                        medicalCertificateTextData : {
                            ...medicalCertificateTextData,
                            mc_id : newProps.medicalCertificatesData.mc_id,
                            mc_text_old : newProps.medicalCertificatesData.mc_text,
                            mc_text : newProps.medicalCertificatesData.mc_text,
                        }
                    });
                }
            }else{
                if(!newProps.errorMsg){
                    this.setState({medicalCertificateText : ''});
                }
            }
        }
    }

    editTextShowHandle(){
        this.setState({
            editTextShow : true
        });
    }

    editTextHideHandle(){
        this.setState({
            editTextShow : false
        });
    }

    /**
     * @DateOfCreation        27 Sept 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(value,name) {
        const { medicalCertificateTextData } = this.state;
        this.setState({
            medicalCertificateTextData : {
                ...medicalCertificateTextData,
                [name] : value
            }
        });
    }

    handleClose(){
        const { dispatch } = this.props;
        dispatch(medicalCertificatesActions.resetState());
        // this.setState(this.initialState);
        this.editTextHideHandle();
    }

    handleSave(){
        const { medicalCertificateTextData } = this.state;
        const { dispatch } = this.props;
        dispatch(medicalCertificatesActions.medicalCertificateTextSave(medicalCertificateTextData));
    }

    render() {
      if(this.props.isMedicalCertificatesDataFetched){
            return (
                <div className="page-container">  
                    <MedicalCertificates 
                        editTextShowHandle = {this.editTextShowHandle}
                        medicalCertificateTextData = {this.state.medicalCertificateTextData}
                        userInfo            = { this.userInfo  }
                        handleChange        = { this.handleChange }
                    />
                    <SaveMedicalCertificateText 
                        editTextHideHandle  = { this.editTextHideHandle } 
                        editTextShow        = { this.state.editTextShow } 
                        handleChange        = { this.handleChange }
                        handleClose         = { this.handleClose }
                        handleSave          = { this.handleSave }
                        message             = { this.props.successMessage }
                        errorMsg            = { this.props.errorMsg }
                        title               = { this.state.title }
                        isTextSaved         = { this.props.isUpdateDone }
                        payload             = { this.state.medicalCertificateTextData.mc_text }
                    />
                </div>
            );
      } else {
            return(<Loading />);
        }
    }
}

/**
 * @DateOfCreation        3 Sept 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { sendingRequest, successMessage, errorMsg, isUserNotValid, isUpdateDone, medicalCertificatesData, isMedicalCertificatesDataFetched } = state.medicalCertificates;
    
    return {
        successMessage,
        errorMsg,
        medicalCertificatesData,
        isMedicalCertificatesDataFetched,
        isUpdateDone,
        user_type:state.session.user.user_type
    };
}

// Connection with State 
const connectedMedicalCertificatesContainer = connect(mapStateToProps)(MedicalCertificatesContainer);
export { connectedMedicalCertificatesContainer as MedicalCertificatesContainer };
