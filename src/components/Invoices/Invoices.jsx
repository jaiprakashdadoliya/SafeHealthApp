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
/**
 * Invoices
 *
 * @package                RxHealth
 * @subpackage             Invoices
 * @category               presentational Component
 * @DateOfCreation         04 Sep 2018
 * @ShortDescription       This component is reponsible for invoices
 */
export const Invoices = (props) => {
	return (
     <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Invoices History</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <button  className="btn green text-btn">Add</button>
                                </div>
                            </div>
                            {props.invoicesHistoryList.length > 0 ? props.invoicesHistoryList.map((invoicesHistory,index)=>{
	                            	return (
			                            <div className="row" key={index}>
			                                <div className="col-md-12 margin-top-25">
			                               		<div className="payment-detail">
										            <div className="payment-detail-heading">
										                <div className="col-md-8">
										                	<div className="col-md-1">
										                		<img className="payment-detail-image" src={(invoicesHistory.pat_profile_img !== '' && invoicesHistory.pat_profile_img !== configConstants.DEFAULT_IMAGE_PATH) ? invoicesHistory.pat_profile_img : configConstants.DEFAULT_IMAGE_PATH} height="40" width="40"/>
										                	</div>
										                	<div className="col-md-3">
										                    	<h4>{invoicesHistory.pat_name} </h4>
										                	</div>
										                	<div className="col-md-2">
										                    	<h4>{utilityHelper.getGenders(invoicesHistory.user_gender)}, {invoicesHistory.pat_dob.result}</h4>
										                	</div>
										                	<div className="col-md-4">
										                    	<h4>Reg. Number :- {invoicesHistory.pat_code} </h4>
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
										                        <h4>Invoices Number</h4> 
										                        <div className="paymentData">{invoicesHistory.invoice_number}</div>
										                        <hr/>
										                        <div className="row">
										                        	<div className="col-md-6">Total<br/> {invoicesHistory.total_amt}</div>
										                        	<div className="col-md-6">Paid <br/> {invoicesHistory.total_amt}</div>
										                        </div>
										                    </div>
										                    <div className="col-md-2">
										                        <h4>Treatments</h4>
										                        <div className="paymentData">{invoicesHistory.checkup_type} 
										                        	<br/>Completed By Dr. {invoicesHistory.doc_name}</div>
										                    </div>
										                    <div className="col-md-2">
										                        <h4>Cost</h4>
										                        <div className="paymentData">{invoicesHistory.doc_consult_fee}</div>
										                    </div>
										                    <div className="col-md-2">
										                       <h4>Discount</h4>
										                       <div className="paymentData">50.00</div>
										                    </div>
										                    <div className="col-md-2">
										                        <h4>Tax</h4>
										                        <span className="paymentData">0.00</span>
										                    </div>
										                    <div className="col-md-2">
										                        <h4>Total</h4>
										                        <span className="paymentData">{invoicesHistory.total_amt}</span>
										                    </div>
										                </div>
										            </div>
										        </div>
										    </div>
			                            </div>
	                            	)
                            	}) : <div className="text-center"><h4>No invoice history record found.</h4></div>
                        	}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
