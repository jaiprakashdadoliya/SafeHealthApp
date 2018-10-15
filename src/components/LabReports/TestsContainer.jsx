import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { confirmAlert } from 'react-confirm-alert';
import formConfig from "./NewTestModal/NewTestConfig";

const Tests = Loadable({
    loader: () => import('./Tests').then(object => object.Tests),
    loading: Loading
});

export class TestsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.newTestModalShowHandle = this.newTestModalShowHandle.bind(this);
        this.newTestModalHideHandle = this.newTestModalHideHandle.bind(this);
        this.editTestModalShowHandle = this.editTestModalShowHandle.bind(this);
        this.editTestModalHideHandle = this.editTestModalHideHandle.bind(this);
        this.testSubmit              = this.testSubmit.bind(this);
        this.testDelete              = this.testDelete.bind(this);
        this.labTests = 
                            [{  
                                'test_id'  : 1,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 2,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 3,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 4,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 5,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 6,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 7,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 8,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 9,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            },
                            {  
                                'test_id'  : 10,
                                'test_name':'CBC Test',
                                'tot':'35 min',
                                'status':'inprogress'
                            }]
        this.state = {
            newTestModalShow  : false,
            editTestModalShow : false,
            successMsg           : false,
            errorMsg             : false,
            }
    }
    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new test modal form
     * @return                Nothing
     */
    newTestModalShowHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ newTestModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new test modal form
     * @return                Nothing
     */
    newTestModalHideHandle() {
        this.setState({ newTestModalShow: false,
                        successMsg:false,errorMsg:false });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new test modal form
     * @return                Nothing
     */
    editTestModalShowHandle(test) {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = test[fieldName];
        }
        this.setState({ editTestModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new test modal form
     * @return                Nothing
     */
    editTestModalHideHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ editTestModalShow: false, successMsg:false, errorMsg :false  });
    }

     /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new test modal form
     * @return                Nothing
     */
    testSubmit(type) {
        if(type == "edit"){
            this.setState({ successMsg: true });
        }else{
            this.setState({ errorMsg: true });
        }
        setTimeout(function () {
            if(type == "edit"){
                this.editTestModalHideHandle();
            }else{
                this.newTestModalHideHandle(); 
            }
        }.bind(this), 2000);
    }


    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to delete the current experience entry
    * @return                Nothing
    */
    testDelete(){
        confirmAlert({
            title: 'Test delete',
            message: <div className="alert-message">Are you sure you want to delete this Test?</div>,
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
            <Tests 
                labTests                 = {this.labTests}
                newTestModalShowHandle   = {this.newTestModalShowHandle}
                newTestModalHideHandle   = {this.newTestModalHideHandle}
                editTestModalShowHandle  = {this.editTestModalShowHandle}
                editTestModalHideHandle  = {this.editTestModalHideHandle}
                newTestModalShow         = {this.state.newTestModalShow}
                editTestModalShow        = {this.state.editTestModalShow}
                testDelete               = {this.testDelete}
                successMsg                  = {this.state.successMsg}
                errorMsg                    = {this.state.errorMsg}
                testSubmit               = {this.testSubmit}

            />
        );
    }
}

