import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {DoctorSpecialisationAddContainer} from "./DoctorSpecialisationAddContainer";
import {DoctorSpecialisationEditContainer} from "./DoctorSpecialisationEditContainer";


/**
 * DoctorSpecialisation
 *
 * @package                SafeHealth
 * @subpackage             DoctorSpecialisation
 * @category               Presentational Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible to show the Specialisation part
 */
export const DoctorSpecialisation = (props) => {
      return (
              <div className="inner-content specialisation-section">
                 <DoctorSpecialisationAddContainer
                    specialisationAddShow = {props.specialisationAddShow}
                    specialisationAddHideHandle = {props.specialisationAddHideHandle}
                    handleInputChange        = {props.handleInputChange}
                    masterSpecialisationData = {props.masterSpecialisationData}
                 />

                 <DoctorSpecialisationEditContainer
                    specialisationEditShow       = {props.specialisationEditShow}
                    specialisationEditHideHandle = {props.specialisationEditHideHandle}
                    handleInputChange            = {props.handleInputChange}
                    specialisationDetail         = {props.specialisationDetail}
                    masterSpecialisationData     = {props.masterSpecialisationData}
                    tagSpecialisationData        = {props.tagSpecialisationData}
                    tagSpecialisationFetch       = {props.tagSpecialisationFetch}
                 />
                  <div className="row">
                      <h3 className="col-md-10 col-sm-8 col-xs-9">specialisation</h3>
                      <div className="col-md-2 col-sm-4 col-xs-3">
                          <a href="javascript:void(0);" className="text-right add-btn" onClick={props.specialisationAddShowHandle}><FontAwesomeIcon icon={faPlus} /> Add</a>
                      </div>
                  </div>
                  <div className="table-wrap">
              <div className="table-search">
                <input 
                  value={props.filterAll}
                  onChange={props.specialisationSearch}
                  className="table-search-input"
                  placeholder="Search"
                />
               </div>
              <ReactTable
                       noDataText="No specialisation found !!"
                       data={props.specialisationData}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={props.filtered}
                       columns={[
                             {  
                                Header      : "Specialisation",
                                accessor    : "spl_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                resizable   : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "doc_spl_id",
                               filterable  : false,
                               className :"actionCellClass",
                               width       : 200,
                               Cell: row => <div className="pull-left">
                                                    <a href="javascript:void(0);" onClick={props.specialisationEditShowHandle.bind(null,row.original)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.specialisationDelete.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "spl_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {3}
                        minRows= {props.specialisationData.length}
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
                            props.getSpecialisationList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div> 
          </div>
        );
      }