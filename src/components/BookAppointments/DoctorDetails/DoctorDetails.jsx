import React from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab} from 'react-bootstrap';
import { Alert, bsStyle } from 'react-bootstrap';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faStar } from '@fortawesome/fontawesome-free-solid';
import { configConstants } from '../../../_constants';
import StarRatingComponent from 'react-star-rating-component';
import { utilityHelper } from '../../../_helpers';
export const DoctorDetails = (props) => {
   const userInfo = utilityHelper.getUserInfo();
  const currentUserType = userInfo!=undefined ? userInfo.user_type : '';

  var overallAvg = 0;
  var waitTimeAvg = 0;
  var badMannerAvg = 0;
  if(typeof props.doctorDetail.doc_rating == 'object'){
   overallAvg = props.doctorDetail.doc_rating.overall;
   waitTimeAvg = props.doctorDetail.doc_rating.wait_time;
   badMannerAvg = props.doctorDetail.doc_rating.manner;
  }
  return(
    <div className="col-md-8">
      <div className="doctor-details">
        <div className="doctor-profile-image text-center">
           {!props.doctorDetail ? <img src={configConstants.PROFILE_LOAING} />
              : <img src={(props.doctorDetail.doc_profile_img !== '' && props.doctorDetail.doc_profile_img !== configConstants.DEFAULT_IMAGE_PATH) ? configConstants.PROFILE_BASE_PATH+props.doctorDetail.doc_profile_img : configConstants.DEFAULT_IMAGE_PATH} />
            }
        </div>
        <div className="doctor-name text-center">
          Dr. {props.doctorDetail.user_firstname} {props.doctorDetail.user_lastname}
        </div>
        <div className="doctor-specialties text-center">
          {props.doctorDetail.doc_deg_name}</div>
          <div className="doctor-specialties-des inner text-center">
          {props.doctorDetail.doc_spac_string}, {props.doctorDetail.doc_experience} Years Experience
        </div>
        <div className="doctor-ratings">
          <div className='rating-stars text-center'>
            <StarRatingComponent 
              name="average" 
              starCount={5}
              value={parseInt(overallAvg)}
              editing={false}
            />
           <a href="#">{props.doctorDetail.doc_review_count} review</a>
          </div>
        </div>
      </div>
        <Tabs defaultActiveKey={1} id="doctor-details">
          <Tab eventKey={1} title="Overview">
          <div className="sections">
            <h3>Professional statement</h3>
            <p>{props.doctorDetail.doc_short_info}</p>
          </div>
          <div className="row">
          <div className="col-md-3">
          <div className="sections">
            <h3>Specialties</h3>
            { props.doctorDetail.doc_specialisations ? props.doctorDetail.doc_specialisations.map(
                (spacilisation, index) => {
                    return (
                      <p key = {index} >{spacilisation}</p>
                    )
                }) : <p>No record found.</p>
            }
          </div>
          </div>
          <div className="col-md-3">
          <div className="sections">
            <h3>Awards</h3>
            { props.doctorDetail.doc_award ? props.doctorDetail.doc_award.map(
                (award, index) => {
                    return (
                      <p key = {index} >{award}</p>
                    )
                }) : <p>No record found.</p>
            }
          </div>
          </div>
          <div className="col-md-3">
          <div className="sections">
            <h3>Education</h3>
            { props.doctorDetail.doc_deg ? props.doctorDetail.doc_deg.map(
                (degree, index) => {
                    return (
                      <p key = {index} >{degree}</p>
                    )
                }) : <p>No record found.</p>
            }
          </div>
          </div>
          <div className="col-md-3">
          <div className="sections">
            <h3>Membership</h3>
            { props.doctorDetail.doc_membership ? props.doctorDetail.doc_membership.map(
                (membership, index) => {
                    return (
                      <p key = {index} >{membership}</p>
                    )
                }) : <p>No record found.</p>
            }
          </div>
          </div>
          </div>
          <div className="sections gallery">
            <h3>Gallery</h3>
            <div className="row">
              { props.doctorDetail.doc_media ? props.doctorDetail.doc_media.map(
                (media, index) => {
                    return (
                      <div className="col-md-2 doctor-profile-image" key={index}>
                         <img src={configConstants.MEDIA_BASE_PATH+'1/'+media} className="media-thumbnail"/>
                      </div>
                    )
                }) : <p>No record found.</p>
            }
            </div>
          </div>
          </Tab>
          <Tab eventKey={2} title="Service">
            <div className="col-md-3">
              <div className="sections">
                <h3>Services</h3>
                { props.doctorDetail.doc_service ? props.doctorDetail.doc_service.map(
                    (service, index) => {
                        return (
                          <p key = {index} >{service}</p>
                        )
                    }) : <p>No record found.</p>
                }
              </div>
              </div>
          </Tab>
          <Tab eventKey={3} title="Feedback">
          <div className="sections">
            <h3>Patient reviews</h3>
            <p>All reviews have been submitted by patients after seeing the provider. For more information, check out our Patient Knowledge Base.</p>
          </div>
          <div className="ratings-outer">
          <div className="ratings">
          
          <div className="c100 p25 green">
              <span>
                <StarRatingComponent 
                name="overall" 
                starCount={5}
                value={parseInt(overallAvg)}
                editing={false}
                />
              </span>
          <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
          </div>
          </div>
          <div className="rating-name">
          Overall
          </div>
          </div>


          <div className="ratings">
          <div className="c100 p25 green">
          <span> 
            <StarRatingComponent 
            name="wait_time" 
            starCount={5}
            value={parseInt(waitTimeAvg)}
            editing={false}
            />
          </span>
          <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
          </div>
          </div>
          <div className="rating-name">
          Wait time
          </div>
          </div>


          <div className="ratings">
          <div className="c100 p25 green">
          <span>
            <StarRatingComponent 
            name="manner" 
            starCount={5}
            value={parseInt(badMannerAvg)}
            editing={false}
            />
          </span>
          <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
          </div>
          </div>
          <div className="rating-name">
          Bedside manner
          </div>
          </div>
          </div>

          <div className="patient-reviews-outer">
           {currentUserType!='' && currentUserType == configConstants.USER_TYPE_PATIENT &&
            <div className="row">
            <div className="col-md-3">
                <div className="col-md-12 rating-font">
                  <span>Overall</span><br/>
                  <StarRatingComponent 
                    name="overall" 
                    starCount={5}
                    value={props.review.rating.overall}
                    emptyStarColor='#ccc'
                    onStarClick={props.onStarClick.bind(this, "overall")}
                  />
                </div>
                <div className="col-md-12 rating-font">
                  <span>Waiting Time</span><br/>
                  <StarRatingComponent 
                    name="wait_time" 
                    starCount={5}
                    value={props.review.rating.wait_time}
                    emptyStarColor='#ccc'
                    onStarClick={props.onStarClick.bind(this,"wait_time")}

                  />
                </div>
                <div className="col-md-12 rating-font">
                  <span>Bed Manner</span><br/>
                  <StarRatingComponent 
                    name="manner" 
                    starCount={5}
                    value={props.review.rating.manner}
                    emptyStarColor='#ccc'
                    onStarClick={props.onStarClick.bind(this, "manner")}
                  />
                </div>
                </div>
                <div className="col-md-9 feedback-form">
                { props.successMsg &&
                    <Alert bsStyle="success">
                        { props.successMsg }
                    </Alert>
                }
                { props.errorMsg &&
                    <Alert bsStyle="danger">
                        { props.errorMsg }
                    </Alert>
                }
               
                <div className="col-md-12">
                <div className={ props.review.validate.comment.isValid ? 'form-group' : 'form-group has-error' }>
                  <textarea className="form-control" rows={5} value={props.review.rating.comment}  name="comment" onChange={ props.handleChange } maxLength="400"></textarea>
                  <label className="control-label">Review</label>
                  <span className="help-block">{ props.review.validate.comment.message }</span>
                </div>
                <div className="text-right">
                  <button className="btn green text-btn" disabled={props.sendingRequest ? true : false} onClick={props.handleSave}>Submit</button>
                </div>
              </div>

              </div>
            </div>
            }
             <div className="sections">
            <h3>Patient reviews</h3>
            <p>All reviews have been submitted by patients after seeing the provider. For more information, check out our Patient Knowledge Base.</p>
          </div>
            {props.doctorDetail.doc_review ? props.doctorDetail.doc_review.map((review,index)=>{
              return (<div className="patient-reviews" key={index}>
                <div className="user-firs-letter default-color">
                 V
                </div>
                <div className="review-wrap">
                  <div className="row">
                    <div className="col-md-6">
                      <h4>{review.user_firstname} {review.user_lastname}</h4>
                    </div>
                    <div className="post-date text-right">{review.created_at}</div>
                  </div>
                  <p>{review.comment}</p>
                  <div className="review-details">
                    <div className="review-type">
                      Overall
                    </div>
                    <div className="review-star">
                     <StarRatingComponent 
                      name="overall" 
                      starCount={5}
                      value={review.overall}
                      emptyStarColor='#ccc'
                      editing={false}
                    />
                    </div>
                  </div>
                  <div className="review-details">
                    <div className="review-type">
                      Wait time
                    </div>
                    <div className="review-star">
                      <StarRatingComponent 
                      name="wait_time" 
                      starCount={5}
                      value={review.wait_time}
                      emptyStarColor='#ccc'
                      editing={false}
                    />
                    </div>
                  </div>
                  <div className="review-details">
                    <div className="review-type">
                      Bedside manner
                    </div>
                    <div className="review-star">
                    <StarRatingComponent 
                      name="mannar" 
                      starCount={5}
                      value={review.manner}
                      emptyStarColor='#ccc'
                      editing={false}
                    />
                    </div>
                  </div>
                </div>
              </div>)
            }) : (<div className="sections"><h3>No review found</h3></div>)
            }
         
          </div>
          </Tab>
        </Tabs>
    </div>
  );
}
