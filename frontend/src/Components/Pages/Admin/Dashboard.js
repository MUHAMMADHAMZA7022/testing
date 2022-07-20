import React, { Fragment,useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import Sidebar from './Sidebar';
import { useSelector,useDispatch} from "react-redux";
import { getProduct } from '../../../redux/action/courseaction';
import { getEvent} from '../../../redux/action/eventaction';
import { getService} from '../../../redux/action/serviceaction';
import { getAllUsers} from '../../../redux/action/useraction';
import { getAllOrders} from '../../../redux/action/orderaction';
import Loader1 from "../../Layout/Loader/Courseloader"
function Dashboard() {
    const dispatch=useDispatch()
  const { courses } = useSelector((state) => state.courses);
  const { loading,latestevent} = useSelector((state) => state.events);
  const { latestservice,} = useSelector((state) => state.services);
  const { users} = useSelector((state) => state.allUsers);
  const { orders} = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getEvent());
    dispatch(getService());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  
  }, [dispatch]);

    return (
        <Fragment>
            <div className='dashboard_holder dashboard'>
                {/* Sidebar */}
                <div className='dSidebar'>
                    <Sidebar />
                </div>
                {/* Main Content */}
                {
                    loading===false?(
                        <div className='dashboard_content'>
                    <div className='dashboardContent_holder'>
                        <div className='dasCard'>
                            <h3>Total No of Courses</h3>
                            <span>{courses&&courses.length}</span>
                            <div className='lnk_boxDsh'>
                                <Link to={"/courses"}>See all courses</Link>
                            </div>
                        </div>
                        <div className='dasCard'>
                            <h3>Total No of Workshops</h3>
                            <span>{latestevent&&latestevent.length}</span>
                            <div className='lnk_boxDsh'>
                                <Link to={"/events"}>See all Workshops</Link>
                            </div>
                        </div>
                      

                        <div className='dasCard'>
                            <h3>Total No of Services</h3>
                            <span>{latestservice&&latestservice.length}</span>
                            <div className='lnk_boxDsh'>
                                <Link to={"/services"}>See all Services</Link>
                            </div>
                        </div>
                        <div className='dasCard'>
                            <h3>Total No of Users</h3>
                            <span>{users&&users.length}</span>
                            <div className='lnk_boxDsh'>
                                <Link to={"/students"}>See all Users</Link>
                            </div>
                        </div>
                        <div className='dasCard'>
                            <h3>Total No of Order</h3>
                            <span>{orders&&orders.length}</span>
                            <div className='lnk_boxDsh'>
                                <Link to={"/courseorder"}>See all Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>

                    ):(<Loader1/>)
                }
                            </div>
        </Fragment>
    )
}

export default Dashboard
