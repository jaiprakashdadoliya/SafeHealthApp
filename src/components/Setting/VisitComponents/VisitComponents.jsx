import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import Select from 'react-select';
import ReactTable from "react-table";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { headerActions } from '../../../_actions';
import { visitComponentsActions }  from './visitComponentsActions';
import { configConstants } from './../../../_constants';
/**
 * VisitComponents
 *
 * @package                SafeHealth
 * @subpackage             VisitComponents
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for VisitComponents
 */
class VisitComponents extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.getVisitComponentsList = this.getVisitComponentsList.bind(this);
    this.visitComponentsSearch = this.visitComponentsSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      visitComponentsList : [],
      filtered: [],
      filterAll: ''
    };
  }

   /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(visit_cmp_id, type) {
      const {visitComponentsList} = this.state;
      const {dispatch} = this.props;
      const index = visitComponentsList.findIndex(
                      i => 
                          i.visit_cmp_id === visit_cmp_id
                      );
      if(type == 'is_visible'){
        let is_visible = visitComponentsList[index].is_visible;
        if(is_visible == configConstants.IS_VISIBLE_NO || is_visible == null){
          visitComponentsList[index].is_visible = configConstants.IS_VISIBLE_YES;
        }else{
          visitComponentsList[index].is_visible = configConstants.IS_VISIBLE_NO;
        }
      }
      
      if(type == 'show_in'){
        let show_in = visitComponentsList[index].show_in;
        if(show_in == configConstants.SHOW_IN_FOLLOWUP_NO || show_in == null){
          visitComponentsList[index].show_in = configConstants.SHOW_IN_FOLLOWUP_YES;
        }else{
          visitComponentsList[index].show_in = configConstants.SHOW_IN_FOLLOWUP_NO;
        }
      }

      this.setState({
        visitComponentsList : visitComponentsList
      }, function(){
         dispatch(visitComponentsActions.updateVisitSetting(visitComponentsList[index]))
      })
    }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getVisitComponentsList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(visitComponentsActions.getList(page, pageSize, sorted, filtered));
  }


  
  componentWillReceiveProps(nextProps){
    let { visitComponentsList } = this.state;
    this.setState({
      visitComponentsList : nextProps.visitComponentsList
    })
  }


  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered patient group list
   * @return                Nothing
   */
    visitComponentsSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }


    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for render HTML
    * @return                Nothing
    */
    render() {
      
      return(
      <div>
        <div className="col-md-12">
            <h4>Visit Components</h4>
        </div>
          <div className="table-wrap tabel-responsive col-md-12">
              <div className="table-search">
                Search: <input 
                  value={this.state.filterAll}
                  onChange={this.visitComponentsSearch}
                  className="table-search-input"
                />
               </div>
                <ReactTable
                         noDataText="No visit component found !!"
                         data={this.state.visitComponentsList}
                         filterable
                         defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                         filtered={this.state.filtered}
                         columns={[
                               {  
                                  Header      : "Visit Components",
                                  accessor    : "component_title",
                                  className   : "dataCellClass",
                                  filterable  : false,
                                  filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value);
                                  }
                               },
                               {
                                 Header: 'Component visibility',
                                 accessor  : "is_visible",
                                 filterable  : false,
                                 className :"dataCellClass",
                                 Cell: row => <div>
                                                <input 
                                                  className="option-input checkbox" 
                                                  name="is_visible" 
                                                  type="checkbox"
                                                  value={row.value}
                                                  checked={row.value == configConstants.IS_VISIBLE_YES ? true : false}
                                                  onChange ={this.handleInputChange.bind(null,row.original.visit_cmp_id,'is_visible')} 
                                                />
                                              </div>
                                },
                                {
                                 Header: 'Visible followup visit',
                                 accessor  : "show_in",
                                 filterable  : false,
                                 className :"dataCellClass",
                                 Cell: row => <div>
                                                <input 
                                                  className="option-input checkbox" 
                                                  name="show_in" 
                                                  type="checkbox"
                                                  value={row.value}
                                                  checked={row.value == configConstants.SHOW_IN_FOLLOWUP_YES ? true : false}
                                                  onChange ={this.handleInputChange.bind(null,row.original.visit_cmp_id,'show_in')} 
                                                />
                                              </div>
                                }
                              ]}
                          defaultSorted={[
                              {
                                  id: "component_title",
                                  desc: true
                              } 
                          ]}
                          defaultPageSize= {configConstants.PAGE_SIZE}
                          minRows= {this.props.visitComponentsList.length}
                          className="table table-bordered responsive"
                          loading={this.props.loader}
                          filterable
                          Sorted
                          pages={this.props.pages}
                          showPagination={true}
                          showPaginationTop={true}
                          showPaginationBottom={false}
                          pageSizeOptions={[10,20,50,100]}
                          manual // For server side pagination
                          onFetchData={(state, instance) => {
                              this.getVisitComponentsList(state.page, state.pageSize, state.sorted, state.filtered);
                          }}
                       />  
          </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for patient group 
 * @return                patient group detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, visitComponentsList, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.visitComponents;
    return {
      pages,
      isUserNotValid,
      visitComponentsList,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedVisitComponents = connect(mapStateToProps)(VisitComponents);
export { connectedVisitComponents as VisitComponents };