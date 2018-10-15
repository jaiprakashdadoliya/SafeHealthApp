/**
 * Doctor Education Degree
 *
 * @package                SafeHealth
 * @subpackage             Doctor Education Degree
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible to render doctor education degree list
 */
import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {DoctorEducationDegreeEditContainer} from "./DoctorEducationDegreeEditContainer";
import {DoctorEducationDegreeAddContainer} from "./DoctorEducationDegreeAddContainer";

export const DoctorEducationDegree = (props) => {
    return(
      <div className="inner-content specialisation-section">
         <DoctorEducationDegreeAddContainer
            degreeAddShow = {props.degreeAddShow}
            degreeAddHideHandle = {props.degreeAddHideHandle}
            refreshDoctorProfile = {props.refreshDoctorProfile}
         />
         <DoctorEducationDegreeEditContainer
            degreeEditShow = {props.degreeEditShow}
            degreeEditHideHandle = {props.degreeEditHideHandle}
            degreeEditDetail = { props.degreeDetail}
            refreshDoctorProfile = { props.refreshDoctorProfile}
         />
          <div className="row">
              <h3 className="col-md-10 col-sm-8 col-xs-9">Education/Degree</h3>
              <div className="col-md-2 col-sm-4 col-xs-3">
                  <a href="javascript:void(0);" onClick={props.degreeAddShowHandle} className="text-right add-btn"> <FontAwesomeIcon icon={faPlus} /> Add</a>
              </div>
          </div>
          <div className="table-wrap">
            <div className="table-search">
                <input
                  value={props.filterAll}
                  onChange={props.degreeSearch}
                  className="table-search-input"
                  placeholder="Search"
                />
            </div>
          <ReactTable
             noDataText="No Degree found !!"
             data={props.degrees}
             filterable
             defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
             filtered={props.filtered}
             columns={[
                   {
                      Header      : "Degrees Name",
                      accessor    : "doc_deg_name",
                      className   : "dataCellClass",
                      resizable   : false,
                      filterable  : false,
                      filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                      }
                   },
                   {
                     Header: "Passing Year",
                     accessor: "doc_deg_passing_year",
                     className : "dataCellClass",
                     resizable   : false,
                     filterable  : false,
                     filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                      }
                   },
                   {
                     Header    : "Institute of College",
                     accessor  : "doc_deg_institute",
                     className : "dataCellClass",
                     filterable  : false,
                     resizable   : false,
                     filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                      }
                   },
                   {
                     Header: 'Actions',
                    accessor  : "doc_deg_id",
                     filterable  : false,
                     resizable   : false,
                     className :"actionCellClass",
                     Cell: row => <div className="pull-left"><a href="javascript:void(0);" onClick={props.degreeEditShowHandle.bind(null,row.original)} className="green btn table-btn">Edit</a><a href="javascript:void(0)" onClick={props.degreeDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a></div>
                    }
                  ]}
              defaultSorted={[
                  {
                      id: "doc_deg_name",
                      desc: true
                  }
              ]}
              defaultPageSize= {3}
              minRows= {props.degrees.length}
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
                  props.getDegreeList(state.page, state.pageSize, state.sorted, state.filtered);
              }}
           />
           </div>
      </div>
    );
}
