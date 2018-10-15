/**
 * Doctor membership
 *
 * @package                SafeHealth
 * @subpackage             Doctor membership
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible to render doctor membership list
 */
import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import {DoctorMembershipEditContainer} from "./DoctorMembershipEditContainer";
import {DoctorMembershipAddContainer} from "./DoctorMembershipAddContainer";
import { configConstants } from '../../../_constants';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const DoctorMembership = (props) => {
    return(
      <div className="inner-content specialisation-section">
         <DoctorMembershipAddContainer
            membershipAddShow = {props.membershipAddShow}
            membershipAddHideHandle = {props.membershipAddHideHandle}
         />
         <DoctorMembershipEditContainer
            membershipEditShow = {props.membershipEditShow}
            membershipEditHideHandle = {props.membershipEditHideHandle}
            membershipEditDetail = { props.membershipDetail }
         />
          <div className="row">
              <h3 className="col-md-10 col-sm-8 col-xs-9">Membership</h3>
              <div className="col-md-2 col-sm-4 col-xs-3">
                  <a href="javascript:void(0);" onClick={props.membershipAddShowHandle} className="text-right add-btn"><FontAwesomeIcon icon={faPlus} /> Add</a>
              </div>
          </div>
          <div className="table-wrap">
              <div className="table-search">
                <input
                  value={props.filterAll}
                  onChange={props.membershipSearch}
                  className="table-search-input"
                  placeholder="Search"
                />
               </div>
              <ReactTable
                       noDataText="No Membership found !!"
                       data={props.membership}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={props.filtered}
                       columns={[
                             {
                                Header      : "Membership Name",
                                accessor    : "doc_mem_name",
                                className   : "dataCellClass",
                                resizable   : false,
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: "Membership Joining Year",
                               accessor: "doc_mem_year",
                               className : "dataCellClass",
                               resizable   : false,
                               filterable  : false,
                               filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header    : "Membership Number",
                               accessor  : "doc_mem_no",
                               className : "dataCellClass",
                               resizable   : false,
                               filterable  : false,
                               filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "doc_mem_id",
                               resizable   : false,
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div className="pull-left">
                                                    <a href="javascript:void(0);" onClick={props.membershipEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.membershipDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "doc_mem_name",
                                desc: true
                            }
                        ]}
                        defaultPageSize= {3}
                         minRows= {props.membership.length}
                        className="table table-bordered responsive"
                        loading={props.loading}
                        filterable
                        Sorted
                        pages={props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[3, 4, 5, 6]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            props.getMembershipList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />
            </div>
      </div>
    );
}
