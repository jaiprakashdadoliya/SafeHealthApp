import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faStar, faMapMarkerAlt, faCalendarAlt} from '@fortawesome/fontawesome-free-solid';

export const MoreFilters = (props) => {
    return (
    
                <div className="col-md-4 more-filter">
                    <div className="calendar-nav">
                        <div className="row">
                            <div className="col-md-8 col-sm-8">
                                <h3>
                                    More Filters
                                </h3>
                            </div>
                            <div className="col-md-4 col-sm-4 text-right">
                                <a href="javascript:void(0)" className="btn btn-default btn-xs" onClick={props.resetFilter}>
                                   <h4>Reset Filters</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={props.sendingRequest ? 'overlay-image' : ''}>
                        <div className="calendar-nav">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">
                                    <div className="doctor-profile-image">
                                        Availability
                                    </div>  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="doctor-profile-image">
                                         <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_availability" 
                                                type="radio" 
                                                value = "1"
                                                onChange={props.handleInputChange}
                                                checked={props.filters.filter_availability === "1"}   
                                            />
                                            <span>Any day</span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_availability" 
                                                type="radio"
                                                value = "2" 
                                                onChange={props.handleInputChange} 
                                                checked={props.filters.filter_availability === "2"}   
                                            />
                                            <span>Today</span>
                                        </label>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="calendar-nav">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">
                                    <div className="doctor-profile-image">
                                        Special hours
                                    </div>  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="doctor-profile-image">
                                        <label>
                                            <input 
                                                className="option-input checkbox" 
                                                name="filter_hours_before_10" 
                                                type="checkbox"
                                                value="1000"
                                                checked={props.filters.filter_hours_before_10 === "1000"}
                                                onChange ={props.handleInputChange} 
                                            />
                                            <span>Before 10:00 AM</span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input checkbox" 
                                                name="filter_hours_after_05" 
                                                type="checkbox"
                                                value="1700"
                                                checked={props.filters.filter_hours_after_05 === "1700"}
                                                onChange ={props.handleInputChange} 
                                            />
                                            <span>After 5:00 PM</span>
                                        </label>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="calendar-nav">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">
                                    <div className="doctor-profile-image">
                                        Doctors gender
                                    </div>  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="doctor-profile-image">
                                         <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_gender" 
                                                type="radio" 
                                                value = "4"
                                                onChange ={props.handleInputChange} 
                                                checked={props.filters.filter_gender === "4"}
                                            />
                                            <span>Any gender</span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_gender" 
                                                type="radio"
                                                value="2"
                                                onChange ={props.handleInputChange}
                                                checked={props.filters.filter_gender === "2"} 
                                            />
                                            <span>Female</span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_gender" 
                                                type="radio"
                                                value="1"
                                                onChange ={props.handleInputChange}
                                                checked={props.filters.filter_gender === "1"} 
                                            />
                                            <span>Male</span>
                                        </label>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="calendar-nav">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">
                                    <div className="doctor-profile-image">
                                        Doctors Consulting Charges
                                    </div>  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="doctor-profile-image">
                                         <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_consulting_fee" 
                                                type="radio" 
                                                value = "1"
                                                onChange ={props.handleInputChange} 
                                                checked={props.filters.filter_consulting_fee === "1"} 
                                            />
                                            <span> Less than 100 </span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_consulting_fee" 
                                                type="radio"
                                                value="2"
                                                onChange ={props.handleInputChange}
                                                checked={props.filters.filter_consulting_fee === "2"} 

                                            />
                                            <span> 100 - 500 </span>
                                        </label>
                                        <label>
                                            <input 
                                                className="option-input radio" 
                                                name="filter_consulting_fee" 
                                                type="radio"
                                                value="3"
                                                onChange ={props.handleInputChange} 
                                                checked={props.filters.filter_consulting_fee === "3"} 

                                            />
                                            <span> Greater than 500 </span>
                                        </label>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        {props.filters.detected_lat != '' && 
                            <div className="calendar-nav">
                                <div className="row">
                                    <div className="col-md-8 col-sm-8">
                                        <div className="doctor-profile-image">
                                            Distance
                                        </div>  
                                    </div>
                                </div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="doctor-profile-image">
                                                 <label>
                                                    <input 
                                                        className="option-input radio" 
                                                        name="filter_distance" 
                                                        type="radio" 
                                                        value = "2"
                                                        onChange ={props.handleInputChange}
                                                        checked={props.filters.filter_distance === "2"} 

                                                    />
                                                    <span> Within 2 KM </span>
                                                </label>
                                                <label>
                                                    <input 
                                                        className="option-input radio" 
                                                        name="filter_distance" 
                                                        type="radio"
                                                        value="5"
                                                        onChange ={props.handleInputChange}
                                                        checked={props.filters.filter_distance === "5"} 

                                                    />
                                                    <span> Within 5 KM </span>
                                                </label>
                                                <label>
                                                    <input 
                                                        className="option-input radio" 
                                                        name="filter_distance" 
                                                        type="radio"
                                                        value="100"
                                                        onChange ={props.handleInputChange} 
                                                        checked={props.filters.filter_distance === "100"} 

                                                    />
                                                    <span> More than 5 KM </span>
                                                </label>
                                            </div>  
                                        </div>
                                    </div>
                            </div>
                        }
             
                    </div>
                </div>
                
    );
}
