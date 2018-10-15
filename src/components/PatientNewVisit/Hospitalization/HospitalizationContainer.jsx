import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import moment from "moment";

const Hospitalization = Loadable({
    loader: () => import('./Hospitalization' /* webpackChunkName = "Hospitalization" */).then(object => object.Hospitalization),
    loading: Loading
});

export class HospitalizationContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormHispitalization               = undefined;
	    this.boundFormHispitalizationReferance      = undefined;
        this.handleBoundFormHispitalizationUpdate   = this.handleBoundFormHispitalizationUpdate.bind(this);
        this.handleBoundFormHispitalizationReferance= this.handleBoundFormHispitalizationReferance.bind(this);
        this.getHospitalizationData                 = this.getHospitalizationData.bind(this);
        this.handleSelectChange                     = this.handleSelectChange.bind(this);
        this.handleChangeDate                       = this.handleChangeDate.bind(this);
        this.handleInputChange                      = this.handleInputChange.bind(this);

        this.state  = {};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormHispitalizationUpdate(data){
        this.boundFormHispitalization = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormHispitalizationReferance(data){
        this.boundFormHispitalizationReferance = data;
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getDiagnosisData() {
       return this.state;
    }

    getHospitalizationData() {
       if(this.boundFormHispitalization && this.boundFormHispitalizationReferance){
            let data          = this.boundFormHispitalization.getData();
            let dataReferance = this.boundFormHispitalizationReferance.getData();
            let dataTable     = this.getDiagnosisData();
            if (data && dataReferance && dataTable) {
                return utilityHelper.mergeMultipleObject([data, dataReferance, dataTable]);

            } 
       }
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleSelectChange(selectedOption, name) {
        let state = this.state; 
        this.setState({
            ...state,
            [name] : selectedOption.value
        });
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleChangeDate(date, name) {
        let state = this.state; 
        let dateValue = moment(date).format("DD/MM/YYYY");

        this.setState({
            ...state,
            [name]: dateValue
        });
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to handle changes in input state
     * @param                 Event Object
     * @return                Nothing
     */
    handleInputChange(event) {
        let state = this.state; 
        const { name, value } = event.target;

        this.setState({
            ...state,
            [name] : value
        });
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, hospitalizationTableFormData, hospitalizationFormData, hospitalizationReferenceFormData } = this.props;
        if(typeof hospitalizationTableFormData === 'object'){
            let defaultState = {};
            this.props.hospitalizationTableFormData.map( (checkFactor, index) => {  
                let date                = 'hospitalization_date_'+checkFactor.hospitalization_fector_id;
                let diagnosisDetails    = 'hospitalization_diagnosis_details_'+checkFactor.hospitalization_fector_id;
                let duration            = 'hospitalization_duration_'+checkFactor.hospitalization_fector_id;
                let durationUnit        = 'hospitalization_duration_unit_value_'+checkFactor.hospitalization_fector_id;

                defaultState[date]              = checkFactor[date] != undefined ? checkFactor[date] : '';
                defaultState[diagnosisDetails]  = checkFactor[diagnosisDetails] != undefined ? checkFactor[diagnosisDetails] : '';
                defaultState[duration]          = checkFactor[duration] != undefined ? checkFactor[duration] : '';
                defaultState[durationUnit]      = checkFactor[durationUnit] != undefined ? checkFactor[durationUnit] : '';
            });

            this.setState(defaultState);
        }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <Hospitalization 
                        hospitalizationFormData                 = {this.props.hospitalizationFormData}
                        hospitalizationReferenceFormData        = {this.props.hospitalizationReferenceFormData}
                        hospitalizationTableFormData            = {this.props.hospitalizationTableFormData}
                        visitDatafetched                        = {this.props.visitDatafetched}
                        handleBoundFormHispitalizationUpdate    = {this.handleBoundFormHispitalizationUpdate}
                        handleBoundFormHispitalizationReferance = {this.handleBoundFormHispitalizationReferance}
                        getHospitalizationData                  = {this.getHospitalizationData}
                        handleSelectChange                      = {this.handleSelectChange}
                        handleChangeDate                        = {this.handleChangeDate}
                        handleInputChange                       = {this.handleInputChange}
                        state                                   = {this.state}
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}