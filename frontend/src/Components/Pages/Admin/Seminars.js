import React, { Fragment } from 'react'
import "./Dashboard.css";
import Sidebar from './Sidebar';

function Seminars() {
    return (
        <Fragment>
            <div className='dashboard_holder seminars'>
                {/* Sidebar */}
                <div className='dSidebar'>
                    <Sidebar />
                </div>
                {/* Main Content */}
                <div className='dashboard_content'>
                    This is Seminars.
                </div>
            </div>
        </Fragment>
    )
}

export default Seminars