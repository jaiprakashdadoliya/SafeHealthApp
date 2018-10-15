import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const Spirometry = Loadable({
    loader: () => import('./Spirometry' /* webpackChunkName = "Spirometry" */).then(object => object.Spirometry),
    loading: Loading
});

export class SpirometryContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundFormSpirometry               = undefined;
        this.handleBoundFormSpirometryUpdate   = this.handleBoundFormSpirometryUpdate.bind(this);
        this.handleInputChange                 = this.handleInputChange.bind(this);
        this.getSpirometryData                 = this.getSpirometryData.bind(this);
        this.state  = {};
        this.preFevFactorId = undefined;
        this.postFevFactorId = undefined;
        this.preFvcFactorId = undefined;
        this.postFvcFactorId = undefined;
        this.preFevFvcFactorId = undefined;
        this.postFevFvcFactorId = undefined;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormSpirometryUpdate(data){
        this.boundFormSpirometry = data;
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getSpirometryTableData() {
       return this.state;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getSpirometryData() {
       if(this.handleBoundFormSpirometryUpdate){
            // let data          = this.boundFormSpirometry.getData();
            let dataTable     = this.getSpirometryTableData();
            if (dataTable) {
                return utilityHelper.mergeMultipleObject([dataTable]);
            } 
       }
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, spirometryTableFormData } = this.props;
            
        if(typeof spirometryTableFormData === 'object'){
            let defaultState = {};
            this.props.spirometryTableFormData.map(checkFactor => { 

                let preValue  = 'spirometries_fector_pre_value_'+checkFactor.spirometries_fector_id;
                let postValue = 'spirometries_fector_post_value_'+checkFactor.spirometries_fector_id;
                 if(checkFactor.spirometries_fector_value == 'FEV1 (L)'){
                    this.preFevFactorId = preValue;
                    this.postFevFactorId = postValue;
                 }else if(checkFactor.spirometries_fector_value == 'FVC (L)'){
                    this.preFvcFactorId = preValue;
                    this.postFvcFactorId = postValue;  
                 }else if(checkFactor.spirometries_fector_value == 'FEV1/FVC'){
                    this.preFevFvcFactorId = preValue;
                    this.postFevFvcFactorId = postValue; 
                 }
                
                defaultState[preValue]  = checkFactor.spirometries_fector_pre_value != null ? checkFactor.spirometries_fector_pre_value : '';
                defaultState[postValue] = checkFactor.spirometries_fector_post_value != null ? checkFactor.spirometries_fector_post_value  : '';
            });

            this.setState(defaultState);
        }
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
        let res = '';
        if(name === this.preFevFactorId || name === this.preFvcFactorId ){

            let preFevFactorIdValue = name === this.preFevFactorId ? value : state[this.preFevFactorId];
            let preFvcFactorIdValue = name === this.preFvcFactorId ? value : state[this.preFvcFactorId];
            res = utilityHelper.calCulateDivideData(preFevFactorIdValue,preFvcFactorIdValue);
            let changeValue = this.preFevFvcFactorId;
            this.setState({
                ...state,
                [changeValue] : res,
                [name]: value
            });
        }else if(name === this.postFevFactorId || name === this.postFvcFactorId){

            let postFevFactorIdValue = name === this.postFevFactorId ? value : state.hasOwnProperty(this.postFevFactorId) ? state[this.postFevFactorId] :'';
            let postFvcFactorIdValue = name === this.postFvcFactorId ? value : state[this.postFvcFactorId];
            res = utilityHelper.calCulateDivideData(postFevFactorIdValue,postFvcFactorIdValue);
            let changeValue = this.postFevFvcFactorId;
            this.setState({
                ...state,
                [changeValue] : res,
                [name]: value
            });
        }else{
            this.setState({
                ...state,
                [name] : value
            });
        }
    }

    render() {
        return (
            <div >
                <Spirometry 
                    spirometryFormData              = {this.props.spirometryFormData}
                    spirometryTableFormData         = {this.props.spirometryTableFormData}
                    visitDatafetched                = {this.props.visitDatafetched}
                    handleBoundFormSpirometryUpdate = {this.handleBoundFormSpirometryUpdate}
                    handleInputChange               = {this.handleInputChange}
                    state                           = {this.state}
                />
            </div>
        );
    }
}