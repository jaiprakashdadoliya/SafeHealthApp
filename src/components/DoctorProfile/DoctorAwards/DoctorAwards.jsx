/**
 * Doctor awards
 *
 * @package                SafeHealth
 * @subpackage             Doctor awards
 * @category               Presentational Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible to render doctor awards list
 */
import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { DoctorAwardsAdd } from "./DoctorAwardsAdd";
import { DoctorAwardsAddContainer } from "./DoctorAwardsAddContainer";

export const DoctorAwards = (props) => {
    return (
        <div className="inner-content specialisation-section">
            <DoctorAwardsAddContainer
                awardAddShow       = { props.awardAddShow }
                awardAddHideHandle = { props.awardAddHideHandle }
                awardEditDetail    = { props.awardDetail }
            />
            <div className="row">
                <h3 className="col-md-10 col-sm-8 col-xs-9">Awards</h3>
                <div className="col-md-2 col-sm-4 col-xs-3">
                  <a href="javascript:void(0);" onClick={ props.awardAddShowHandle.bind(null) } className="text-right add-btn"> <FontAwesomeIcon icon={faPlus} /> Add</a>
                </div>
            </div>
            <div className="table-wrap">
              <div className="table-search">
                  <input 
                  value={props.filterAll}
                  onChange={props.awardSearch}
                  className="table-search-input"
                  placeholder="Search"
              />
            </div>
            <ReactTable
             noDataText="No Awards found !!"
             data={props.awards}
             filterable
             defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
             filtered={props.filtered}
             columns={[
                   {  
                      Header      : "Awards Name",
                      accessor    : "doc_award_name",
                      className   : "dataCellClass",
                      filterable  : false,
                      filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                      }
                   },
                   {
                     Header: "Year of Awards",
                     accessor: "doc_award_year",
                     className : "dataCellClass",
                     filterable  : false,
                     filterMethod: (filter, row) => {
                       return row[filter.id].includes(filter.value);
                     }
                   },
                   {
                     Header: 'Actions',
                     accessor  : "doc_award_id",
                     resizable   : false,
                     filterable  : false,
                     className :"actionCellClass",
                      Cell: row => <div className="pull-left"><a href="javascript:void(0);" onClick={props.awardAddShowHandle.bind(null,row.original)} className="green btn table-btn">Edit</a><a href="javascript:void(0)" onClick={props.awardDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a></div>
                    }
                  ]}
              defaultSorted={[
                  {
                      id: "doc_award_name",
                      desc: true
                  } 
              ]}
              defaultPageSize= {3}
              minRows= {props.awards.length}
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
                  props.getawardsList(state.page, state.pageSize, state.sorted, state.filtered);
              }}
           /> 
        </div>
      </div>
    );
}