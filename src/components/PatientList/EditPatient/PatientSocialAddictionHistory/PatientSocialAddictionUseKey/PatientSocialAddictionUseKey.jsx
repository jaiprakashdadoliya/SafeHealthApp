import React from "react";

export const PatientSocialAddictionUseKey = (props) => {
  return(
    <div>
      <div className="table-responsive">
      <div className="divTable">
        <div className="divTableHeading">
          <div className="divTableRow">
            <div className="divTableHead">Tobacco use</div>
            {   
                props.formData.headerData.map(headerData =>{
                     return( 
                         <div className="divTableHead" key={headerData.id}>{headerData.name}</div>
                    );
                 })
            }
          </div>
        </div>
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell">Starting age</div>
            {
              props.formData.starting_age.map(starting_age =>{
                return( 
              <div className="divTableCell" key={starting_age.id} >
                      <input name={starting_age.id} value={props.state[starting_age.id]} onChange={props.handleInputChange}  className="form-control" type="text" />
            </div>
                  );
              })
            }
          </div>
          <div className="divTableRow">
            <div className="divTableCell">Stopping age</div>
            {
              props.formData.stopping_age.map(stopping_age =>{
                return( 
              <div className="divTableCell" key={stopping_age.id}>
              <input name={stopping_age.id} value={props.state[stopping_age.id]} onChange={props.handleInputChange}  className="form-control" type="text" />
            </div>
                  );
              })
            }
          </div>
          <div className="divTableRow">
            <div className="divTableCell">Quantitiy/Day</div>
            {
              props.formData.quantitiy.map(quantitiy =>{
                return( 
              <div className="divTableCell" key={quantitiy.id}>
              <input name={quantitiy.id} value={props.state[quantitiy.id]} onChange={props.handleInputChange}  className="form-control" type="text" />
            </div>
                  );
              })
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
