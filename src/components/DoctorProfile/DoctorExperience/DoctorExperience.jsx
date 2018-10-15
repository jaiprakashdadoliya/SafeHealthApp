import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import {DoctorExperienceAddContainer} from "./DoctorExperienceAddContainer";
import {DoctorExperienceEditContainer} from "./DoctorExperienceEditContainer";
import ReactTable from "react-table";
import "react-table/react-table.css";
/**
 * DoctorExperience
 *
 * @package                SafeHealth
 * @subpackage             DoctorExperience
 * @category               Presentational Component
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This component is reponsible to show the experience part
 */
export const DoctorExperience = (props) => {
        return (
          <div className="inner-content specialisation-section">
          <DoctorExperienceAddContainer
             experienceAddShow        = {props.experienceAddShow}
             experienceAddHideHandle  = {props.experienceAddHideHandle}
             />
          <DoctorExperienceEditContainer
             experienceEditShow       = {props.experienceEditShow}
             experienceEditHideHandle = {props.experienceEditHideHandle}
             experienceDetail         = {props.experienceDetail}

          />
              <div className="row">
                  <h3 className  = "col-md-10 col-sm-8 col-xs-9">Experience</h3>
                  <div className = "col-md-2 col-sm-4 col-xs-3">
                      <a
                            href = "javascript:void(0);"
                            onClick = {props.experienceAddShowHandle}
                            className = "text-right add-btn">
                            <FontAwesomeIcon icon={faPlus} /> Add
                      </a>
                  </div>
              </div>
              <div className="table-wrap">
                <div className="table-search">
                  <input
                    value={props.filterAll}
                    onChange={props.experienceSearch}
                    className="table-search-input"
                    placeholder="Search"
                  />
                </div>
                  <ReactTable
                   noDataText="No experience found !!"
                   data={props.experienceData}
                   filterable
                   defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                   filtered={props.filtered}
                   columns={[
                         {
                            Header      : "Designations",
                            accessor    : "doc_exp_designation",
                            className   : "dataCellClass",
                            filterable  : false,
                            filterMethod: (filter, row) => {
                              return row[filter.id].includes(filter.value);
                            }
                         },
                         {
                           Header: "Organisation Name",
                           accessor: "doc_exp_organisation_name",
                           className : "dataCellClass",
                           filterable  : false,
                           filterMethod: (filter, row) => {
                              return row[filter.id].includes(filter.value);
                            }
                         },
                         {
                           Header: "Start Year",
                           accessor: "doc_exp_start_year",
                           className : "dataCellClass",
                           filterable  : false,
                           filterMethod: (filter, row) => {
                              return row[filter.id].includes(filter.value);
                            }
                         },
                         {
                           Header: "End Year",
                           accessor: "doc_exp_end_year",
                           className : "dataCellClass",
                           filterable  : false,
                           filterMethod: (filter, row) => {
                              return row[filter.id].includes(filter.value);
                            }
                         },
                         {
                           Header: 'Actions',
                           accessor  : "doc_exp_id",
                           filterable  : false,
                           className :"actionCellClass",
                           Cell: row => <div className="pull-left"><a href="javascript:void(0);" onClick={props.experienceEditShowHandle.bind(null,row.original)} className="green btn table-btn">Edit</a><a href="javascript:void(0)" onClick={props.experienceDelete.bind(null,row.value)} className="red btn table-btn">Delete</a></div>
                          }
                        ]}
                    defaultSorted={[
                        {
                            id: "doc_exp_designation",
                            desc: true
                        }
                    ]}
                    defaultPageSize= {2}
                    minRows= {props.experienceData.length}
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
                        props.getExperienceList(state.page, state.pageSize, state.sorted, state.filtered);
                    }}
               />
            </div>
          </div>
        );
}
