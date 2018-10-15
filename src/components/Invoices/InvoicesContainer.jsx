import React from "react";
import { Redirect } from 'react-router-dom';
import {invoicesActions} from './invoicesActions';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Loading } from '../../global';


const Invoices = Loadable({
    loader: () => import('./Invoices').then(object => object.Invoices),
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
class InvoicesContainer extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for fetch invoice list
    * @return                Nothing
    */

    componentDidMount(){
        const { dispatch } = this.props;
        var postData = {page:0}
        dispatch(invoicesActions.getInvoiceHistory(postData));
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for render HTML
    * @return                Nothing
    */
    render() {
    return(
      <Invoices 
        invoicesHistoryList = {this.props.invoicesHistory}
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
    const { sendingRequest, successMessage, errorMsg,invoicesHistory } = state.invoices;
    return {
        successMessage,
        errorMsg,
        sendingRequest,
        invoicesHistory
    };
}

// Connection with State 
const connectedInvoicesContainer = connect(mapStateToProps)(InvoicesContainer);
export { connectedInvoicesContainer as InvoicesContainer };
