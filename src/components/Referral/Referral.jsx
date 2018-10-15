import React from "react";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import ReactTable from "react-table";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { headerActions } from '../../_actions';
import { referralActions }  from './referralActions';
import { configConstants } from './../../_constants';
import { ReferralEdit } from './ReferralEdit';
import { referralValidator } from './referralValidator';
/**
 * Referral
 *
 * @package                SafeHealth
 * @subpackage             Referral
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for Referral
 */
class Referral extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.referralEditShowHandle = this.referralEditShowHandle.bind(this);
    this.referralEditHideHandle = this.referralEditHideHandle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.referralDeleteHandle = this.referralDeleteHandle.bind(this);
    this.getReferralList = this.getReferralList.bind(this);
    this.referralSearch = this.referralSearch.bind(this);
    this.state = {
      referralShow: false,
      referral:this.initialState,
      editReferral: this.initialState,
      filtered: [],
      filterAll: ''
    };
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getReferralList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(referralActions.getList(page, pageSize, sorted, filtered));
  }


  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          doc_ref_id       : '',
          doc_ref_name     : '',
          doc_ref_mobile   : ''
        },
        validate:{
          doc_ref_id     : { isValid:true,message:''},
          doc_ref_name   : { isValid:true,message:''},
          doc_ref_mobile : { isValid:true,message:''}
        }
    }
  }

   /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                        so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.referral;
    this.setState({
        referral: {
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
            detail: {
                ...detail,
                [name]: value
            }
        }
    });
  }
  
 /**
  * @DateOfCreation        22 Aug 2018
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 selectOption and form name
  * @return                Nothing
  */
  handleSelectChange(selectedOption, name) {
    const { detail, validate }  = this.state.referral;
    this.setState({
        referral : {
            detail : {
                ...detail,
                [name]: selectedOption.value
            },
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
        }
    });
  }
  
  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to show edit model with value
   * @param                 List index Object
   * @return                Nothing
   */
  referralEditShowHandle(index) {
      var referralData = this.props.referralList[index];
      const { detail,validate } = this.state.editReferral;
      this.setState({
        editReferral:{
          detail:{
          ...detail,
            doc_ref_id      : referralData.doc_ref_id,
            doc_ref_name    : referralData.doc_ref_name,
            doc_ref_mobile  : referralData.doc_ref_mobile
          },
          validate:{
            ...validate
          }
        }
      });
      this.setState({ referralShow: true });
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to save doctor referral information
   * @return                Nothing
   */
  handleSave(){
    if(referralValidator.isReferralValid(this)){ 
      const { detail } = this.state.referral;
      const { dispatch } = this.props;
      dispatch(referralActions.doSave(detail));
    } 
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to check props and reset state, activeKey come 
                            from setting
   * @param                 List index Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if((nextProps.addSuccessMessage || nextProps.deleteErrorMsg) && nextProps.activeKey){
      setTimeout(function() { 
        this.setState({referral:this.initialState});
        const { dispatch }  = this.props;
        dispatch(referralActions.resetState());
      }.bind(this), 1500);
    }else if(nextProps.addErrorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(referralActions.resetState());
      }.bind(this), 1500);      
    }
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  referralEditHideHandle() {
    this.setState({ referralShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete doctor referral request
   * @param int referralId doctor referral id of perticular appointment
   * @return                Nothing
   */
  referralDeleteHandle(referralId){
     confirmAlert({
      title: 'Referral delete',
      message: 'Are you sure you want to delete this Referral?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(referralActions.doDelete(referralId, this.props.referralList));  
          }
        },
        {
          label: 'No',
          onClick: () => {return false;}
        }
      ]
    })
  }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered doctor referral list
   * @return                Nothing
   */
    referralSearch(event){
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
        <ReferralEdit
           referralShow = {this.state.referralShow}
           referralEditHideHandle = {this.referralEditHideHandle}
           referral = { this.state.editReferral.detail}
           referralList = {this.props.referralList}
        />
       { this.props.addSuccessMessage &&                     
          <Alert bsStyle="success">
            { this.props.addSuccessMessage }
          </Alert>
        }
        { this.props.deleteErrorMsg &&                      
          <Alert bsStyle="danger">
            { this.props.deleteErrorMsg }
          </Alert>
        }
        { this.props.addErrorMsg &&                      
          <Alert bsStyle="danger">
            { this.props.addErrorMsg }
          </Alert>
        }
        <div className="col-md-12">
            <h4>Referral</h4>
        </div>
          <div className="col-md-3">
              <div className="form-group">
                  <div className={this.state.referral.validate.doc_ref_name.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="doc_ref_name" id="doc_ref_name" onChange={this.handleChange} value={this.state.referral.detail.doc_ref_name} placeholder='Referral Name' />
                      <span className="help-block">{this.state.referral.validate.doc_ref_name.message}</span>
                  </div>
              </div>
          </div>
          <div className="col-md-3">
              <div className="form-group">
                  <div className={this.state.referral.validate.doc_ref_mobile.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="doc_ref_mobile" id="doc_ref_mobile" onChange={this.handleChange} value={this.state.referral.detail.doc_ref_mobile}  placeholder='Contact Number' />
                      <span className="help-block">{this.state.referral.validate.doc_ref_mobile.message}</span>
                  </div>
              </div>
          </div>
          <div className="col-md-2 text-left">
              <div className="form-group">
                  <button className="green btn table-btn" id="dr_pass_change" onClick={this.handleSave}  disabled={this.props.editSuccessMessage ? true : false}>Add</button>
              </div>
          </div>
          <hr/>
          <div className="table-wrap tabel-responsive col-md-12">
              <div className="table-search">
                Search: <input 
                  value={this.state.filterAll}
                  onChange={this.referralSearch}
                  className="table-search-input"
                />
               </div>
              <ReactTable
                       noDataText="No doctor referral found !!"
                       data={this.props.referralList}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={this.state.filtered}
                       columns={[
                             {  
                                Header      : "Referral",
                                accessor    : "doc_ref_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {  
                                Header      : "Contact Number",
                                accessor    : "doc_ref_mobile",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "doc_ref_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                                    <a href="javascript:void(0);" onClick={this.referralEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={this.referralDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "doc_ref_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {2}
                        minRows= {this.props.referralList.length}
                        className="table table-bordered responsive"
                        loading={this.props.loader}
                        filterable
                        Sorted
                        pages={this.props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[1, 2, 3, 4, 5, 6]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            this.getReferralList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for doctor referral 
 * @return                doctor referral detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, referralList, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.referral;
    return {
      pages,
      isUserNotValid,
      referralList,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedReferral = connect(mapStateToProps)(Referral);
export { connectedReferral as Referral };