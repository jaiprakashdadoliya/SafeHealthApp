import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../../global';
import { utilityHelper } from '../../../../_helpers';
import { configConstants, dataConstants } from '../../../../_constants';
import { patientSymptomsActions } from '../../../../_actions';

const PreviousPrescription = Loadable({
    loader: () => import('./PreviousPrescription' /* webpackChunkName = "PreviousPrescription" */).then(object => object.PreviousPrescription),
    loading: Loading
});

class PreviousPrescriptionContainer extends React.Component {
	constructor(props){
		super(props);
	}

    render() {
        return (
            <PreviousPrescription 
                patId = {this.props.patId}
            />
        );            
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    return {
        user_type:state.session.user.user_type
    };
}

const connectedPreviousPrescriptionContainer = connect(mapStateToProps)(PreviousPrescriptionContainer);
export { connectedPreviousPrescriptionContainer as PreviousPrescriptionContainer };