import React from 'react';
import ReactTable from "react-table";
import {FxFormViewContainer} from "./FxFormViewContainer";

export const FxMultiAddForm = (props) => {
    return (         
        <div className={props.fxMultiAddFormExtraConfig.cssClasses.parentContainer ? props.fxMultiAddFormExtraConfig.cssClasses.parentContainer :''}>
            {props.fxMultiAddFormExtraConfig.viewHeader()}
            <FxFormViewContainer 
                propsObj   = {props.propsObj}
                fxFormViewModel = {props.fxFormViewModel}
                fxFormViewModelHideHandle = {props.fxFormViewModelHideHandle}
                fxFormConfig = {props.fxFormConfig}
                handleBoundFormUpdate = {props.handleBoundFormUpdate}
                handleSubmit = {props.handleSubmit}
                fxMultiAddFormTitle = {props.fxMultiAddFormTitle}
                successMsg  = {props.successMsg}
                errorMsg    = {props.errorMsg}
                submitted    = {props.submitted}
                fxMultiAddFormExtraConfig = {props.fxMultiAddFormExtraConfig}
            />
            <div className={props.fxMultiAddFormExtraConfig.cssClasses.gridWrap ? props.fxMultiAddFormExtraConfig.cssClasses.gridWrap :'table-wrap'}>
                <div className={props.fxMultiAddFormExtraConfig.cssClasses.searchWrap ? props.fxMultiAddFormExtraConfig.cssClasses.searchWrap :'table-search'} >
                   <input 
                        value={props.filterAll}
                        onChange={props.searchHandler}
                        placeholder={props.fxMultiAddFormExtraConfig.searchPlaceholder ? props.fxMultiAddFormExtraConfig.searchPlaceholder :'Search'}
                        className={props.fxMultiAddFormExtraConfig.cssClasses.searchInput ? props.fxMultiAddFormExtraConfig.cssClasses.searchInput :'table-search-input'}
                    />
                </div>
                <ReactTable
                    {...props.gridData}
                />

            </div>
        </div>
    );
}