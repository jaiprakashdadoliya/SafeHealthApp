import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { confirmAlert } from 'react-confirm-alert';
import formConfig from "./NewPatientModal/NewPatientConfig";

const LabPatients = Loadable({
    loader: () => import('./LabPatients').then(object => object.LabPatients),
    loading: Loading
});

export class LabPatientsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.newPatientModalShowHandle = this.newPatientModalShowHandle.bind(this);
        this.newPatientModalHideHandle = this.newPatientModalHideHandle.bind(this);
        this.editPatientModalShowHandle = this.editPatientModalShowHandle.bind(this);
        this.editPatientModalHideHandle = this.editPatientModalHideHandle.bind(this);
        this.patientSubmit              = this.patientSubmit.bind(this);
        this.patientDelete              = this.patientDelete.bind(this);
        this.labPatients = 
                            [{  
                                'user_id'  : 1,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 2,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 3,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 4,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 5,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 6,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 7,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 8,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 9,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            },
                            {  
                                'user_id'  : 10,
                                'pat_title':'1',
                                'user_gender':'1',
                                'user_email':'kumar.ram@gmail.com',
                                'user_firstname': 'Ram',
                                'user_lastname' : 'Kumar',
                                'user_mobile': 9755477939,
                                'pat_dob': '1987-09-04',
                                'doc_ref_name':'1'
                            }]
        this.state = {
            newPatientModalShow  : false,
            editPatientModalShow : false,
            successMsg           : false,
            errorMsg             : false,
            }
    }
    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new patient modal form
     * @return                Nothing
     */
    newPatientModalShowHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ newPatientModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new patient modal form
     * @return                Nothing
     */
    newPatientModalHideHandle() {
        this.setState({ newPatientModalShow: false,
                        successMsg:false,errorMsg:false });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new patient modal form
     * @return                Nothing
     */
    editPatientModalShowHandle(patient) {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = patient[fieldName];
        }
        this.setState({ editPatientModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new patient modal form
     * @return                Nothing
     */
    editPatientModalHideHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ editPatientModalShow: false, successMsg:false, errorMsg :false  });
    }

     /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new patient modal form
     * @return                Nothing
     */
    patientSubmit(type) {
        if(type == "edit"){
            this.setState({ successMsg: true });
        }else{
            this.setState({ errorMsg: true });
        }
        setTimeout(function () {
            if(type == "edit"){
                this.editPatientModalHideHandle();
            }else{
                this.newPatientModalHideHandle(); 
            }
        }.bind(this), 2000);
    }


    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to delete the current experience entry
    * @return                Nothing
    */
    patientDelete(){
        confirmAlert({
            title: 'Patient delete',
            message: <div className="alert-message">Are you sure you want to delete this Patient?</div>,
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
            <LabPatients 
                labPatients                 = {this.labPatients}
                newPatientModalShowHandle   = {this.newPatientModalShowHandle}
                newPatientModalHideHandle   = {this.newPatientModalHideHandle}
                editPatientModalShowHandle  = {this.editPatientModalShowHandle}
                editPatientModalHideHandle  = {this.editPatientModalHideHandle}
                newPatientModalShow         = {this.state.newPatientModalShow}
                editPatientModalShow        = {this.state.editPatientModalShow}
                patientDelete               = {this.patientDelete}
                successMsg                  = {this.state.successMsg}
                errorMsg                    = {this.state.errorMsg}
                patientSubmit               = {this.patientSubmit}

            />
        );
    }
}

