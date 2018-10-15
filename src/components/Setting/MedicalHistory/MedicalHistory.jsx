import React from "react";
import { Button, Alert, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactTable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import { configConstants } from './../../../_constants';
import { medicalHistoryActions } from './medicalHistoryActions';
import { medicalHistoryValidator } from './medicalHistoryValidator';
/**
 * MedicalHistory
 *
 * @package                SafeHealth
 * @subpackage             MedicalHistory
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for add disease and show disease
 */
class MedicalHistory extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.medicalHistoryEditShowHandle = this.medicalHistoryEditShowHandle.bind(this);
    this.medicalHistoryEditHideHandle = this.medicalHistoryEditHideHandle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.diseaseDeleteHandle = this.diseaseDeleteHandle.bind(this);
    this.getDiseasesList = this.getDiseasesList.bind(this);
    this.diseaseSearch = this.diseaseSearch.bind(this);
    this.state = {
      medicalHistoryShow: false,
      disease:this.initialState,
      editDisease: this.initialState,
      filtered: [],
      filterAll: ''
    };
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getDiseasesList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(medicalHistoryActions.diseaseList(page, pageSize, sorted, filtered));
  }


  /**
   * @DateOfCreation        10 June 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          disease_id       : '',
          disease_name     : '',
        },
        validate:{
          disease_name     : { isValid:true,message:''},
        }
    }
  }

    /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.disease;
    this.setState({
        disease: {
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
  * @DateOfCreation        10 june 2018
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 selectOption and form name
  * @return                Nothing
  */
  handleSelectChange(selectedOption, name) {
    const { detail, validate }  = this.state.disease;
    this.setState({
        disease : {
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
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to show edit model with value
   * @param                 List index Object
   * @return                Nothing
   */
  medicalHistoryEditShowHandle(index) {
      var diseaseData = this.props.diseases[index];
      const { detail,validate } = this.state.disease;
      this.setState({
        disease:{
          detail:{
          ...detail,
            disease_id      : diseaseData.disease_id,
            disease_name    : diseaseData.disease_name,
          },
          validate:{
            ...validate,
            'disease_name'    : {
                    isValid: true,
                    message: ''
                },
          }
        }
      });
      this.setState({ medicalHistoryShow: true });
  }

  handleClose() {
    const { dispatch }  = this.props;
    dispatch(medicalHistoryActions.resetState());
    this.medicalHistoryEditHideHandle();
    this.setState({disease:this.initialState});
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to save disease information
   * @return                Nothing
   */
  handleSave(){
    if(medicalHistoryValidator.isDiseaseValid(this)){ 
      const { detail } = this.state.disease;
      const { dispatch } = this.props;
      dispatch(medicalHistoryActions.diseaseSave(detail,this.props.diseases));
    } 
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to check props and reset state, activeKey come 
                            from setting
   * @param                 List index Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if((nextProps.addSuccessMessage || nextProps.deleteErrorMsg) && nextProps.activeKey){
      setTimeout(function() { 
        this.setState({disease:this.initialState});
        const { dispatch }  = this.props;
        dispatch(medicalHistoryActions.resetState());
      }.bind(this), 1500);
    }else if(nextProps.addErrorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(medicalHistoryActions.resetState());
      }.bind(this), 1500);      
    }
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  medicalHistoryEditHideHandle() {
    this.setState({ medicalHistoryShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete disease request
   * @param int diseaseId disease id of perticular doctor
   * @return                Nothing
   */
  diseaseDeleteHandle(diseaseId){
     confirmAlert({
      title: 'Disease delete',
      message: 'Are you sure you want to delete this disease?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(medicalHistoryActions.diseaseDelete(diseaseId, this.props.diseases));  
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
   * @ShortDescription      This function is responsible to handle load filtered disease list
   * @return                Nothing
   */
    diseaseSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }


  render() {
    return(
      <div>
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
            <h4>Medical History</h4>
        </div>
          <div className="col-md-6">
              <div className="form-group">
                  <div className={this.state.disease.validate.disease_name.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="disease_name" id="disease_name" onChange={this.handleChange} value={this.state.disease.detail.disease_name} />
                      <span className="help-block">{this.state.disease.validate.disease_name.message}</span>
                  </div>
              </div>
          </div>
          <div className="col-md-3 text-left">
            { this.state.medicalHistoryShow ?
              <div className="form-group">
                <Button className="btn table-btn green margin-top-25" onClick={this.handleSave}  disabled={this.props.editSuccessMessage ? true : false}>Save</Button>
                <Button className="btn table-btn red margin-top-25" onClick={this.handleClose}>Cancel</Button>
              </div>
            :
              <div className="form-group">
                  <button className="green btn table-btn" id="dr_pass_change" onClick={this.handleSave}  disabled={this.props.editSuccessMessage ? true : false}>Add</button>
              </div>
            }
          </div>
          <hr/>
          <div className="table-wrap tabel-responsive col-md-12">
              <div className="table-search">
                Search: <input 
                  value={this.state.filterAll}
                  onChange={this.diseaseSearch}
                  className="table-search-input"
                />
               </div>
              <ReactTable
                       noDataText="No Disease found !!"
                       data={this.props.diseases}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={this.state.filtered}
                       columns={[
                             {  
                                Header      : "Disease Name",
                                accessor    : "disease_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "disease_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                                    <a href="javascript:void(0);" onClick={this.medicalHistoryEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={this.diseaseDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "disease_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {configConstants.PAGE_SIZE}
                        minRows= {this.props.diseases.length}
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
                            this.getDiseasesList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for disease 
 * @return                disease detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, diseases, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.medicalHistoryDoctor;
  return {
      pages,
      isUserNotValid,
      diseases,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedMedicalHistory = connect(mapStateToProps)(MedicalHistory);
export { connectedMedicalHistory as MedicalHistory };