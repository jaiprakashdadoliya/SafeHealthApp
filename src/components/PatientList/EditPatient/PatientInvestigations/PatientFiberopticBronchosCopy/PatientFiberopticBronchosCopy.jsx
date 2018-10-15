import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientFiberopticBronchosCopy = (props) => {
  return(
    <div>
        <div className="row">
            <div className="col-md-12">
                <span></span>
            </div>
            </div>
                <div className="row">
                
                <div className="row">
                <FxForm
                    config={props.formConfig}
                    ref={(form) => {
                            props.handleBoundFormFiberopticBronchosCopyUpdate(form);
                        }}
                />
                </div>
                
                </div>
            <div className="form-group"></div>
            <div className="divTable">
                <div className="divTableHeading">
                    <div className="divTableRow">
                        <div className="divTableHead">S.No.</div>
                        <div className="divTableHead">Test</div>
                        <div className="divTableHead">Result</div>
                        <div className="divTableHead">%</div>
                    </div>
                </div>
                <div className="divTableBody">
                {
                    Object.entries(props.tableFormData).length> 0 ? Object.entries(props.tableFormData).map(function(tableData,index){
                       return  (
                                tableData[1].length > 0 ? tableData[1].map(function(tableDataRow,indextable){
                                    return (
                                         tableDataRow.option.length > 0 ? tableDataRow.option.map(function(tableRow,indexNe){
                                            var thisIsMyCopy = '';
                                            if(indexNe == 0 && tableDataRow.id == '2'){
                                                 var thisIsMyCopy = (<div className="divTableRow" key={indexNe}>
                                                            <div className="divTableCell">&nbsp;</div>
                                                            <div className="divTableCell">&nbsp;</div>
                                                            <div className="divTableCell"><strong>Report</strong></div>
                                                            <div className="divTableCell"><strong>Suggestive of</strong></div>
                                                        </div> );
                                                
                                            }
                                            let suggestiveName = tableDataRow.name+'_'+tableRow.id;
                                            if(tableDataRow.id != '1'){
                                                let customName = 'custom_'+tableDataRow.name+'_'+tableRow.id;
                                                var conditionHtml = (
                                                        <div className="divTableCell" ds={indexNe+index} key={indexNe}><input type="text" name={customName} className="form-control medium-size" value={props.payLoad[customName]} onChange={props.handleInputChange}/></div>
                                                );
                                                
                                            }else{
                                                var conditionHtml = (
                                                        <div className="divTableCell" ds={indexNe} key={indexNe}>{tableRow.title}</div>
                                                );
                                            }
                                            return (    
                                                        <React.Fragment key={tableRow.id+index}>
                                                        {thisIsMyCopy}
                                                        <div className="divTableRow" ds={tableRow.id}>
                                                            <div className="divTableCell">{indexNe == 0 ? tableDataRow.id :''}</div>
                                                            <div className="divTableCell">{indexNe == 0 ? tableDataRow.title :''}</div>
                                                            {conditionHtml}
                                                            <div className="divTableCell"><input type="text" name={suggestiveName} className="form-control medium-size" value={props.payLoad[suggestiveName]} onChange={props.handleInputChange}/></div>
                                                        </div>
                                                        </React.Fragment>
                                                    );
                                        }):''
                                    );
                                }) : ''

                            );

                    }) : ''
                }
                    
                </div>
            </div>
        </div>
  );
}