 import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { confirmAlert } from 'react-confirm-alert';
import formConfig from "./NewSampleModal/NewSampleConfig";

const Samples = Loadable({
    loader: () => import('./Samples').then(object => object.Samples),
    loading: Loading
});

export class SamplesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.newSampleModalShowHandle = this.newSampleModalShowHandle.bind(this);
        this.newSampleModalHideHandle = this.newSampleModalHideHandle.bind(this);
        this.editSampleModalShowHandle = this.editSampleModalShowHandle.bind(this);
        this.editSampleModalHideHandle = this.editSampleModalHideHandle.bind(this);
        this.sampleSubmit              = this.sampleSubmit.bind(this);
        this.sampleDelete              = this.sampleDelete.bind(this);
        this.labSamples = 
                            [{  
                                'sample_id'  : 1,
                                'sample_code':'1001/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 2,
                                'sample_code':'1002/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 3,
                                'sample_code':'1003/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 4,
                                'sample_code':'1004/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 5,
                                'sample_code':'1005/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 6,
                                'sample_code':'1006/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 7,
                                'sample_code':'1007/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 8,
                                'sample_code':'1008/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 9,
                                'sample_code':'1010/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            },
                            {  
                                'sample_id'  : 10,
                                'sample_code':'1011/18',
                                'inv_status':'completed',
                                'sample_date': '2018-09-17',
                            }]
        this.state = {
            newSampleModalShow  : false,
            editSampleModalShow : false,
            successMsg           : false,
            errorMsg             : false,
            }
    }
    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new sample modal form
     * @return                Nothing
     */
    newSampleModalShowHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ newSampleModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new sample modal form
     * @return                Nothing
     */
    newSampleModalHideHandle() {
        this.setState({ newSampleModalShow: false,
                        successMsg:false,errorMsg:false });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new sample modal form
     * @return                Nothing
     */
    editSampleModalShowHandle(sample) {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = sample[fieldName];
        }
        this.setState({ editSampleModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new sample modal form
     * @return                Nothing
     */
    editSampleModalHideHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ editSampleModalShow: false, successMsg:false, errorMsg :false  });
    }

     /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new sample modal form
     * @return                Nothing
     */
    sampleSubmit(type) {
        if(type == "edit"){
            this.setState({ successMsg: true });
        }else{
            this.setState({ errorMsg: true });
        }
        setTimeout(function () {
            if(type == "edit"){
                this.editSampleModalHideHandle();
            }else{
                this.newSampleModalHideHandle(); 
            }
        }.bind(this), 2000);
    }


    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to delete the current experience entry
    * @return                Nothing
    */
    sampleDelete(){
        confirmAlert({
            title: 'Sample delete',
            message: <div className="alert-message">Are you sure you want to delete this Sample?</div>,
            buttons: [
            {
              label:  'Yes',
              onClick: () => {
                console.log("Deleted successfully");
              }
            },
            {
              label: 'No',
              onClick: () => {return false;}
            }
            ]
        })
    }
    
    render () {
        return (
            <Samples 
                labSamples                 = {this.labSamples}
                newSampleModalShowHandle   = {this.newSampleModalShowHandle}
                newSampleModalHideHandle   = {this.newSampleModalHideHandle}
                editSampleModalShowHandle  = {this.editSampleModalShowHandle}
                editSampleModalHideHandle  = {this.editSampleModalHideHandle}
                newSampleModalShow         = {this.state.newSampleModalShow}
                editSampleModalShow        = {this.state.editSampleModalShow}
                sampleDelete               = {this.sampleDelete}
                successMsg                  = {this.state.successMsg}
                errorMsg                    = {this.state.errorMsg}
                sampleSubmit               = {this.sampleSubmit}

            />
        );
    }
}

