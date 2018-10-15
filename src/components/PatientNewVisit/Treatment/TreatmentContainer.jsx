import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import moment from "moment";

const Treatment = Loadable({
    loader: () => import('./Treatment' /* webpackChunkName = "Treatment" */).then(object => object.Treatment),
    loading: Loading
});

export class TreatmentContainer extends React.Component {
	constructor(props){
		super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.getTreatmentData = this.getTreatmentData.bind(this);
        this.state = {};
	}

    /**
     * @DateOfCreation        10 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, visitTreatmentFectors } = this.props;
            
        if(typeof visitTreatmentFectors === 'object'){
            let defaultState = {};
            this.props.visitTreatmentFectors.map(checkFactor => {
                checkFactor.map(function(fectorDetails, indexFector) {

                    let treatmentStartDate = 'treatment_start_date_'+fectorDetails.medicine_id;
                    let treatmentEndDate   = 'treatment_end_date_'+fectorDetails.medicine_id;

                    defaultState['treatment_start_date_'+fectorDetails.medicine_id] = fectorDetails.treatment_start_date;
                    defaultState['treatment_end_date_'+fectorDetails.medicine_id]   = fectorDetails.treatment_end_date;
                })
            });
            this.setState(defaultState);
        }
    }

    /**
     * @DateOfCreation        10 July 2018
     * @ShortDescription      This function is responsible to handle changes in Date state
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
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getTreatmentData() {
       return this.state;
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <Treatment 
                        visitTreatmentFectors   = {this.props.visitTreatmentFectors}
                        visitDatafetched        = {this.props.visitDatafetched}
                        state                   = {this.state}
                        handleChangeDate        = {this.handleChangeDate}
                        getTreatmentData        = {this.getTreatmentData}
                    />
                </div>
            );            
        } else {
            return (<div></div>);
        }
    }
}