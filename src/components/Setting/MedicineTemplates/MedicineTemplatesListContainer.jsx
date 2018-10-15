import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { medicineTemplatesActions } from './medicineTemplatesActions';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { patientDashboardProfileAction } from '../../PatientProfile/patientDashboardProfileAction';
import { confirmAlert } from 'react-confirm-alert';
import validator from 'validator';

const MedicineTemplatesList = Loadable({
    loader: () => import('./MedicineTemplatesList').then(object => object.MedicineTemplatesList),
    loading: Loading
});

const MedicineTemplatesContainer = Loadable({
    loader: () => import('./MedicineTemplatesContainer').then(object => object.MedicineTemplatesContainer),
    loading: Loading
});

class MedicineTemplatesListContainer extends React.Component {
    constructor(props){
        super(props);

       this.deleteMedicationRecord       = this.deleteMedicationRecord.bind(this);
        this.handleChange                 = this.handleChange.bind(this);
        this.handleClose                  = this.handleClose.bind(this);
        this.getMedicineTemplate          = this.getMedicineTemplate.bind(this);
        this.medicineSaveAsTemplate       = this.medicineSaveAsTemplate.bind(this);
        this.medicationModalShowHandle    = this.medicationModalShowHandle.bind(this);
        this.viewMedicineTemplate         = this.viewMedicineTemplate.bind(this);
        this.loadTemplateList             = this.loadTemplateList.bind(this);
        this.templateSearch               = this.templateSearch.bind(this);
        this.state = {
            newMedicationModalShow  : false,
            medicationTemplateModalShow: false,
            medicationChartModalShow: false,
            medicationEditData      : [],
            pages                   : 0,
            filtered                : [],
            filterAll               : '',
            medicine                : this.initialState,
            medicineTemplateList    : [],
            templateSelectionAlert  : false,
            AlertMsg                :'',
            viewTemplateFlag        : false
        };
    }

    get initialState(){
        return {
                template:{
                    temp_name:'',
                    pat_med_temp_id:'',
                    template_select:''
                },
                validate:{
                    temp_name:{
                        isValid:true,
                        message:''
                    }
                }
            }
    }

    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to handle the close event of add modal
     * @return                Nothing
     */
    handleClose() {
        let { temp_name } = this.state.medicine.template;
        this.setState({
            temp_name:'',
            pat_med_temp_id:'',
            template_select:''
        });
        this.medicationModalHideHandle();
    }

    isTemplateValid() {
        const { template, validate, medicine } = this.state.medicine;
        const validationState = {};
        if (validator.isEmpty(validator.trim(template.temp_name))) {
          validationState.temp_name = {
                isValid: false,
                message: 'Template name is required.'
            }
        }
         if(!utilityHelper.isObjectEmpty(validationState)){
            this.setState({
                medicine: {
                    template: {
                        ...template
                    },
                    validate:{
                        ...validate,
                        ...validationState
                    }
                }
            });
            return false;
        }else{
            return true;
        }
    }



    /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                        so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { template, validate, medicine } = this.state.medicine;
    this.setState({
        medicine: {
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
            template: {
                ...template,
                [name]: value
            }
        }
    });
  }


    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle show medication add/edit pop-up
    * @return                Redirect
    */
    medicationModalShowHandle(templateId) {
        this.setState({medicationTemplateModalShow: true});
        const { template, temp_name,pat_med_temp_id, validate, medicine } = this.state;
        if(templateId != ''){
            let index = this.props.medicineTempList.findIndex(i => i.pat_med_temp_id == templateId);
            let templateData = this.props.medicineTempList[index].temp_name;
            this.setState({
                medicine: {
                    template: {
                        ...template,
                        temp_name : templateData,
                        pat_med_temp_id: templateId
                    },
                    validate:{
                         temp_name:{
                            isValid:true,
                            message:''
                        }
                    }
                }
            });
        }else{
           this.setState({
                medicine: {
                    template: {
                        ...template,
                        temp_name : '',
                        pat_med_temp_id: ''
                    },
                    validate:{
                         temp_name:{
                            isValid:true,
                            message:''
                        }
                    }
                }
            });
        }
    } 

    medicationModalHideHandle(){
        this.setState({
            medicationTemplateModalShow: false
        })
    }


    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get the list of Medicines from API
     * @return                Nothing
     */
    getMedicineTemplate(page, pageSize, sorted, filtered) {
        const { dispatch } = this.props;
        dispatch(medicineTemplatesActions.getMedicineTemplate(page, pageSize, sorted, filtered));          
    }


   /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel save as template medication data
    * @return                Redirect
    */
    medicineSaveAsTemplate(){
        const { dispatch } = this.props;
        let data = {};
        if(this.isTemplateValid()){
            data['temp_name']      = this.state.medicine.template.temp_name;
            data['pat_med_temp_id']      = this.state.medicine.template.pat_med_temp_id;
            if(data['pat_med_temp_id'] != ''){
                dispatch(medicineTemplatesActions.medicineUpdateTemplateList(data,this.props.medicineTempList)); 
            }else{
                dispatch(medicineTemplatesActions.medicineSaveAsTemplate(data,this.props.medicineTempList));        
            }
        }
    }


    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get patient medication details
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const { dispatch } = this.props;

        if(props.isUpdateDone || props.templateSaveMSg || props.errorMsg){
             setTimeout(function(){
                this.handleClose();
                dispatch(medicineTemplatesActions.resetState());
            }.bind(this),1000);
        }
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    viewMedicineTemplate(templateData){
        this.setState({
            viewTemplateFlag : true
        });
        const { template, temp_name,pat_med_temp_id, validate, medicine } = this.state;
        this.setState({
                medicine: {
                    template: {
                        ...template,
                        temp_name: templateData.temp_name,
                        pat_med_temp_id: templateData.pat_med_temp_id
                    },
                    validate:{
                         temp_name:{
                            isValid:true,
                            message:''
                        }
                    }
                }
            });
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel delete request medication data
    * @return                Redirect
    */
    deleteMedicationRecord(pat_med_temp_id){
       const { dispatch } = this.props;
        confirmAlert({
            title: 'Medications',
            message: <div className="alert-message">Are you sure you want to delete this medicine template?</div>,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(medicineTemplatesActions.medicineTemplateDelete(pat_med_temp_id, this.props.medicineTempList));  
                    }
                },
                {
                    label: 'No',
                    onClick: () => {return false;}
                }
            ]
        })        
    }


    loadTemplateList(){
        if(this.state.viewTemplateFlag){
            this.setState({
                viewTemplateFlag: false
            })
        }
    }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered template list
   * @return                Nothing
   */
      templateSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
      }

    render() {
        if(this.state.viewTemplateFlag){
            return (
            <div >
                <MedicineTemplatesContainer 
                    templatePayload = {this.state.medicine.template}
                    loadTemplateList = {this.loadTemplateList}
                />
            </div>
            );
        }else{
            return (
                <div >
                    <MedicineTemplatesList 
                        newMedicationModalShow           = {this.state.newMedicationModalShow}
                        medicationModalShowHandle        = {this.medicationModalShowHandle}
                        medicationModalHideHandle        = {this.medicationModalHideHandle}
                        medicationTemplateModalShow      = {this.state.medicationTemplateModalShow}
                        deleteMedicationRecord           = {this.deleteMedicationRecord}
                        payload                          = {this.state} 
                        errorMsg                         = {this.props.errorMsg}
                        sendingRequest                   = {this.props.sendingRequest}
                        filterAll                        = { this.state.filterAll }
                        filtered                         = { this.state.filtered }
                        pages                            = { this.props.pages }
                        medicineData                     = { this.props.medicineData }
                        user_type                        = { this.props.user_type }
                        templateSaveMSg                  = { this.props.templateSaveMSg}
                        templateUpdateMSg                  = { this.props.templateUpdateMSg}
                        handleChange                     = { this.handleChange }
                        handleClose                      = { this.handleClose }
                        medicineTempList                 = { this.props.medicineTempList }
                        getMedicineTemplate              = { this.getMedicineTemplate }
                        templateSelectionAlert           = { this.state.templateSelectionAlert}
                        AlertMsg                         = { this.state.AlertMsg}
                        medicineSaveAsTemplate           = { this.medicineSaveAsTemplate}
                        viewMedicineTemplate             = { this.viewMedicineTemplate}
                        templateSearch                   = { this.templateSearch}
                    />
                </div>
            );
        }

    }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMessage, errorMsg, sendingRequest, isUpdateDone, isUserNotValid, medicineData,templateSaveMSg,medicineTempList,templateUpdateMSg,isFatchDone, pages} = state.medicineTemplates;
    //const { pages, patientMedicationList }  = state.patientProfileDashboard;

    return {
        successMessage,
        errorMsg,
        sendingRequest,
        isUpdateDone, 
        isUserNotValid,
       // patientMedicationList,
        pages,
        medicineData,
        user_type:state.session.user.user_type,
        templateSaveMSg,
        medicineTempList,
        templateUpdateMSg,
        isFatchDone,
        pages
    };
}

// Connection with State 
const connectedMedicineTemplatesListContainer = connect(mapStateToProps)(MedicineTemplatesListContainer);
export { connectedMedicineTemplatesListContainer as MedicineTemplatesListContainer };