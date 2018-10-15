import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import moment from "moment";

const Diagnosis = Loadable({
    loader: () => import('./Diagnosis' /* webpackChunkName = "Diagnosis" */).then(object => object.Diagnosis),
    loading: Loading
});

export class DiagnosisContainer extends React.Component {
	constructor(props){
		super(props);

        this.getDiagnosisData           = this.getDiagnosisData.bind(this);
        this.handleChangeDate           = this.handleChangeDate.bind(this);
        this.handleInputChange          = this.handleInputChange.bind(this);
        this.onCheckBoxValueChanged     = this.onCheckBoxValueChanged.bind(this);
        this.state  = {};
        this.isDiagnosisUpdated= false;
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

    /**
     * @DateOfCreation        6 July 2018
     * @ShortDescription      This function is responsible to handle changes in Checkbox state
     * @param                 Event Object
     * @return                Nothing
     */
    onCheckBoxValueChanged(events, name) {
        let state = this.state; 
        this.setState({
            ...state,
            [name] : utilityHelper.getArrayDifference(this.state[name], events)
        });
    }

    /**
     * @DateOfCreation        6 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, diagnosisFormData } = this.props;
            
        if(typeof diagnosisFormData === 'object'){
            let defaultState = {};
            
            this.props.diagnosisFormData.map( (checkFactor, index) => {
                
                defaultState['date_of_diagnosis_'+checkFactor.disease_id] =  checkFactor.date_of_diagnosis != '' && checkFactor.date_of_diagnosis !== null ? checkFactor.date_of_diagnosis : undefined;
                
                if(checkFactor.fectors.length > 0){
                    checkFactor.fectors.map((options, indexFectors) => {
                        defaultState[options.name] = options.value != '' && options.value !== null ? options.value : '';
                    });
                }
            });
            this.setState(defaultState);
        }
    }

    /**
     * @DateOfCreation        5 July 2018
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
     * @DateOfCreation        6 July 2018
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

    render() {
        return (
            <div >
                <Diagnosis 
                    diagnosisFormData   = {this.props.diagnosisFormData}
                    visitDatafetched    = {this.props.visitDatafetched}
                    getDiagnosisData    = {this.getDiagnosisData}
                    state               = {this.state}
                    handleChangeDate    = {this.handleChangeDate}
                    handleInputChange   = {this.handleInputChange}
                    onCheckBoxValueChanged = {this.onCheckBoxValueChanged}
                />
            </div>
        );
    }
}