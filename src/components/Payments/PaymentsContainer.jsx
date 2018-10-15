import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {paymentsActions} from './paymentsActions';
import Loadable from 'react-loadable';
import { Loading } from '../../global';
import { configConstants } from '../../_constants';



const Payments = Loadable({
    loader: () => import('./Payments').then(object => object.Payments),
    loading: Loading
});
/**
 * PatientGroups
 *
 * @package                SafeHealth
 * @subpackage             PatientGroups
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for PatientGroups
 */
class PaymentsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            paymentsHistory:[]
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.pageNavigation = this.pageNavigation.bind(this);
    }
  
    /**
     * @DateOfCreation        03 Sept 2018
     * @ShortDescription      This function is responsible to payments history Notes from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        var page = configConstants.PAGE_NUMBER;
        var pageSize = configConstants.PAGE_SIZE;
        let postData = {'page':configConstants.PAGE_NUMBER,'pageSize':configConstants.PAGE_SIZE};

        
        setTimeout(function () {
          dispatch(paymentsActions.getPaymentHistory(postData));
        }.bind(this), 500);
    }

    /**
     * @DateOfCreation        03 Sept 2018
     * @ShortDescription      This function is responsible to payments history Notes from API
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.isPaymentHistoryFetched && newProps.paymentsHistory){
            this.setState({
                paymentsHistory:newProps.paymentsHistory
            })
        }
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handlePaginationClick(pageNo){
        const { dispatch } = this.props;
        let postData = {'page':pageNo,'pageSize':configConstants.PAGE_SIZE};
        dispatch(paymentsActions.getPaymentHistory(postData));
    }


    pageNavigation(currentPage,direction,totalPage){
      if(direction == configConstants.PREVIOUS_SLOT && currentPage >= 1){
        this.handlePaginationClick(currentPage-1);
      }else{
        this.setState({
          buttonDisable: true
        })
      }

      if(direction == configConstants.NEXT_SLOT  && currentPage < totalPage){
        this.handlePaginationClick(currentPage+1);
      }else{
        this.setState({
          buttonDisable: true
        })
      }
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for render HTML
    * @return                Nothing
    */
    render() {
    return(
        <Payments 
            paymentsHistory={this.state.paymentsHistory}
            pages                    = {this.props.pages}
            page                     = {this.props.page}
            handlePaginationClick    = {this.handlePaginationClick}
            pageSize                 = {configConstants.PAGE_SIZE}
            pageNavigation           = {this.pageNavigation}
            buttonDisable            = {this.state.buttonDisable}
        />
    );
  }
}

/**
 * @DateOfCreation        3 Sept 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { sendingRequest, successMessage, errorMsg, paymentsHistory, isPaymentHistoryFetched, pages, page } = state.payments;
    return {
        successMessage,
        errorMsg,
        sendingRequest,
        paymentsHistory,
        isPaymentHistoryFetched,
        pages,
        page
    };
}

// Connection with State 
const connectedPaymentsContainer = connect(mapStateToProps)(PaymentsContainer);
export { connectedPaymentsContainer as PaymentsContainer };
