import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

import bg3 from '../../../images/slide-img-1.jpg';
import './ViewOrder.css'

function ViewOrder() {
    return (
        <Fragment>
            <div className='viewOrders'>
                <h1>check Your Orders</h1>
                <div className="cart_holder">
                    <div className="cart_courses">
                        <div className="cart_crs_img">
                            <img src={bg3} alt="cartitem-img" />
                        </div>
                        <div className="cart_crs">
                            <div className="cart_crs_content">
                                <h2 className="cart_crs_title redColor">Cart item title</h2>
                                <span className="cart_crs_price">
                                    <span>Price: PKR</span>
                                    65645
                                </span>
                                <Link to={"#"} className='status_link'>View Status</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewOrder