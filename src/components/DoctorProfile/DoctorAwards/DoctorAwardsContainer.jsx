/**
 * DoctorAwardsContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorAwardsContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in awards
 */
import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { DoctorAwards } from "./DoctorAwards";
import { DoctorAwardsAdd } from "./DoctorAwardsAdd";
import { doctorAwardsActions } from '../../../_actions';

class DoctorAwardsContainer extends React.Component {

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      Contructor is responsible to function declaration
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);

        this.awardAddShowHandle = this.awardAddShowHandle.bind(this);
        this.awardAddHideHandle = this.awardAddHideHandle.bind(this);
        this.awardDeleteHandle = this.awardDeleteHandle.bind(this);
        this.getawardsList = this.getawardsList.bind(this);
        this.awardSearch = this.awardSearch.bind(this);
        this.state = this.initialState;
    }


    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle close add/edit awards modal
     * @return                Nothing
     */
    awardAddHideHandle() {
        this.setState({ awardAddShow: false });
    }

    get initialState() {
        return {
            awardDetail : {
                'doc_award_id'   : '',
                'doc_award_name' : '',
                'doc_award_year' : ''
            },
            filtered: [],
            filterAll: '',
        }
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle open add awards modal
     * @return                Nothing
     */
    awardAddShowHandle(awardEditDetail) {
        this.setState({ awardAddShow: true });
        if(awardEditDetail.doc_award_id != null) {
            this.setState({
                awardDetail : {
                    'doc_award_id'   : String(awardEditDetail.doc_award_id),
                    'doc_award_name' : String(awardEditDetail.doc_award_name),
                    'doc_award_year' : String(awardEditDetail.doc_award_year)
                },
                closeForm : false,
            });
        }else{
            this.setState(this.initialState);
        }
    }
    /**
     * @DateOfCreation          24 May 2018
     * @ShortDescription        This function is responsible to handle delete award request
     * @param int awardId       award id of perticular doctor
     * @return                  Nothing
     */
    awardDeleteHandle(awardId) {
        confirmAlert({
            title   : 'Award delete',
            message : 'Are you sure you want to delete this award?',
            buttons : [
                {
                    label: 'Yes',
                    onClick: () => {
                        const { dispatch } = this.props;
                        dispatch(doctorAwardsActions.awardDelete(awardId, this.props.awards));
                        this.setState(this.initialState);
                    }
                },
                {
                    label   : 'No',
                    onClick : () => { return false; }
                }
            ]
        })
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle load awards list
     * @return                Nothing
     */

    getawardsList(page, pageSize, sorted, filtered){
        const { dispatch } = this.props;
        dispatch(doctorAwardsActions.awardsList(page, pageSize, sorted, filtered));
    }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered award list
   * @return                Nothing
   */
      awardSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
      }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      pass all required detail for display doctor awards list
     * @return                Nothing
     */
    render() {
        return(
            <div>
                <DoctorAwards 
                    awardAddShowHandle = { this.awardAddShowHandle }
                    awardAddHideHandle = { this.awardAddHideHandle }
                    awardDetail        = { this.state.awardDetail }
                    awardAddShow       = { this.state.awardAddShow }
                    awardDeleteHandle  = { this.awardDeleteHandle }
                    awards             = { this.props.awards }
                    loaderMessage      = { this.props.loader }
                    getawardsList      = { this.getawardsList}
                    pages              = { this.props.pages}
                    filterAll          = { this.state.filterAll}
                    filtered           = { this.state.filtered}
                    awardSearch        = { this.awardSearch}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {pages, awards, loader } = state.doctorAwards;
    return {
        pages,
        awards,
        loader
    };
}

const connectedDoctorAwardsContainer = connect(mapStateToProps)(DoctorAwardsContainer);
export { connectedDoctorAwardsContainer as DoctorAwardsContainer }; 


