import React, { Fragment } from 'react'
import './CourseHistory.css';

import {Link} from 'react-router-dom';

function CourseHistory() {
    return (
        <Fragment>
            <div className='joined_courses'>
                <h2 className='heading'>Joined Courses</h2>
                <div className="course_card">
                    <div className="cr_img"></div>
                    <div className="crs_content">
                        <div className="crs_title">
                            <h2>Learn Biostatical Programming Masterclass</h2>
                        </div>
                        <div className="crs_desp">
                            <p>Lorem Ipsum dolor sit amet dolor sit Ipsum dit amet </p>
                        </div>
                        <div className="crs_action">
                            <Link className='btn_primary' to={'#'}>View Details</Link>
                            <Link className='btn_primary' to={'#'}>Schedule</Link>
                        </div>
                    </div>
                </div>
                <div className="course_card">
                    <div className="cr_img"></div>
                    <div className="crs_content">
                        <div className="crs_title">
                            <h2>Learn Biostatical Programming Masterclass</h2>
                        </div>
                        <div className="crs_desp">
                            <p>Lorem Ipsum dolor sit amet dolor sit Ipsum dit amet </p>
                        </div>
                        <div className="crs_action">
                            <Link className='btn_primary' to={'#'}>View Details</Link>
                            <Link className='btn_primary' to={'#'}>Schedule</Link>
                        </div>
                    </div>
                </div>
                <div className="course_card">
                    <div className="cr_img"></div>
                    <div className="crs_content">
                        <div className="crs_title">
                            <h2>Learn Biostatical Programming Masterclass</h2>
                        </div>
                        <div className="crs_desp">
                            <p>Lorem Ipsum dolor sit amet dolor sit Ipsum dit amet </p>
                        </div>
                        <div className="crs_action">
                            <Link className='btn_primary' to={'#'}>View Details</Link>
                            <Link className='btn_primary' to={'#'}>Schedule</Link>
                        </div>
                    </div>
                </div>
                <div className="course_card">
                    <div className="cr_img"></div>
                    <div className="crs_content">
                        <div className="crs_title">
                            <h2>Learn Biostatical Programming Masterclass</h2>
                        </div>
                        <div className="crs_desp">
                            <p>Lorem Ipsum dolor sit amet dolor sit Ipsum dit amet </p>
                        </div>
                        <div className="crs_action">
                            <Link className='btn_primary' to={'#'}>View Details</Link>
                            <Link className='btn_primary' to={'#'}>Schedule</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CourseHistory