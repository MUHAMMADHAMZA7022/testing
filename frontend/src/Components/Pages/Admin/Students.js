import "./Dashboard.css";
import Sidebar from './Sidebar';

import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getAllUsers,
  CLEAR_ERROR,
  deleteUser,
} from "../../../redux/action/useraction";
import { DELETE_USER_RESET } from "../../../redux/Constant/userconstant";
import Loader from "../../Layout/Loader/loader";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function Students() {
let history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, users,loading } = useSelector((state) => state.allUsers);
  
    const {
      error: deleteError,
      isDeleted,
      message,
    } = useSelector((state) => state.profile);
  
    const deleteUserHandler = (id,name) => {
        confirmAlert({
            title: ' Delete Student',
            message: `Are you sure to delete ${name}.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  loading===true?(<Loader />):(
      dispatch(deleteUser(id))

                  );
                }   
              },
              {
                label: 'No',
                onclose: () => {}
              }
            ]
          });
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(  CLEAR_ERROR());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(  CLEAR_ERROR());
      }
  
      if (isDeleted) {
        alert.success(message);
        history("/students");
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, history, isDeleted, message]);
  
    const columns = [
        
      // { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 90,
        flex: 0.8,
      },
     
      {
     field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 20,
        flex: 0.3,
        cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ?  "greenColor":"redColor"
              
              
          },
      },
      {
        field: "joined",
        headerName: "Joined",
        type:"number",
        minWidth: 80,
        flex: 0.5,

      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
            const i=params.getValue(params.id, "id")
            const n=params.getValue(params.id, "name")
          return (
            <Fragment>
        
              <Button
                onClick={() =>
              
                  deleteUserHandler(i,n)}
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
          joined:String(item.createdAt).substr(0, 10)

        });
      });
  
    return (
        <Fragment>
            <div className='dashboard_holder students'>
                {/* Sidebar */}
                <div className='dSidebar'>
                    <Sidebar />
                </div>
                <div className='dashboard_content'>
          <h1>All Students</h1>

                    {
                    loading===false?(

                            <div >
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight
                        />
                    </div>
                        ):(
                            <Loader/>
                        )
                    }
                    
              
                </div>
            </div>
        </Fragment>
    )
}

export default Students