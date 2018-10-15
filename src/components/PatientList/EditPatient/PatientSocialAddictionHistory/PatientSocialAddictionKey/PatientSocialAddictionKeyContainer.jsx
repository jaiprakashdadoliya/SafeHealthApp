import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { utilityHelper } from './../../../../../_helpers';

const PatientSocialAddictionKey = Loadable({
    loader: () => import('./PatientSocialAddictionKey' /* webpackChunkName = "PatientSocialAddictionKey" */).then(object => object.PatientSocialAddictionKey),
    loading: Loading
});
export class PatientSocialAddictionKeyContainer extends React.Component {
    constructor(props){
        super(props);
        this.getSocialAddictionKeyData = this.getSocialAddictionKeyData.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {};        
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getSocialAddictionKeyData() {
       return this.state;
    }
    
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to handle changes in Checkbox state
     * @param                 Event Object
     * @return                Nothing
     */
    handleCheckboxChange(events, name) {
        let state = this.state; 
        this.setState({
            ...state,
            [name] : utilityHelper.getArrayDifference(this.state[name], events)
        });
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentDidMount(){
        
        let data = this.props.formData.map(function(socialAdition,index){
            let stateRow = {};
            stateRow['id'] = socialAdition.id;
            stateRow['value'] = [socialAdition.value];
            return stateRow;
        });
    
        let statenew = {};
        for(var row in data) {
            statenew[data[row].id] = data[row].value;
        }
        this.setState(statenew);
    }
    
    render() {
        return (
            <div >
                <PatientSocialAddictionKey 
                    patId                          = {this.props.patId}
                    visitId                        = {this.props.visitId}
                    getSocialAddictionKeyData      = {this.getSocialAddictionKeyData}
                    handleCheckboxChange           = {this.handleCheckboxChange}
                    formData                       = {this.props.formData}
                    state                          = {this.state}
           
                />
            </div>
        );
    }
}