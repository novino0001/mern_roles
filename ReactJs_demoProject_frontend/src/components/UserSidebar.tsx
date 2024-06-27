import { Link } from "react-router-dom";
import routes from "../constants/routes";
import { logoutAction } from "../state_management/actions/authActions";
import { useDispatch } from "react-redux";

const UserSidebar = () => {
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


                </div>
                <div className="sidebar-links">

                    <Link to={routes.HOMEPAGE} className="sidebar-link">
                        Homepage
                    </Link>
                    <Link to={routes.MYTASK} className="sidebar-link">
                        MyTask
                    </Link>
                    <Link to={routes.MYPROFILE} className="sidebar-link">
                        My Profile
                    </Link>
                </div>
            </div>

            <Link to={routes.DASHBOARD} className="sidebar-link logout-button" onClick={handleLogout}>Logout</Link>
        </div>
    );
}
export default UserSidebar;