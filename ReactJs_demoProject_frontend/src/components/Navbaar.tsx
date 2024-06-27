
import React from 'react';
import './navbaar.module.css';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../state_management/actions/authActions';
import { IRootState } from '../state_management/reducers/AuthReducers';
 
 
 
const Navbaar: React.FC = () => {
  const { token } = useSelector((state: IRootState) => state.userProfile);
 const dispatch = useDispatch();
  function handleLogout() {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      dispatch(logoutAction()) 
    }
  };
 
  return (
    <nav>
      <ul>
        

        {token ?  (
          <>
            <li><Link to={routes.HOMEPAGE}>HomePage </Link></li>
            <li><Link to={routes.MYTASK}>MyTask</Link></li>
            <li><Link to={routes.MYPROFILE}>MyProfile</Link></li>
            <li><Link to={routes.DASHBOARD} onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
          <li><Link to={routes.DASHBOARD}>DashBoard</Link></li>
        <li><Link to={routes.SIGN_UP}>signUp</Link></li>
            <li><Link to={routes.LOGIN}>Login</Link></li>
          </>
        )}

      </ul>
    </nav>
  )
}

export default  Navbaar;