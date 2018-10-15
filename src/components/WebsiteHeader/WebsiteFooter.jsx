import React from "react";
import { Link } from 'react-router-dom';

export const WebsiteFooter = (props) => {
        return (
            <div className="footer">
            <div className="container">
                <div className="col-md-3">
                    <h4>RxHealth</h4>
                    <ul>
                        <li><a href="">About</a></li>
                        <li><a href="">Blog</a></li>
                        <li><a href="">Terms & Conditions</a></li>
                        <li><a href="">Contact Us</a></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h4>Patients</h4>
                    <ul>
                        <li><a href="">Ask free health questions</a></li>
                        <li><a href="">Search for doctors</a></li>
                        <li><a href="">Search for clinics</a></li>
                        <li><a href="">Search for hospitals</a></li>
                        <li><a href="">Search for diagnostics</a></li>
                        <li><a href="">Read health articles</a></li>

                    </ul>
                </div>
                <div className="col-md-3">
                    <h4>Doctors</h4>
                    <ul>
                        <li><a href="">Links</a></li>
                        <li><a href="">Links</a></li>
                        <li><a href="">Links</a></li>
                        <li><a href="">Links</a></li>
                        <li><a href="">Links</a></li>
                        <li><a href="">Links</a></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h4>Social</h4>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Twitter</a></li>
                        <li><a href="">LinkedIn</a></li>
                        <li><a href="">Youtube</a></li>
                        <li><a href="">GitHub</a></li>
                    </ul>
                </div>
            </div>
        </div>);
}