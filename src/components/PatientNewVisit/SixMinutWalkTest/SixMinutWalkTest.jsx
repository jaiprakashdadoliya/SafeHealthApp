import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const SixMinutWalkTest = (props) => {
    return (
        <div>    
        <div className="form-group"> &nbsp;</div>
            <div className="add-tb-spaces row">
                <div className="form-group">
                    <h4 className="col-md-4">6 minute walk test</h4> 
                    <FxForm
                        config={props.sixMinutWalkTestFormData}
                        ref={(form) => {
                            props.handleBoundForm6MWTUpdate(form);
                    }}
                    />
                </div>
            </div>
            <div className="divTable">
                <div className="divTableHeading">              
                  <div className="divTableRow table-bg">
                      <div className="divTableCell colspan2"><div><div>(While breathing air)</div></div></div>
                      <div className="divTableCell">&nbsp;</div>
                      <div className="divTableCell">&nbsp;</div>
                      <div className="divTableCell colspan2"><div><div>Walk test while breathing supplemental oxygen : L/min</div></div></div>
                      <div className="divTableCell">&nbsp;</div>
                      <div className="divTableCell">&nbsp;</div>
                  </div>
                </div>
                <div className="divTableBody">
                    <div className="divTableRow">
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">Before 6MWT</div>
                        <div className="divTableCell">Immediately after 6MWT</div>
                        <div className="divTableCell">&nbsp;</div>
                        <div className="divTableCell">Before 6MWT</div>
                        <div className="divTableCell">Immediately after 6MWT</div>
                    </div>
                    {
                        props.sixMinutWalkTestTableFormData.map(tableFectorDetails => {
                            let labelTitle1 = 'sixmwt_fector_value_'+tableFectorDetails.sixmwt_fector_type_key_1
                            let labelTitle2 = 'sixmwt_fector_value_'+tableFectorDetails.sixmwt_fector_type_key_2
                            
                            let sixmwt_before1 = 'sixmwt_before_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_1
                            let sixmwt_before2 = 'sixmwt_before_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_2
                            let labelAfter1 = 'sixmwt_after_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_1
                            let labelAfter2 = 'sixmwt_after_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_2
                            return(
                                <div className="divTableRow" key={tableFectorDetails.sixmwt_fector_type_key_1}>
                                    <div className="divTableCell">{tableFectorDetails[labelTitle1]}</div>
                                    <div className="divTableCell"><input name={sixmwt_before1} type="text" className="form-control medium-size" onChange={props.handleInputChange} value={props.state[sixmwt_before1]} /></div>
                                    <div className="divTableCell"><input name={labelAfter1} type="text" className="form-control medium-size" onChange={props.handleInputChange} value={props.state[labelAfter1]} /></div>
                                    <div className="divTableCell">{tableFectorDetails[labelTitle2]}</div>
                                    <div className="divTableCell"><input name={sixmwt_before2} type="text" className="form-control medium-size" onChange={props.handleInputChange} value={props.state[sixmwt_before2]} /></div>
                                    <div className="divTableCell"><input name={labelAfter2} type="text" className="form-control medium-size" onChange={props.handleInputChange} value={props.state[labelAfter2]} /></div>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );    
}
