/**
 * BookAppointmentsContainer
 *
 * @package                SafeHealth
 * @subpackage             BookAppointmentsContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in awards
 */
import React from "react";
import { connect } from 'react-redux';
import { BookAppointments } from "./BookAppointments";
import { doctorDetailActions } from './DoctorDetails/doctorDetailActions';
import { doctorReviewValidator } from './DoctorDetails/doctorDetailValidator';
import { ErrorPage } from './ErrorPage';
import { WebsiteFooter } from '../WebsiteHeader/WebsiteFooter';

class BookAppointmentsContainer extends React.Component {

    /**
     * @DateOfCreation        18 july 2018
     * @ShortDescription      Contructor is responsible to function declaration
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            doctorDetail: '',
            doctorClinic:'',
            review : this.initialState
        }
        this.onStarClick = this.onStarClick.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleResetState = this.handleResetState.bind(this);
        
    }

    get initialState(){
        return {
            rating : {
                user_id   :'',
                overall   : 0,
                wait_time : 0,
                manner    : 0,
                comment   : ''
            },
            validate : {
                comment:{
                    isValid: true,
                    message: ''
                }   
            }
        }
    }

    /**
     * @DateOfCreation        18 july 2018
     * @ShortDescription      This function is responsible to handle load doctor detail
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch } = this.props;
        var slug = this.props.match.params.doctorName;
       
        if(slug != '' && slug != undefined){
          dispatch(doctorDetailActions.doctorDetail(slug));
        }
    }

    /**
     * @DateOfCreation        18 july 2018
     * @ShortDescription      This function is responsible to handle set state of doctor with clinic detail
     * @return                Nothing
     */
    componentWillReceiveProps(nextProps){
        const { doctorDetail, doctorClinic,rating,review,validate }  = this.state;
        const { dispatch } = this.props;
        this.setState({
            review:{
                rating:{
                    ...rating,
                    user_id:nextProps.doctorDetail.user_id
                },
                validate:{
                    ...validate,
                        comment:{
                            isValid: true,
                            message: ''
                        } 
                }
            },
            doctorDetail: nextProps.doctorDetail,
            doctorClinic: nextProps.doctorClinic
        });

        if(nextProps.successMsg){
            if(nextProps.rating != ''){
                this.state.doctorDetail.doc_review.unshift(nextProps.rating);
            }
            setTimeout(function(){
                this.handleResetState();
            }.bind(this),1000);
        }
    }

    handleResetState(){
        const { dispatch } = this.props;
        dispatch(doctorDetailActions.resetState());
        this.setState({
            review:{
                rating : {
                    user_id   :'',
                    overall   : 0,
                    wait_time : 0,
                    manner    : 0,
                    comment   : ''
                },
                validate : {
                    comment:{
                        isValid: true,
                        message: ''
                    }   
                }
            }
        });
    }

    /**
     * @DateOfCreation        24 aug 2018
     * @ShortDescription      This function is responsible to handle set state of rating
     * @return                Nothing
     */
     onStarClick(name, value) {
        const {rating, validate} = this.state.review;
        if(name=='overall'){
            this.setState({
                review:{
                    rating: {
                         ...rating,
                        overall:value
                    },
                    validate:{
                        ...validate
                    }
                }    
            });
        }else if(name=='wait_time'){
            this.setState({
                review: {
                    rating: {
                         ...rating,
                        wait_time:value
                    },
                    validate:{
                        ...validate
                    }
                }
            });
        }else if(name=='manner'){
            this.setState({
                review:{
                    rating: {
                         ...rating,
                        manner:value
                    },
                    validate:{
                        ...validate
                    }
                }
            });   
        }
    }

    /**
     * @DateOfCreation        24 aug 2018
     * @ShortDescription      This function is responsible to handle set state of doctor rating
     * @return                Nothing
     */
    handleChange(event) {
        const { name, value } = event.target;
        const { rating,validate } = this.state.review;
        this.setState({
            review: {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                rating: {
                    ...rating,
                    [name]: value
                },
            }
        });
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to save award detail.
     * @return                Nothing
     */ 
    handleSave() {
        if(doctorReviewValidator.isReviewValid(this)) {
            const { rating } = this.state.review;
            const { dispatch } = this.props;
            dispatch(doctorDetailActions.ratingSave(rating));
        }
    }

    /**
     * @DateOfCreation        18 july 2018
     * @ShortDescription      pass all required detail for display doctor booking
     * @return                Nothing
     */
    render() {
        let bookAppointment;
        let slug = this.props.match.params.doctorName;
        if(slug != '' && slug!= undefined){
             bookAppointment = (<BookAppointments
                doctorDetail = {this.state.doctorDetail}
                doctorClinic = {this.state.doctorClinic}
                history      = {this.props.history}
                loginShow    = {this.props.loginShow}
                onStarClick  = {this.onStarClick}
                review       = {this.state.review}
                feedback     = {this.state.feedback}
                handleChange = {this.handleChange}
                handleSave   = {this.handleSave}
                successMsg   = {this.props.successMsg}
                errorMsg     = {this.props.errorMsg}
                sendingRequest={this.props.sendingRequest}
                />) 
        }else{
             bookAppointment = (<ErrorPage/>)
        }
        return(
            <div>
                {bookAppointment}
                <WebsiteFooter/>
            </div>

        );
    }
}

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {doctorDetail,doctorClinic,loginShow,successMsg,errorMsg,rating, sendingRequest} = state.doctorDetail;
    return {
       doctorDetail,
       doctorClinic,
       loginShow,
       successMsg,
       errorMsg,
       rating,
       sendingRequest
    };
}

const connectedBookAppointmentsContainer = connect(mapStateToProps)(BookAppointmentsContainer);
export { connectedBookAppointmentsContainer as BookAppointmentsContainer }; 


