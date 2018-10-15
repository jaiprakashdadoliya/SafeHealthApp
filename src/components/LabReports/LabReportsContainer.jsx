import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { confirmAlert } from 'react-confirm-alert';
import formConfig from "./NewReportModal/NewReportConfig";

const LabReports = Loadable({
    loader: () => import('./LabReports').then(object => object.LabReports),
    loading: Loading
});

export class LabReportsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.newReportModalShowHandle = this.newReportModalShowHandle.bind(this);
        this.newReportModalHideHandle = this.newReportModalHideHandle.bind(this);
        this.editReportModalShowHandle = this.editReportModalShowHandle.bind(this);
        this.editReportModalHideHandle = this.editReportModalHideHandle.bind(this);
        this.reportSubmit              = this.reportSubmit.bind(this);
        this.reportDelete              = this.reportDelete.bind(this);
        this.labReports = 
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
            newReportModalShow  : false,
            editReportModalShow : false,
            successMsg           : false,
            errorMsg             : false,
            }
    }
    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new report modal form
     * @return                Nothing
     */
    newReportModalShowHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ newReportModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new report modal form
     * @return                Nothing
     */
    newReportModalHideHandle() {
        this.setState({ newReportModalShow: false,
                        successMsg:false,errorMsg:false });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to show new report modal form
     * @return                Nothing
     */
    editReportModalShowHandle(report) {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = report[fieldName];
        }
        this.setState({ editReportModalShow: true });
    }

    /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new report modal form
     * @return                Nothing
     */
    editReportModalHideHandle() {
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            fields[fc]['value'] = '';
        }
        this.setState({ editReportModalShow: false, successMsg:false, errorMsg :false  });
    }

     /**
     * @DateOfCreation        19 Sep 2018
     * @ShortDescription      This function is responsible to hide new report modal form
     * @return                Nothing
     */
    reportSubmit(type) {
        if(type == "edit"){
            this.setState({ successMsg: true });
        }else{
            this.setState({ errorMsg: true });
        }
        setTimeout(function () {
            if(type == "edit"){
                this.editReportModalHideHandle();
            }else{
                this.newReportModalHideHandle(); 
            }
        }.bind(this), 2000);
    }


    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to delete the current experience entry
    * @return                Nothing
    */
    reportDelete(){
        confirmAlert({
            title: 'Report delete',
            message: <div className="alert-message">Are you sure you want to delete this Report?</div>,
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
            <LabReports 
                labReports                 = {this.labReports}
                newReportModalShowHandle   = {this.newReportModalShowHandle}
                newReportModalHideHandle   = {this.newReportModalHideHandle}
                editReportModalShowHandle  = {this.editReportModalShowHandle}
                editReportModalHideHandle  = {this.editReportModalHideHandle}
                newReportModalShow         = {this.state.newReportModalShow}
                editReportModalShow        = {this.state.editReportModalShow}
                reportDelete               = {this.reportDelete}
                successMsg                  = {this.state.successMsg}
                errorMsg                    = {this.state.errorMsg}
                reportSubmit               = {this.reportSubmit}

            />
        );
    }
}

