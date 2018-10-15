import React from "react";
import Loadable from 'react-loadable';
import { configConstants } from '../../_constants';
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import {faChevronRight, faChevronLeft} from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { utilityHelper } from '../../_helpers';
const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});
const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});
export const PatientAppointments = (props) => {
  return (
      <div className="page-container">
      <SideMenu />
      <div className="main-content right-sidebar-remove">
        <HeaderContainer />
        <div className="main-content">
          <div className="wrap-inner-content">
              <div className="">
              <div className="col-md-12 rrp">
                <div className="inner-content">
                  <div className="table-wrap appointment-page">
                  <div className="doctor-appointment-date text-center">
                      {utilityHelper.changeDateFormat(props.date)}
                    </div>
                  <div className="row">
                  <div className="col-md-6">
                   <input
                    value={props.filterAll}
                    onChange={props.appointmentSearch}
                    className="table-search-input"
                    placeholder="Search"
                  />
                  </div>
                  <div className="col-md-6 text-right">
                  <div className="table-pagination text-right">
                     <a href="javascript:void(0)" className="next btn green text" onClick={props.fetchAnotherData.bind(null, configConstants.PREVIOUS_SLOT, props.date)}> <FontAwesomeIcon icon={faChevronLeft} /> Previous </a> 
                     <a href="javascript:void(0)" className="next btn green text" onClick={props.fetchAnotherData.bind(null, configConstants.NEXT_SLOT, props.date)}> Next <FontAwesomeIcon icon={faChevronRight} /></a> 
                     </div>
                     </div>
                     </div>
                   <ReactTable
                   noDataText="No Appointment found !!"
                   data={props.appointments}
                   filterable
                   columns={[
                         {
                           Header: "Doctor Name",
                           accessor: "doc_name",
                           className : "dataCellClass",
                           filterable  : false,
                           sortable: false,
                           filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value);
                           }
                         },
                         {
                           Header: "Booking Reason",
                           accessor: "booking_reason",
                           className : "dataCellClass",
                           filterable  : false,
                           sortable: false,
                           filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value);
                           },
                           Cell: row => <div className="pull-left">{row.value}</div>
                         },
                         {
                           Header: "Booking Time",
                           accessor: "booking_time",
                           className : "dataCellClass",
                           filterable  : false,
                           sortable: false,
                           filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value);
                           },
                           Cell: row => <div className="pull-left">{utilityHelper.changeTimingFormat(row.original.booking_time)}</div>
                         },
                         {
                           Header: "Address",
                           accessor: "clinic_address_line1",
                           className : "dataCellClass",
                           filterable  : false,
                           sortable: false,
                           filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value);
                           },
                           Cell: row => <div className="pull-left">{row.original.clinic_address_line1} {row.original.clinic_address_line2} {row.original.clinic_landmark}</div>
                         },
                         {
                           Header: "Status",
                           accessor: "booking_status",
                           className : "dataCellClass",
                           filterable  : false,
                           sortable: false,
                           filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value);
                           },
                           Cell: row =>
                             <div className="pull-left"><button className={utilityHelper.getBookingStatus(row.original.booking_status).class}>{utilityHelper.getBookingStatus(row.original.booking_status).label}</button></div>
                         },
                         {
                           Header: 'Actions',
                           accessor  : "pat_id",
                           resizable   : false,
                           filterable  : false,
                           sortable: false,
                           width       : 200,
                           className :"actionCellClass",
                            Cell: row => <div className="pull-left">
                            {row.original.visit_id != null ? 
                            <a href="javascript:void(0);" onClick={props.handleRedirect.bind(null,row.value,row.original.booking_id,row.original.visit_id)}  className="green btn table-btn">Visit</a> : "Visit not started"}</div>
                          }
                        ]}
                    defaultPageSize= {configConstants.PAGE_SIZE}
                    minRows= {props.appointments.length}
                    className="table table-bordered responsive"
                    loading={props.loading}
                    filtered={props.filtered}
                    pages={props.pages}
                    showPagination={true}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    pageSizeOptions={[1, 2, 3, 4, 5, 6]}
                    manual // For server side pagination
                    onFetchData={(state, instance) => {
                       props.getAppointmentsList(state.page, state.pageSize, state.filtered);
                    }}
                 /> 

                 </div>
                </div>
              </div>
          </div>    
          </div>
        </div>
      </div>
      </div>
  );
}
