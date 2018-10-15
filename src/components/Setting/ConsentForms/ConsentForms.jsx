import React from "react";
import { Button, Alert, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactTable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import { ConsentFormsSave } from './ConsentFormsSave';
import { configConstants } from './../../../_constants';
import { consentFormsActions } from './consentFormsActions';
/**
 * ConsentForms
 *
 * @package                SafeHealth
 * @subpackage             ConsentForms
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for add consentForm and show consentForm
 */
class ConsentForms extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.consentFormsSaveShowHandle = this.consentFormsSaveShowHandle.bind(this);
    this.consentFormsSaveHideHandle = this.consentFormsSaveHideHandle.bind(this);
    this.consentFormDeleteHandle = this.consentFormDeleteHandle.bind(this);
    this.consentFormSearch = this.consentFormSearch.bind(this);
    this.state = {
      consentFormsSaveShow: false,
      consentForm:this.initialState,
      title: 'Add Consent Form'
    };
  }

  /**
   * @DateOfCreation        10 June 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          consent_form_id       : '',
          consent_form_title    : '',
          consent_form_content  : '',
        },
        validate:{
          consent_form_title    : { isValid:true,message:''},
          consent_form_content  : { isValid:true,message:''},
        }
    }
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to show add/edit modal with value
   * @param                 List index Object
   * @return                Nothing
   */
  consentFormsSaveShowHandle(consentFormData) {
      if(consentFormData){
        const { detail,validate } = this.state.consentForm;
        this.setState({
          consentForm:{
            detail:{
            ...detail,
              consent_form_id      : consentFormData.consent_form_id,
              consent_form_title   : consentFormData.consent_form_title,
              consent_form_content : consentFormData.consent_form_content,
            },
            validate:{
              ...validate,
              'consent_form_title'    : {
                      isValid: true,
                      message: ''
                  },
              'consent_form_content'    : {
                      isValid: true,
                      message: ''
                  },
            }
          },
          title: 'Edit Consent Form'
        });
      }else{
          this.setState({
            consentForm :this.initialState,
          });
        }
      this.setState({ consentFormsSaveShow: true });
  } 

    /**
     * @DateOfCreation        23 Aug 2018
     * @ShortDescription      This function is responsible to get all Consent Form data
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(consentFormsActions.consentFormList());
    }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to check props and reset state, activeKey come 
                            from setting
   * @param                 List index Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if((nextProps.successMessage || nextProps.deleteErrorMsg) && nextProps.activeKey){
      this.setState({

      })
      setTimeout(function() { 
        this.setState({consentForm:this.initialState});
        const { dispatch }  = this.props;
        dispatch(consentFormsActions.resetState());
      }.bind(this), 500);
    }else if(nextProps.errorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(consentFormsActions.resetState());
      }.bind(this), 500);      
    }
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  consentFormsSaveHideHandle() {
    this.setState({ consentFormsSaveShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete consentForm request
   * @param int consentFormId consentForm id of perticular doctor
   * @return                Nothing
   */
  consentFormDeleteHandle(consentFormId){
     confirmAlert({
      title: 'ConsentForm delete',
      message: 'Are you sure you want to delete this consentForm?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(consentFormsActions.consentFormDelete(consentFormId, this.props.consentForms));  
          }
        },
        {
          label: 'No',
          onClick: () => {return false;}
        }
      ]
    })
  }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered consentForm list
   * @return                Nothing
   */
    consentFormSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }


  render() {
    return(
      <div>
        { this.state.deleteSuccessMessage &&
          <Alert bsStyle="success">
            { this.props.deleteSuccessMessage }
          </Alert>
        }
        { this.state.deleteErrorMsg &&                      
          <Alert bsStyle="danger">
            { this.props.deleteErrorMsg }
          </Alert>
        }
         <ConsentFormsSave
           consentFormsSaveShow = {this.state.consentFormsSaveShow}
           consentFormsSaveHideHandle = {this.consentFormsSaveHideHandle}
           consentFormData = { this.state.consentForm.detail}
           consentForms = {this.props.consentForms}
           title = {this.state.title}
        />
        <div className="col-md-12">
            <h4>Consent Forms</h4>
        </div>
        <div className="col-md-12 text-left">
            {this.props.loader ? <h4 className="Loader text-center text-success">Loading...</h4> : null}
            {this.props.consentForms && this.props.consentForms.length > 0 && this.props.consentForms.map((form, index) => {
                return (

                  <div className="col-md-2" key={index}>
                      <button className="green btn table-btn" id="dr_pass_change" onClick={this.consentFormsSaveShowHandle.bind(null, form)} >{form.consent_form_title}</button>
                  </div>
                );
              }
            )}
            <div className="col-md-2">
                <button className="green btn table-btn" id="dr_pass_change" onClick={this.consentFormsSaveShowHandle.bind(null, undefined)}  disabled={this.props.successMessage ? true : false}>+</button>
            </div>
        </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for consentForm 
 * @return                consentForm detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, consentForms, successMessage, deleteErrorMsg, errorMsg,deleteSuccessMessage, loader} = state.consentForms;
  return {
      pages,
      isUserNotValid,
      consentForms,
      successMessage,
      deleteSuccessMessage,
      deleteErrorMsg,
      errorMsg,
      loader
  };
}
const connectedConsentForms = connect(mapStateToProps)(ConsentForms);
export { connectedConsentForms as ConsentForms };