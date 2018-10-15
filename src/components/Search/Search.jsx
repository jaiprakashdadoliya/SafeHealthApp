import React from "react";
import { Link } from 'react-router-dom';
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faStar, faMapMarkerAlt, faCalendarAlt, faSearch, faBuilding, faLocationArrow} from '@fortawesome/fontawesome-free-solid';
import { searchConstants } from './searchConstants';
import { WebsiteFooter } from '../WebsiteHeader/WebsiteFooter';
import { configConstants } from '../../_constants';
export const Search = (props) => {
  return(
    <div className="page-container front-page">
        <div className="wrap-inner-content">
          <div className="search-doctor">
          <div className="container">
            <h1>Find & book a Doctor <br/>and get an appointment right now</h1>
              <div className="col-md-5 col-sm-5">
              <div className="serach-filter">
              <div className="location-btn" onClick={props.getLocation}>
                    <FontAwesomeIcon icon={faLocationArrow} />
                    <span className="location-detect">Detect</span>
                    </div>
                  <div className="input-with-icon">
                  <span className="search-icon"><FontAwesomeIcon icon={faBuilding} /></span>
                    <input 
                        className="form-control" 
                        placeholder="City name"
                        name = "city_name"
                        value = {props.payload.city_name}
                        onChange={props.handleInputChange}
                        onClick={props.handleCitySearchClick}
                    />
                    {props.payload.citiesLoading && props.cityResult.length > 0 &&
                            <div className="dropdown-list cities">
                                  <ul>
                                    {props.cityResult.map(
                                    (result, index) => {
                                        return (
                                            <li key={index} onClick={props.handleSuggestionClick.bind(null, result.city_id, result.city_name)}><FontAwesomeIcon icon={faSearch} /> {result.city_name} <span>City</span></li>
                                        );
                                        })
                                    }
                                  </ul>
                            </div>
                            }
                        </div>
                </div>
                </div>
            <div className="col-md-5 col-sm-5">
                <div className="input-with-icon">
              <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
                <input 
                    className="form-control" 
                    placeholder="Speciality, Doctors, Clinics"
                    name = "search"
                    value={props.payload.search}
                    onChange={props.handleInputChange}
                 />
                {props.payload.specialityLoading &&
                    <div className="dropdown-list speciality">
                       <ul>
                       {props.specialityResult.length > 0  &&
                            <li className="heading"> 
                                Specialities
                            </li>
                        }
                        {props.specialityResult.length > 0 && props.specialityResult.map(
                        (result,index) => {
                            let speciality;
                            speciality = (
                                <li key={index} 
                                        onClick={props.handleSpecialityClick.bind(null, result, searchConstants.SPECIALISATION)}>
                                        <FontAwesomeIcon icon={faSearch} /> 
                                        {result.spl_name} <span>{searchConstants.SPECIALISATION}</span>
                                </li>
                            )
                            return (
                                <span>
                                    {speciality}
                                </span>
                            );
                            })
                        }
                        {props.tagResult.length > 0 && props.tagResult.map(
                        (result,index) => {
                            let tags;
                            tags = (
                                <li key={index} 
                                        onClick={props.handleSpecialityClick.bind(null,result,searchConstants.COMMON_NAME)}>
                                        <FontAwesomeIcon icon={faSearch} /> 
                                        {result.specailisation_tag} <span>{searchConstants.COMMON_NAME}</span>
                                </li>
                            )
                            return (
                                <span>
                                    {tags}
                                </span>
                            );
                            })
                        }
                        {props.servicesResult.length > 0 && props.servicesResult.map(
                        (result,index) => {
                            let tags;
                            tags = (
                                <li key={index} 
                                        onClick={props.handleSpecialityClick.bind(null,result,searchConstants.SERVICES)}>
                                        <FontAwesomeIcon icon={faSearch} /> 
                                        {result.srv_name} <span>{searchConstants.SERVICES}</span>
                                </li>
                            )
                            return (
                                <span>
                                    {tags}
                                </span>
                            );
                            })
                        }
                        {props.doctorsResult.length > 0  &&
                            <li className="heading"> 
                                Doctors
                            </li>
                        }
                        {props.doctorsResult.length > 0 && props.doctorsResult.map(
                            (result, index) => {
                                let doctors;
                                doctors = (
                                    <li key={index} 
                                            onClick={props.handleSpecialityClick.bind(null, result, searchConstants.DOCTOR)}>
                                            <FontAwesomeIcon icon={faSearch} /> 
                                            {configConstants.DOCTOR_TITLE} {result.user_firstname} {result.user_lastname}<span>{searchConstants.DOCTOR}</span><div className="searchSplText">{result.doc_spec_detail.doc_special}</div>
                                    </li>
                                )
                                return (
                                    <span>
                                        {doctors}
                                    </span>
                                );
                                })
                        }
                        {props.clinicResult.length > 0  &&
                            <li className="heading"> 
                                Clinics
                            </li>
                        }
                        {props.clinicResult.length > 0 && props.clinicResult.map(
                        (result, index) => {
                            let clinics;
                            clinics = (
                                <li key={index} 
                                        onClick={props.handleSpecialityClick.bind(null,result,searchConstants.CLINIC)}>
                                        <FontAwesomeIcon icon={faSearch} /> 
                                        {result.clinic_name} <span>{searchConstants.CLINIC}</span>
                                </li>
                            )
                            return (
                                <span>
                                    {clinics}
                                </span>
                            );
                            })
                        }
                        </ul>
                    </div>
                }
                </div>
            </div>
        </div>
        </div>
        
        <div className="about-text">
            <div className="container">
            <h2>About RxHealth</h2>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            </div>
        </div>
        <div className="whyus">
            <div className="container">
            <h2>Why use RxHealth</h2>
            <div className="details-wrap">
                <div className="col-md-3">
                    <div className="icon">
                        <img src={require('../../assets/images/doctor.png')} />
                    </div>
                    <h3>1000+ verified doctors</h3>
                    <p>All doctors on RxHealth go through a stringent verification process</p>
                </div>
                <div className="col-md-3">
                    <div className="icon">
                        <img src={require('../../assets/images/24x7.png')} />
                    </div>
                    <h3>24x7 access to healthcare</h3>
                    <p>Easy to access the best doctors anytime anywhere</p>
                </div>
                <div className="col-md-3">
                    <div className="icon">
                        <img src={require('../../assets/images/time-money.png')}/>
                    </div>
                    <h3>Save time and money</h3>
                    <p>Save time and money Save up to 90% on time and money spent on consultation</p>
                </div>
                <div className="col-md-3">
                    <div className="icon">
                        <img src={require('../../assets/images/guarantee.png')}/>
                    </div>
                    <h3>100% care guaranteed</h3>
                    <p>We'll refund your money if you're not satisfied with our services </p>
                </div>
                </div>
            </div>
        </div>
        <div className="download-app">
            <div className="container">
                <div className="col-md-6">
                    <img src={require('../../assets/images/mobile-app.png')} />
                </div>
                <div className="col-md-6">
                <div className="app-details">
                    <h2>Get the RxHealth app.</h2>
                    <ul>
                        <li>Find nearby doctors in your network</li>
                        <li>Browse doctor reviews by real patients</li>
                        <li>Book doctor appointments with a tap</li>
                    </ul>
                    <div className="sendlink">
                        <p>Provide your mobile number below and we'll send you a text with a link to download RxHealth App</p>
                        <div className="col-md-6 rp"><input className="form-control" type="text" /></div>
                        <div className="col-md-6"><input type="submit" className="btn text-btn green" value="submit"/></div>
                    </div>
                    <div className="download-btns">
                        <img src={require('../../assets/images/google-play-badge.png')} />&nbsp;&nbsp;
                        <img src={require('../../assets/images/app-store.png')} />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="app-features">
        <div className="container">
            <div className="col-md-6 col-sm-6">
            <div className="list">
                <ul>
                    <li>
                    <img src={require('../../assets/images/medical-history.png')} /> 
                    <span>
                        <h4>Patients visit history</h4>
                        <p>The patient can check easily their visits history here.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/appointment.png')} /> 
                    <span>
                        <h4>Appointment </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/clinic.png')} /> 
                    <span>
                        <h4>Multiple clinics </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/staff.png')} /> 
                    <span>
                        <h4>Staff </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/profile.png')} /> 
                    <span>
                        <h4>Manage profile </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/reporte.png')} /> 
                    <span>
                        <h4>Patient reports </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                    <li>
                    <img src={require('../../assets/images/secure.png')} /> 
                    <span>
                        <h4>Secure connections </h4>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </span>
                    </li>
                </ul>
            </div>
            </div>
            <div className="col-md-6 col-sm-6 text-right">
               <img src={require('../../assets/images/list-mobile-app.png')} /> 
            </div>
        </div>
      </div>
        <div className="make-appointment">
            <div className="container">
                <div className="col-md-8 col-sm-8">
                    <p>If you are a patient seeking quality healthcare at affordable prices.</p>
                </div>
                <div className="col-md-4 col-sm-4 text-right">
                    <button className="text-btn btn white">Make an appointment</button>
                </div>
            </div>
        </div>
        <WebsiteFooter/>
    </div>
    </div>
  );
}
