import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../redux/action/orderaction";
// import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from '@mui/material';
import MetaData from "../../Layout/Metadata";
import LaunchIcon from '@mui/icons-material/Launch';
const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    // { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 100, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 90, flex: 0.7},
 
    {
      field: "status",
      headerName: "Status",
      minWidth: 90,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Verified"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 90,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/course/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        name: item.checkout.name,
        email: item.checkout.email,

        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user && user.name} - Orders`} />
      {/* 
      {loading ? (
        <Loader />
      ) : ( */}

      <Typography id="myOrdersHeading">{user && user.name}'s Orders</Typography>
      <div className="myOrdersPage">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default MyOrders;
