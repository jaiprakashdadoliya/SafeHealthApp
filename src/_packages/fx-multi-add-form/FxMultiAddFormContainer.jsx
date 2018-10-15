import React from 'react';
import {FxMultiAddForm} from './FxMultiAddForm';

/*
 * *****************************************************************************
 * Grid Data Config
 * *****************************************************************************
 * For grid data config detail refer 
 * https://www.npmjs.com/package/react-table
 */


/*
 * *****************************************************************************
 * filterAll Props
 * *****************************************************************************
 * FilterAll refer to the search query value
 */


/*
 * *****************************************************************************
 * searchHandler Props
 * *****************************************************************************
 * Search handler is the function which calls on search input change
 * searchHandler(event){ 
 *       const { value } = event.target;
 *       const filterAll = value;
 *       const filtered = [{ id: 'all', value: filterAll }];
 *       this.setState({ filterAll, filtered });
 *   }
 */


/*
 * *****************************************************************************
 * fxFormViewModel Props
 * *****************************************************************************
 * This is a boolean type props which contains TRUE/FALSE to show hide modal box
 * Manage this state in your parent component and paas in FxMultiAddFormContainer
 *  
 */


/*
 * *****************************************************************************
 * fxFormViewModelHideHandle Props
 * *****************************************************************************
 * This is a funcion to hide modal box 
 * Define it in your parent component and paas in FxMultiAddFormContainer
 *  fxFormViewModelHideHandle() {
 *       const {fxFormViewModel}  = this.state;
 *                this.setState({
 *               fxFormViewModel : false
 *       });
 *   }
 *   }
 */


/*
 * *****************************************************************************
 * handleBoundFormUpdate Props
 * *****************************************************************************
 * This is a function to update FxMultiAddFormContainer ref in parent compoent
 * handleBoundFormUpdate(data){
 *       this.boundForm = data;
 * }
 *   
 */


/*
 * *****************************************************************************
 * handleSubmit Props
 * *****************************************************************************
 * This is a function to call API in add/update form you can define it in your 
 * container component like this
 * handleSubmit() {
 *       if(this.boundForm){
 *           const { dispatch } = this.props;
 *           let correctSymptom = this.boundForm.getData();

 *           if(correctSymptom){
 *               if(correctSymptom.visit_symptom_id == ""){
 *                   dispatch(patientSymptomsActions.patientSymptomsSubmit(correctSymptom));
 *               }else{
 *                   dispatch(patientSymptomsActions.patientSymptomsUpdateSubmit(correctSymptom));
 *               }
 *           }
 *      }
 *   }
 *   
 */


/*
 * *****************************************************************************
 * fxMultiAddFormExtraConfig Props
 * *****************************************************************************
 * This contains extra configurations for multi add form
 * const extraConfig = {
 *               viewHeader: () => {
 *                   return (
 *                       <div className="row">
 *                           <div className="col-md-6 col-sm-12" id="medicalHistoryTitle">
 *                               <h3>Symptoms</h3>    
 *                           </div>
 *                           <div className="col-md-6 col-sm-12 text-right">
 *                               <button className="btn text-btn green" onClick={this.patientSymptomsShowHandle.bind(null, '')}>Add New</button>
 *                           </div>
 *                       </div>
 *                   )
 *               },
 *               searchPlaceholder:'',
 *               cssClasses:{
 *                   parentContainer:'',
 *                   gridWrap:'',
 *                   searchWrap:'',
 *                   searchInput:'',
 *                   formCloseBtn:'',
 *                   formSaveBtn:'',
 *               },                
 *               formCloseBtnText:'',
 *               formSaveBtnText:'',
 *               formSaveRequestBtnText:''
 *           }
 *
 *  
 */


/*
 * *****************************************************************************
 * fxMultiAddFormTitle Props
 * *****************************************************************************
 * This Contains the title of modal box
 *   
 */


/*
 * *****************************************************************************
 * successMsg Props
 * *****************************************************************************
 * This Contains successMsg mesage of API call update this as setState in 
 * your container compoent by reducer call
 *   
 */


/*
 * *****************************************************************************
 * errorMsg Props
 * *****************************************************************************
 * This Contains errorMsg mesage of API call update this as setState in 
 * your container compoent by reducer call
 *   
 */

/*
 * *****************************************************************************
 * submitted Props
 * *****************************************************************************
 * This Contains stop multiple request call when one submit request call
 * your container compoent by reducer call
 *   
 */

export class FxMultiAddFormContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (                
            <FxMultiAddForm 
                gridData={this.props.gridData}
                filterAll = {this.props.filterAll}
                searchHandler = {this.props.searchHandler}
                propsObj   = {this.state}
                fxFormViewModel = {this.props.fxFormViewModel}
                fxFormViewModelHideHandle = {this.props.fxFormViewModelHideHandle}
                fxFormConfig = {this.props.fxFormConfig}
                handleBoundFormUpdate         = {this.props.handleBoundFormUpdate}
                handleSubmit = {this.props.handleSubmit}
                fxMultiAddFormExtraConfig = {this.props.fxMultiAddFormExtraConfig}
                fxMultiAddFormTitle = {this.props.fxMultiAddFormTitle}
                successMsg  = {this.props.successMsg}
                errorMsg    = {this.props.errorMsg}
                submitted    = {this.props.submitted}
            />
        );
    }
}