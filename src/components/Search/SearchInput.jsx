import React from "react";
import { Link } from 'react-router-dom';
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faStar, faMapMarkerAlt, faCalendarAlt, faSearch, faBuilding, faLocationArrow} from '@fortawesome/fontawesome-free-solid';
import { searchConstants } from './searchConstants';
import { configConstants } from '../../_constants';

export const SearchInput = (props) => {
  return(
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
                                                <li key={result.city_id} onClick={props.handleSuggestionClick.bind(null, result.city_id, result.city_name)}><FontAwesomeIcon icon={faSearch} /> {result.city_name} <span>City</span></li>
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
                                    <li key={result.spl_id} 
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
                                    <li key={result} 
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
);
}