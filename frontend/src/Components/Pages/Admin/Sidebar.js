// import React from 'react'
// import {Link} from 'react-router-dom';
// import "./Dashboard.css";
// // import Courses from './Courses';

// function Sidebar() {
//   return (
//     <div className='dashboard_sidebar'>
//       <div className='dLogo'>SCTC</div>
//       <div className='dList'>
//         <ul className='unstyled'>
//           <li><Link className='dshActive' to='/dashboard'>Dashboard</Link></li>
//           <li><Link className='crsActive' to='/courses'>Courses</Link></li>
//           <li><Link className='stdActive' to='/students'>Students</Link></li>
//           <li><Link className='semActive' to='/seminars'>Seminars</Link></li>
//           <li><Link className='evnActive' to='/events'>Events</Link></li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Sidebar


import React from "react";
import "./sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
// import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import EventIcon from '@mui/icons-material/Event';
const Sidebar = () => {
  return (
    <div className="sidebar ">
      <Link to="/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
        className='sideBar_list unstyled'
      >
        <TreeItem nodeId="1" label="Courses" className='unstyled'>
          <Link to="/create/courses">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
          <Link to="/all/course">
            <TreeItem nodeId="2" label="View Courses" icon={<PostAddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<DesignServicesIcon />}
        className='sideBar_list unstyled'
      >
        <TreeItem nodeId="1" label="Services">
          <Link to="/create/service">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
          <Link to="/all/services">
            <TreeItem nodeId="2" label="View Services" icon={<PostAddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
      <Link to="/students">
        <p>
          <AccessibilityIcon /> Students
        </p>
      </Link>
      <Link to="/courseorder">
        <p>
          <ListAltIcon />
          Course Orders
        </p>
      </Link>

      {/* <Link to="/seminars">
        <p>
          <VideoLabelIcon  />
          Seminars
        </p>
      </Link>
      <Link to="/events">
        <p>
          <EventIcon />
         Events
        </p>
      </Link> */}
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<EventIcon />}
        className='sideBar_list unstyled'
      >
        <TreeItem nodeId="1" label="Workshops">

          <Link to="/create/event">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
          <Link to="/all/events">
            <TreeItem nodeId="2" label="All Workshops" icon={<PostAddIcon />} />
          </Link>

        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Sidebar;
