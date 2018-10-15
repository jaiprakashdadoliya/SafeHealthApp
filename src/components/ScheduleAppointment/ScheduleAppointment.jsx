import React from "react";
import {HeaderContainer} from "../Header";
import {SideMenu} from "../SideMenu";
import { utilityHelper } from '../../_helpers';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const ScheduleAppointment = (props) => {
    return (
        <div className="page-container">
          <SideMenu />
          <HeaderContainer  history={props.history}/>
          <div className="main-content">
            <div className="col-md-12">
              <div className="wrap-inner-content">
                <div className="inner-content">
                    <div className="row page-header">
                        <div className="col-md-6 col-sm-6"><h2>Schedule Appointment List</h2></div>
                    </div>
                    <div>
                       <ReactTable
                       noDataText="No patient found !!"
                       data={props.patientData}
                       columns={[
                             {  
                                Header      : "",
                                accessor    : "user_firstname",
                                className   : "dataCellClass",
                                filterable  : false,
                                minWidth    : 200,
                                Cell        : cellInfo => <div><div className="table-img-profile">
                                                    <img src={require("../../assets/images/1.jpg")} />
                                               </div>
                                               <div className="table-details">
                                                    {utilityHelper.getPatientTitle(cellInfo.original.pat_title)} {cellInfo.original.user_firstname} {cellInfo.original.user_lastname}
                                                    <br/><span>SHRN: {cellInfo.original.pat_code}</span>
                                               </div></div>
                             },
                             {
                               Header: "Gender",
                               accessor: "user_gender",
                               className : "dataCellClass",
                               filterable  : false,
                               Cell: props => <span>{utilityHelper.getGender(props.value)}</span>
                             },
                             {
                               Header       : "Age",
                               accessor     : "pat_dob",
                               filterable   : false,
                               className    : "dataCellClass",
                               Cell         : props => 
                                                <span>
                                                    {utilityHelper.calculateAge(props.value)}
                                                </span>
                             },
                             {
                               Header    : "Contact Number",
                               accessor  : "user_mobile",
                               className : "dataCellClass"
                             },
                             {
                               Header    : "Email",
                               accessor  : "user_email",
                               className : "dataCellClass"
                             },
                             {
                               Header: 'Actions',
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: cellInfo => <div>
                                                    <a href="javascript:void(0);"
                                                        className="btn green table-btn">Edit
                                                    </a>
                                                    <a href="" className="btn table-btn yellow">
                                                        Message
                                                    </a>
                                                </div>
                             }
                            ]}
                        defaultSorted={[
                            {
                                id: "user_gender",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {4}
                        minRows= {props.patientData.length}
                        className="table table-bordered responsive"
                        loading={props.loading}
                        filterable
                        Sorted
                        pages={props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[1, 2, 3, 4, 5, 6]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            props.getPatientList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />
                   </div>
                    </div>
                </div>
                </div>
              </div>
          </div>

    );
}
