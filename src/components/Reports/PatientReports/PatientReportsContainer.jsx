import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import moment from "moment";
import { Loading } from './../../../global';
import { PatientReports } from "./PatientReports";
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import PatientReportsFormConfig from './PatientReportsFormConfig';
import { regionActions, newPatientActions } from '../../../_actions';
import { patientReportsActions } from './patientReportsActions';

class PatientReportsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.defaultState = {
            PatientReportsFormConfig: PatientReportsFormConfig,
            pages               : 0,
            filtered            : [],
            sorted              : [],
            extraSearchFilter   : {
                state_id        : '',
                city_id         : '',
                group_id        : '',
                doc_ref_id      : '',
                symptoms_id     : '',
                diagnosis_id    : '',
                from_date       : '',
                to_date         : '',
                export_type     : '',
            }
        }; 
        this.state = this.defaultState;

        this.boundPatientReportsForm        = undefined;
        this.handlePatientReportsFormUpdate = this.handlePatientReportsFormUpdate.bind(this);

        this.isStateSet         = false;       
        this.isCitySet          = false;       
        this.stateLoad          = true;
        this.stateLoad          = true;
        this.patientGroupsLoad  = true;
        this.referralsLoad      = true;
        this.countryDataCall    = true;
        this.filterDataLoad     = true;
        this.isStateFirstOption = false;
        this.isCityFirstOption = false;

        this.getStateByCountry              = this.getStateByCountry.bind(this);
        this.getReportByState               = this.getReportByState.bind(this);
        this.getReportByCity                = this.getReportByCity.bind(this);
        this.getReportByGroup               = this.getReportByGroup.bind(this);
        this.getReportByReferredDoctor      = this.getReportByReferredDoctor.bind(this);
        this.getReportBySymptomsComplaint   = this.getReportBySymptomsComplaint.bind(this);
        this.getReportByDiagnosis           = this.getReportByDiagnosis.bind(this);
        this.getReportByFromDate           = this.getReportByFromDate.bind(this);
        this.getReportByToDate             = this.getReportByToDate.bind(this);
        this.getFilteredPatientList         = this.getFilteredPatientList.bind(this);
        this.filteredPatientSearch          = this.filteredPatientSearch.bind(this);
        this.handleReportExport             = this.handleReportExport.bind(this);
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to fx form input state data
     * @return                Redirect
     */
    handlePatientReportsFormUpdate(data){
        this.boundPatientReportsForm = data;
    }

    componentWillMount(){

        const { dispatch, patId } = this.props;
        dispatch(regionActions.getCountry());

        dispatch(newPatientActions.getReferralDoctor());
        dispatch(newPatientActions.getPatientGroups());
        dispatch(patientReportsActions.getReportsFilterData(['symptoms', 'disease']));

        // Set state
        const { handlers }                  = this.state.PatientReportsFormConfig;
        const { PatientReportsFormConfig }  = this.state;
        this.setState({
            PatientReportsFormConfig:{
                ...PatientReportsFormConfig,
                handlers:{
                    ...handlers,
                    patient_state_handle        : this.getReportByState,
                    patient_city_handle         : this.getReportByCity,
                    patient_group_handle        : this.getReportByGroup,
                    patient_referred_by_handle  : this.getReportByReferredDoctor,
                    patient_complaint_handle    : this.getReportBySymptomsComplaint,
                    patient_diagnosis_handle    : this.getReportByDiagnosis,
                    patient_from_date_handle    : this.getReportByFromDate,
                    patient_to_date_handle      : this.getReportByToDate
                }
            }
        }); 
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get state api by country id
     * @return                Redirect
     */
    getStateByCountry(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getStates(id));
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get city api by state id and filter patients by state id
     * @return                Redirect
     */
    getReportByState(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getCities(id));

        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                state_id    : id,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
        
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get patient list api by city id
     * @return                Redirect
     */
    getReportByCity(id){
        const { dispatch } = this.props;

        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                city_id     : id,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);
        });

    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by group id
     * @return                Redirect
     */
    getReportByGroup(id){
        const { dispatch } = this.props;
        
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                group_id    : id,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by referred doctor id
     * @return                Redirect
     */
    getReportByReferredDoctor(id){
        
        const { dispatch } = this.props;
        
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                doc_ref_id : id,
                export_type: ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by symptoms id
     * @return                Redirect
     */
    getReportBySymptomsComplaint(id){
        const { dispatch } = this.props;
        
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                symptoms_id : id,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by diagnosis id
     * @return                Redirect
     */
    getReportByDiagnosis(id){
        const { dispatch } = this.props;
        
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                diagnosis_id : id,
                export_type  : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        11 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by From date (patient created date)
     * @return                Redirect
     */
    getReportByFromDate(fromDate){
        let date = moment(fromDate).format(configConstants.DATE_FORMAT_DB);
        
        const { dispatch } = this.props;
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                from_date   : date,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        11 Oct 2018
     * @ShortDescription      This function is responsible to call get report patient list api by To date (patient created date)
     * @return                Redirect
     */
    getReportByToDate(toDate){
        let date = moment(toDate).format(configConstants.DATE_FORMAT_DB);
        
        const { dispatch } = this.props;
        const { extraSearchFilter } = this.state;

        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                to_date     : date,
                export_type : ''
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });

        // Set From date before 1 month if only To date selected
        if(extraSearchFilter.from_date == ''){
            const { PatientReportsFormConfig } = this.state;
            var fields = PatientReportsFormConfig['fields'];

            for(var fc in fields){
                var fieldName = fields[fc]['name'];
        
                if(fieldName == 'patient_from_date'){
                    fields[fc]['value'] = moment(date).subtract(1, 'months');

                    this.boundPatientReportsForm.setFieldData({patient_from_date: fields[fc]['value']});
                }
            }
        }
    }

    /**
     * @DateOfCreation        10 Oct 2018
     * @ShortDescription      This function is responsible to call export report by selected type
     * @return                Redirect
     */
    handleReportExport(exportType){
        const { dispatch } = this.props;
        
        const { extraSearchFilter } = this.state;
        this.setState({
            extraSearchFilter : {
                ...extraSearchFilter,
                export_type : exportType
            }
        }, function(){
            this.getFilteredPatientList(this.state.pages, 10, this.state.sorted, this.state.filtered);            
        });
    }

    /**
     * @DateOfCreation        9 Oct 2018
     * @ShortDescription      This function is responsible to get patient list from api
     * @return                Nothing
     */
    getFilteredPatientList(page, pageSize, sorted, filtered){
        const { dispatch } = this.props;
        let $filterData = {};
        $filterData['page']     = page;
        $filterData['filtered'] = filtered;
        $filterData['sorted']   = sorted;
        $filterData['pageSize'] = pageSize;

        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([ $filterData, this.state.extraSearchFilter ]);

        dispatch(patientReportsActions.getReportPatients(finalData));
    }

    /**
     * @DateOfCreation        9 Oct 2018
     * @ShortDescription      This function is responsible to handle load filtered patients list
     * @return                Nothing
     */
    filteredPatientSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
     * @DateOfCreation        18 June 2018
     * @ShortDescription      This function is responsible to updated State
     * @return                Nothing
     */
    componentWillReceiveProps(props) {

        const { dispatch } = this.props;
        
        //set country
        if(props.country && this.countryDataCall){
            let countryData = utilityHelper.getCountry(props.country,'country_id','country_name');
            const { data }  = this.state.PatientReportsFormConfig;
            const { PatientReportsFormConfig } = this.state;
            
            let countryId = '';
            countryId     = countryData[0].hasOwnProperty('value') ? countryData[0].value : '' ;
            if(countryId != ''){
                this.countryDataCall = false;
                this.getStateByCountry(countryId);
            }
        }

        // set states
        if(props.states != undefined && this.stateLoad){

            if(props.states.length > 0 && props.states[0].id != ''){
                let firstOption = {'id': '', 'name' : '-- Select --'}
                props.states.unshift(firstOption); // ADD NEW OPTION ON FIRST POSITION
            }

            let stateData = utilityHelper.getDataConvertToOptionType(props.states,'name','id');
            const { data } = this.state.PatientReportsFormConfig;
            const { PatientReportsFormConfig } = this.state;
            this.setState({
                PatientReportsFormConfig:{
                    ...PatientReportsFormConfig,
                    data:{
                        ...data,
                        patient_state_data:stateData
                    }
                }
            }, function(){
                this.isStateSet = true;       
                this.stateLoad  = false;
                // this.isCitySet  = false;
            }); 
        }

        // set cities
        if(props.cities != undefined && this.isStateSet){
            this.citiesLoad = false;
            
            if(props.cities.length > 0 && props.cities[0].id != ''){
                let firstCityOption = {'id': '', 'name' : '-- Select --'}
                props.cities.unshift(firstCityOption); // ADD NEW OPTION ON FIRST POSITION
            }

            let cityData    = utilityHelper.getDataConvertToOptionType(props.cities,'name','id');
            const { data }  = this.state.PatientReportsFormConfig;

            const { PatientReportsFormConfig } = this.state;
            this.setState({
                PatientReportsFormConfig:{
                    ...PatientReportsFormConfig,
                    data:{
                        ...data,
                        patient_city_data:cityData
                    }
                }
            }, function(){
                this.stateLoad  = true;
                // this.isCitySet  = true;
                this.isStateSet = false;
            });            
        }

        // set Patient Group
        if(props.patientGroups && props.isPatientGroupsFetchDone && this.patientGroupsLoad){
            this.patientGroupsLoad  = false;

            if(props.patientGroups.length > 0 && props.patientGroups[0].pat_group_id != ''){
                let firstGroupOption = {'pat_group_id': '', 'pat_group_name' : '-- Select --'}
                props.patientGroups.unshift(firstGroupOption); // ADD NEW OPTION ON FIRST POSITION
            }
            
            let patientGroupsData   = utilityHelper.getDataConvertToOptionType(props.patientGroups, 'pat_group_name', 'pat_group_id');
            const { data }          = this.state.PatientReportsFormConfig;
            const { PatientReportsFormConfig } = this.state;
            this.setState({
                PatientReportsFormConfig:{
                    ...PatientReportsFormConfig,
                    data:{
                        ...data,
                        patient_group_data:patientGroupsData
                    }
                }
            });
        }

        // set Referral Doctor
        if(props.referralDoctor && props.isReferralDoctorFetchDone && this.referralsLoad){
            this.referralsLoad  = false;

            if(props.referralDoctor.length > 0 && props.referralDoctor[0].doc_ref_id != ''){
                let firstRefOption = {'doc_ref_id': '', 'doc_ref_name' : '-- Select --'}
                props.referralDoctor.unshift(firstRefOption); // ADD NEW OPTION ON FIRST POSITION
            }

            let referralData    = utilityHelper.getDataConvertToOptionType(props.referralDoctor,'doc_ref_name','doc_ref_id');
            const { data, fields } = this.state.PatientReportsFormConfig;
            
            const { PatientReportsFormConfig } = this.state;
            this.setState({
                PatientReportsFormConfig:{
                    ...PatientReportsFormConfig,
                    data:{
                        ...data,
                        patient_referred_by_data:referralData
                    }
                }
            });

            // RESET FROM DATE IF FROM DATE IS SET BY SETFIELDDATA FUNCTION
            for(var fc in fields){
                if(fields[fc]['name'] == 'patient_from_date'){
                    this.boundPatientReportsForm.setFieldData({patient_from_date: undefined});
                }
            }
        }

        // SET Complaint and diagnosis data
        if(props.filterData && props.isFilterDataFetched && this.filterDataLoad){
            this.filterDataLoad = false;

            if(props.filterData.symptoms.length > 0 && props.filterData.symptoms[0].symptom_id != ''){
                let firstSymptomsOption = {'symptom_id': '', 'symptom_name' : '-- Select --'}
                props.filterData.symptoms.unshift(firstSymptomsOption); // ADD NEW OPTION ON FIRST POSITION
            }

            if(props.filterData.disease.length > 0 && props.filterData.disease[0].disease_id != ''){
                let firstDiseaseOption = {'disease_id': '', 'disease_name' : '-- Select --'}
                props.filterData.disease.unshift(firstDiseaseOption); // ADD NEW OPTION ON FIRST POSITION
            }

            let symptomsData    = utilityHelper.getDataConvertToOptionType(props.filterData.symptoms,'symptom_name','symptom_id');
            let diagnosisData   = utilityHelper.getDataConvertToOptionType(props.filterData.disease,'disease_name','disease_id');
            const { data }      = this.state.PatientReportsFormConfig;
            const { PatientReportsFormConfig } = this.state;
            this.setState({
                PatientReportsFormConfig:{
                    ...PatientReportsFormConfig,
                    data:{
                        ...data,
                        patient_complaint_data:symptomsData,
                        patient_diagnosis_data:diagnosisData
                    }
                }
            });
        }
    }

    render () {

        return (
            <PatientReports 
                handlePatientReportsFormUpdate  = {this.handlePatientReportsFormUpdate}
                PatientReportsFormConfig        = {this.state.PatientReportsFormConfig}
                filterPatientData               = {this.props.filterPatientData}
                getFilteredPatientList          = {this.getFilteredPatientList}
                filterAll                       = {this.state.filterAll}
                filtered                        = {this.state.filtered}
                filteredPatientSearch           = {this.filteredPatientSearch}
                handleReportExport              = {this.handleReportExport}
            />
        );
    }
}

/**
 * @DateOfCreation        4 Oct 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { filterData, isFilterDataFetched, filterPatientData, isFilterPatientDataFetched }    = state.patientReports;
    const { referralDoctor, isReferralDoctorFetchDone, isPatientGroupsFetchDone, patientGroups, } = state.newPatient;
    const { country, states, cities } = state.region;
    return {
        filterData, isFilterDataFetched, filterPatientData, isFilterPatientDataFetched,
        country, states, cities,
        referralDoctor, isReferralDoctorFetchDone, isPatientGroupsFetchDone, patientGroups
    };
}

const connectedPatientReportsContainer = connect(mapStateToProps)(PatientReportsContainer);
export { connectedPatientReportsContainer as PatientReportsContainer };
