import React from "react";
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import Select from 'react-select';
import Loadable from 'react-loadable';
import {configConstants} from '../../_constants';
import {utilityHelper} from '../../_helpers';
const SideMenu = Loadable({
    loader: () => import('../SideMenu').then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header').then(object => object.HeaderContainer),
    loading: Loading
});

export const Payments = (props) => {
	var listArray = [];
    var activeClass;
    for (var i=0; i < props.pages; i++) {
        activeClass ='paginate_button';
        if(i == props.page){
          activeClass = "paginate_button active";
        }
        if(i<10){
         listArray.push(<li className={activeClass} key={i}><a href="javascript:void(0)"  data-dt-idx="1" tabIndex="0" onClick={props.handlePaginationClick.bind(null,i)}>{i+1}</a></li>);
        }
    }
	return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Payment History</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <button  className="btn green text-btn">Add</button>
                                </div>
                            </div>
                            <div className="row page-header">
                            	<div className="col-md-12 text-right">
                              		<div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
                                		{ props.pages >= 2 &&
	                                      	<ul className="pagination">
	                                        	<li className="paginate_button" disabled={props.buttonDisable} id="example_previous"><a href="javascript:void(0)" aria-controls="example" data-dt-idx="0" tabIndex="0" onClick={props.pageNavigation.bind(null, props.page, configConstants.PREVIOUS_SLOT,props.pages)}>Previous</a></li>
	                                        	{listArray}
	                                        	<li className="paginate_button" disabled={props.buttonDisable} id="example_next"><a href="javascript:void(0)" aria-controls="example" data-dt-idx="7" tabIndex="0"  onClick={props.pageNavigation.bind(null, props.page, configConstants.NEXT_SLOT,props.pages)}>Next</a></li>
	                                      	</ul>
                                		}
                              		</div>
                              	</div>
                            </div>
                            {!props.sendingRequest && props.paymentsHistory.length > 0 ? props.paymentsHistory.map((detail, index) =>{
                     
								if(detail != null){
									return(
										<div className="row">
											<div className="col-md-12 margin-top-25">
												<div className="payment-detail">
											        <div className="payment-detail-heading">
											            <div className="col-md-8">
											            	<div className="col-md-1">
											            		
											            		<img className="payment-detail-image" height="40" width="40" src={(detail.pat_profile_img !== '' && detail.pat_profile_img !== configConstants.DEFAULT_IMAGE_PATH) ?detail.pat_profile_img : configConstants.DEFAULT_IMAGE_PATH} />
											            	</div>
											            	<div className="col-md-4">
											                	<h4>{detail.user_firstname} {detail.user_lastname}</h4>
											            	</div>
											            	<div className="col-md-3">
											                	<h4>{utilityHelper.getGender(detail.user_gender)}, {detail.pat_dob.result}</h4>
											            	</div>
											            	<div className="col-md-4">
											                	<h4>Reg. Number :- {detail.pat_code} </h4>
											            	</div>
											            </div>
											            <div className="col-md-4 text-right">
											                <div className="header-action">
											                    <a className="btn table-btn green" href="javascript:void(0);">Print</a>
											                </div>
											            </div>
											        </div>
											        <div className="payment-details-inner">
											            <div className="row">
											                <div className="col-md-2">
											                    <h4>Receipt Number</h4> 
											                    <div className="paymentData">{detail.reciept_number}</div>
											                </div>
											                <div className="col-md-2">
											                    <h4>Amount Paid</h4>
											                    <div className="paymentData">{ detail.amount}</div>
											                </div>
											                <div className="col-md-2">
											                    <h4>Invoices</h4>
											                    <div className="paymentData"><a href={process.env.BASENAME+'invoices'}>{detail.invoice_number ? detail.invoice_number : '-'}</a></div>
											                </div>
											                <div className="col-md-3">
											                   <h4>Payment Towards</h4>
											                   <div className="paymentData">{detail.checkup_type ? detail.checkup_type : '-'}</div>
											                </div>
											                <div className="col-md-2">
											                    <h4>Payment Mode</h4>
											                    <span className="paymentData">{detail.payment_mode ? detail.payment_mode : '-'}</span>
											                </div>
											            </div>
											        </div>
											    </div>
											</div>
										</div>
									)

								}
							}) : 
								<div>
									{ props.sendingRequest ? 
										<div className="showbox">
											<div className="loader">
												<svg className="circular" viewBox="25 25 50 50">
													<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
												</svg>
											</div>
										</div>
									:
										<div className="text-center"><h4>No invoice history record found.</h4></div>
									}
								</div>
							}


                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
