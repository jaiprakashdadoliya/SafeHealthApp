import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { utilityHelper } from '../../../../../_helpers';

const PatientFiberopticBronchosCopy = Loadable({
    loader: () => import('./PatientFiberopticBronchosCopy' /* webpackChunkName = "PatientFiberopticBronchosCopy" */).then(object => object.PatientFiberopticBronchosCopy),
    loading: Loading
});
export class PatientFiberopticBronchosCopyContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormFiberopticBronchosCopy = undefined;
        this.handleBoundFormFiberopticBronchosCopyUpdate = this.handleBoundFormFiberopticBronchosCopyUpdate.bind(this);
        this.getFiberopticBronchosCopyData = this.getFiberopticBronchosCopyData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {};

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormFiberopticBronchosCopyUpdate(data){
        this.boundFormFiberopticBronchosCopy = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getFiberopticBronchosCopyData() {
       if(this.boundFormFiberopticBronchosCopy){
            let data = this.boundFormFiberopticBronchosCopy.getData();
            let extraData = this.state;
            let combineData = utilityHelper.mergeMultipleObject([data,extraData]);
            if (combineData) {
                return combineData;
            } 
       }
    }

     /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to  set dymanic state
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        var data = {};
        let obss=  Object.entries(this.props.fiberopticBronchosCopyTableFormData).length> 0 ? Object.entries(this.props.fiberopticBronchosCopyTableFormData).map(function(tableData,index){
                       return  (
                                tableData[1].length > 0 ? tableData[1].map(function(tableDataRow,indextable){
                                    return (
                                         tableDataRow.option.length > 0 ? tableDataRow.option.map(function(tableRow,indexNe){
                                            var thisIsMyCopyCustom = 'custom_'+tableDataRow.name+'_'+tableRow.id;
                                            var thisIsMyCopy = tableDataRow.name+'_'+tableRow.id;
                                            if(tableDataRow.id != '1'){
                                                data[thisIsMyCopyCustom] = tableRow.custom_value;
                                            }
                                            data[thisIsMyCopy] = tableRow.value;
                                        }):''
                                    );
                                }) : ''

                            );

                    }) : '';
        
        this.setState(data);
        
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
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientFiberopticBronchosCopy 
                        patId                                                   = {this.props.patId}
                        visitId                                                 = {this.props.visitId}
                        formConfig                                              = {this.props.fiberopticBronchosCopyFormData}
                        tableFormData                                           = {this.props.fiberopticBronchosCopyTableFormData}
                        handleBoundFormFiberopticBronchosCopyUpdate             = {this.handleBoundFormFiberopticBronchosCopyUpdate}
                        getFiberopticBronchosCopyData                           = {this.getFiberopticBronchosCopyData}
                        payLoad                                                 = {this.state}
                        handleInputChange                                       = {this.handleInputChange}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}