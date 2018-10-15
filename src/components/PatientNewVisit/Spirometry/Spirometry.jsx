import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const Spirometry = (props) => {
  
    return (
        <div>   
            {/*
            <div className="add-tb-spaces row">
                <div className="form-group">
                    <h4 className="col-md-4">Spirometry test</h4> 
                    <FxForm
                        config={props.spirometryFormData}
                        ref={(form) => {
                            props.handleBoundFormSpirometryUpdate(form);
                        }}
                    />
                </div>
            </div>             
            */}
            <div className="divTable">
                <div className="divTableHeading">
                  <div className="divTableRow">
                    
                  </div>
                  <div className="divTableRow">
                    <div className="divTableHead">&nbsp;</div>
                    <div className="divTableHead">Pre-bronchodilator (actual)</div>
                    <div className="divTableHead">Post-bronchodilator (actual)</div>
                  </div>
                </div>
                <div className="divTableBody">
                    {
                        props.spirometryTableFormData.length > 0 ?  props.spirometryTableFormData.map(tableFectorDetails => {
                            let preValue  = 'spirometries_fector_pre_value_'+tableFectorDetails.spirometries_fector_id
                            let postValue = 'spirometries_fector_post_value_'+tableFectorDetails.spirometries_fector_id

                            let prePlaceHolder = '';
                            let postPlaceHolder = '';
                            let isReadOnly = false;
                            if(tableFectorDetails.spirometries_fector_value == 'FEV1 (L)')
                            {
                                prePlaceHolder  = 'A1';
                                postPlaceHolder = 'B1';
                            }else if(tableFectorDetails.spirometries_fector_value == 'FVC (L)')
                            {
                                prePlaceHolder  = 'A2';
                                postPlaceHolder = 'B2';
                            }else if(tableFectorDetails.spirometries_fector_value == 'FEV1/FVC')
                            {
                                prePlaceHolder  = 'A1/A2';
                                postPlaceHolder = 'B1/B2';
                                isReadOnly = true;
                            }

                            return(
                                <div className="divTableRow" key={tableFectorDetails.spirometries_fector_id}>
                                    <div className="divTableCell">{tableFectorDetails.spirometries_fector_value}</div>
                                    <div className="divTableCell">
                                        <input type="text" placeholder={prePlaceHolder} className="form-control medium-size" name={'spirometries_fector_pre_value_'+tableFectorDetails.spirometries_fector_id} onChange={props.handleInputChange} value={props.state[preValue]} readOnly={isReadOnly} />
                                    </div>
                                    <div className="divTableCell">
                                        <input type="text" placeholder={postPlaceHolder} className="form-control medium-size" name={'spirometries_fector_post_value_'+tableFectorDetails.spirometries_fector_id} onChange={props.handleInputChange} value={props.state[postValue]} readOnly={isReadOnly} />
                                    </div>
                                </div>
                            )
                        }) : ''
                    }                  
                </div>
              </div>
        </div>
    );
}
