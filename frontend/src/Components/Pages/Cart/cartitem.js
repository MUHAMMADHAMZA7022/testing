import React, { Fragment } from "react";
import "./Cart.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Cartitem = ({ item, deleteCartItems, key }) => {
  console.log(item.event)
  return (
    <Fragment>
        <div className="cart_holder " key={key}>
          <div className="cart_courses">
            <div className="cart_crs_img">
              <img src={item.image} alt="course-img" />
            </div>
            <div className="cart_crs">
              <div className="cart_crs_content">
                <h2 className="cart_crs_title redColor">{item.name}</h2>
                <span
                  className="cart_remove_btn"
                  onClick={() => deleteCartItems(item.event||item.course)}
                >
                  <DeleteForeverIcon />
                </span>
                <span className="cart_crs_price">
                  <span>Price: PKR</span>
                  {`${item.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default Cartitem;
