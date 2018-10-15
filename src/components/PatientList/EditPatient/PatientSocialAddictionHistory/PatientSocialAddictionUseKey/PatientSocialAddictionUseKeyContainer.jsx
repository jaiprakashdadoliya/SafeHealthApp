import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientSocialAddictionUseKey = Loadable({
    loader: () => import('./PatientSocialAddictionUseKey' /* webpackChunkName = "PatientSocialAddictionUseKey" */).then(object => object.PatientSocialAddictionUseKey),
    loading: Loading
});
export class PatientSocialAddictionUseKeyContainer extends React.Component {
	constructor(props){
		super(props);
        this.getSocialAddictionUseKeyData = this.getSocialAddictionUseKeyData.bind(this);
        this.handleInputChange            = this.handleInputChange.bind(this);
        this.state  = {};

	}

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getSocialAddictionUseKeyData() {
       return this.state;
    }

    /**
     * @DateOfCreation        14 june 2018
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
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentDidMount(){
        let data_starting_age = this.props.formData.starting_age.map(function(starting_age,index){
            let stateRow = {};
            stateRow['id'] = starting_age.id;
            stateRow['value'] = starting_age.value;
            return stateRow;
        });
        
        let statenew = {};
        for(var row_starting_age in data_starting_age) {
            statenew[data_starting_age[row_starting_age].id] = data_starting_age[row_starting_age].value;
        }

        let data_stopping_age = this.props.formData.stopping_age.map(function(stopping_age,index){
            let stateRow = {};
            stateRow['id'] = stopping_age.id;
            stateRow['value'] = stopping_age.value;
            return stateRow;
        });
        
       for(var row_stopping_age in data_stopping_age) {
            statenew[data_stopping_age[row_stopping_age].id] = data_stopping_age[row_stopping_age].value;
        }

        let data_quantitiy = this.props.formData.quantitiy.map(function(quantitiy,index){
            let stateRow = {};
            stateRow['id'] = quantitiy.id;
            stateRow['value'] = quantitiy.value;
            return stateRow;
        });
        
        for(var row_quantitiy in data_quantitiy) {
            statenew[data_quantitiy[row_quantitiy].id] = data_quantitiy[row_quantitiy].value;
        }
        this.setState(statenew);
    }
	
    render() {
        return (
            <div >
                <PatientSocialAddictionUseKey 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    handleInputChange                                  = {this.handleInputChange}
                    getSocialAddictionUseKeyData                       = {this.getSocialAddictionUseKeyData}
                    formData                                           = {this.props.formData}
                    state                                              = {this.state}
                />
            </div>
        );
    }
}