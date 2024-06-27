import React from 'react';
import { Link } from 'react-router-dom';
import './style/adminSidebar.css';
import routes from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../state_management/actions/authActions';



const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();

  function handleLogout() {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      dispatch(logoutAction())
    }

  };
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <Link to={routes.ADMIN_DASHBOARD} className="sidebar-link" >Admin</Link>

        </div>
        <div className="sidebar-links">
          <Link to={routes.ALL_USER} className="sidebar-link">
            Users
          </Link>
          <Link to={routes.SHOW_ALL_USER_TASK} className="sidebar-link">
            All Tasks
          </Link>
        </div>
      </div>

      <Link to={routes.DASHBOARD} className="sidebar-link logout-button" onClick={handleLogout}>Logout</Link>
    </div>
  );
};

export default AdminSidebar;
