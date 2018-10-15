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

const MedicineTemplates = Loadable({
    loader: () => import('./MedicineTemplates').then(object => object.MedicineTemplates),
    loading: Loading
});

class MedicineTemplatesContainer extends React.Component {
    constructor(props){
        super(props);

        this.newMedicationModalShowHandle = this.newMedicationModalShowHandle.bind(this);
        this.submitMedicationData         = this.submitMedicationData.bind(this);
        this.getMedicineDataByMedicine    = this.getMedicineDataByMedicine.bind(this);
        this.deleteMedicationRecord       = this.deleteMedicationRecord.bind(this);
        this.medicationFormData           = this.medicationFormData.bind(this);
        
        this.newMedicationModalHideHandle = this.newMedicationModalHideHandle.bind(this);
        
        this.flag = true;

        this.state = {
            newMedicationModalShow  : false,
            medicationEditData      : [],
            pages                   : 0,
            filtered                : [],
            filterAll               : '',
            medicine                : this.initialState,
            medicineTemplateList    : [],
            templateSelectionAlert  : false,
            AlertMsg                :'',
        };
    }

    get initialState(){
        return {
                template:{
                    temp_name:'',
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
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle show medication add/edit pop-up
    * @return                Redirect
    */
    newMedicationModalShowHandle(medicationData) {
        let medData = [];
            if(medicationData != ''){
                medData = medicationData;
            }
            this.setState({ 
                medicationEditData : medData,
                newMedicationModalShow: true,
            });
        
    } 
    
    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle hide medication add/edit pop-up
    * @return                Redirect
    */
    newMedicationModalHideHandle() {
        const { dispatch }  = this.props;
        dispatch(medicineTemplatesActions.resetState());

        this.setState({ newMedicationModalShow: false });
    }


    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get the list of Medicines from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(medicineTemplatesActions.getMedicineList()); 
        var selectData = {
                'pat_med_temp_id': this.props.templatePayload.pat_med_temp_id, 
            }
            dispatch(medicineTemplatesActions.getTemplate(selectData))  
    }



    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel submit medication data
    * @return                Redirect
    */
    submitMedicationData(data){
        const { dispatch } = this.props;
       
        let extraData               = {};
        extraData['pat_id']         = this.props.patId;
        extraData['visit_id']       = this.props.visitId;
                
        let medicationData = utilityHelper.mergeMultipleObject([data, extraData]);

        dispatch(medicineTemplatesActions.newMedicationSubmit(medicationData));        
    }


    medicationFormData(data){
        const { dispatch } = this.props;
         var { medicineTemplateList } = this.state;
         if(this.props.patientMedicationData.length > 0){
            this.setState({medicineTemplateList : this.props.patientMedicationData});
            medicineTemplateList[medicineTemplateList.length] = data;
        }else{
                if(Object.keys(medicineTemplateList).length > 0){
                    for(var key in medicineTemplateList){
                        if((medicineTemplateList[key].medicine_name !=  data.medicine_name) && (medicineTemplateList[key].medicine_dose_unit !=  data.medicine_dose_unit)){
                          medicineTemplateList.push(data);
                          break;  
                        }
                    }
                }else{
                    medicineTemplateList.push(data);
                }
            this.setState({medicineTemplateList : medicineTemplateList}); 
        }
        let selectData = {
            'pat_med_temp_id': this.props.templatePayload.pat_med_temp_id, 
            'medication_data': JSON.stringify(this.state.medicineTemplateList)
        }
        dispatch(medicineTemplatesActions.medicineUpdateTemplate(selectData)); 
    }
    

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel submit medication data
    * @return                Redirect
    */
    getMedicineDataByMedicine(medicineId){
        const { dispatch } = this.props;
       
        let extraData               = {};
        extraData['medicine_id']    = medicineId;
                
        let medicineData = utilityHelper.mergeMultipleObject([extraData]);
       dispatch(medicineTemplatesActions.getMedicineDataAction(medicineData)); 

    }

    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get patient medication details
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const { dispatch, visitId, patId } = this.props;
        
        if(props.templateSaveMSg || props.errorMsg){
            const { medicineTemplateList } = this.state;
            setTimeout(function(){
                dispatch(medicineTemplatesActions.resetState());
                this.setState({
                    medicineTemplateList: []
                })
            }.bind(this),1000);
        }

        if( props.templateSaveMSg && props.patientMedicationData.length > 0){
            this.setState({
                medicineTemplateList : props.patientMedicationData,
            });
           
        }


        if(props.isFatchDone && !props.isUpdateDone){
            this.setState({
                medicineTemplateList : props.patientMedicationData,
            });
        }


        if(props.isUpdateDone){
             setTimeout(function(){
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



    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel delete request medication data
    * @return                Redirect
    */
    deleteMedicationRecord(medicationId){
        const { dispatch } = this.props;
       
        confirmAlert({
            title: 'Medications',
            message: <div className="alert-message">Are you sure you want to delete this medication record?</div>,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        var medicineList = this.state.medicineTemplateList.filter(function(item) {
                            return item.medicine_id !== medicationId
                        });
                        this.setState({medicineTemplateList : medicineList},function(){
                            let selectData = {
                                'pat_med_temp_id': this.props.templatePayload.pat_med_temp_id, 
                                'medication_data': JSON.stringify(this.state.medicineTemplateList)
                            }
                            dispatch(medicineTemplatesActions.medicineUpdateTemplate(selectData));   
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {return false;}
                }
            ]
        })        
    }

    render() {
        return (
            <div >
                <MedicineTemplates 
                    newMedicationModalShow           = {this.state.newMedicationModalShow}
                    newMedicationModalShowHandle     = {this.newMedicationModalShowHandle}
                    newMedicationModalHideHandle     = {this.newMedicationModalHideHandle}
                    submitMedicationData             = {this.submitMedicationData}
                    getMedicineDataByMedicine        = {this.getMedicineDataByMedicine}
                    deleteMedicationRecord           = {this.deleteMedicationRecord}
                    payload                          = {this.state}
                    templatePayload                  = {this.props.templatePayload} 
                    medicineList                     = {this.props.medicineList}
                    patientid                        = {this.props.patId}
                    visitId                          = {this.props.visitId}
                    successMsg                       = {this.props.successMessage}
                    errorMsg                         = {this.props.errorMsg}
                    sendingRequest                   = {this.props.sendingRequest}
                    isEditSuccess                    = {this.props.isEditSuccess}
                    filterAll                        = { this.state.filterAll }
                    filtered                         = { this.state.filtered }
                    pages                            = { this.props.pages }
                    medicineData                     = { this.props.medicineData }
                    user_type                        = { this.props.user_type }
                    templateSaveMSg                  = { this.props.templateSaveMSg}
                    templateUpdateMSg                  = { this.props.templateUpdateMSg}
                    medicineTempList                 = { this.props.medicineTempList }
                    medicationFormData               = { this.medicationFormData}
                    patientMedicationData            = { this.state.medicineTemplateList}
                    loadTemplateList                 = { this.props.loadTemplateList}

                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMessage, errorMsg, isInsertDone, sendingRequest, isUpdateDone, medicineList, patientMedicationData,isUserNotValid, isEditSuccess, medicineData,templateSaveMSg,medicineTempList,blankData,templateUpdateMSg,isFatchDone} = state.medicineTemplates;
    const { pages, patientMedicationList }  = state.patientProfileDashboard;

    return {
        successMessage,
        errorMsg,
        isInsertDone,
        medicineList,
        sendingRequest,
        isUpdateDone, 
        patientMedicationData,
        isEditSuccess,
        isUserNotValid,
        patientMedicationList,
        pages,
        medicineData,
        user_type:state.session.user.user_type,
        templateSaveMSg,
        medicineTempList,
        blankData,
        templateUpdateMSg,
        isFatchDone
    };
}

// Connection with State 
const connectedMedicineTemplatesContainer = connect(mapStateToProps)(MedicineTemplatesContainer);
export { connectedMedicineTemplatesContainer as MedicineTemplatesContainer };