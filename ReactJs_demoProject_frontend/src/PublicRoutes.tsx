import React from "react";
import Navbaar from "./components/Navbaar";
import routes from "./constants/routes";
import HomePage from "./components/Homepage";
import MyTask from "./components/task/MyTask";
import MyProfile from "./components/MyProfile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { PrivateRoutes } from "./PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateTask from "./components/task/CreateTask";
import UpdateTask from "./components/task/UpdateTask";
import UpdateUser from "./components/UpdateUser";
import PageNotFound from "./components/PageNotFound";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ShowParticularUserTask from "./components/Admin/ShowParticularUserTask";
import AllUser from "./components/Admin/AllUser";
import UpdateTaskByAdmin from "./components/Admin/UpdateTaskByAdmin";
import ShowAllUserTask from "./components/Admin/ShowAllUserTask";
import UserSidebar from "./components/UserSidebar"
import AddTaskByAdmin from "./components/Admin/AddTaskByAdmin";
 
interface Props {
  component: React.FC<{}>;
  route: string;
}
export const WithNavbar = (props: Props) => {
  return (

    <div>
      <Navbaar />
      <div>
        <PrivateRoutes {...props} />
      </div>
    </div>

  );
};
export const WithHeader = (props: Props) => {
  return (

    <div>
      <UserSidebar />
      <div>
        <PrivateRoutes {...props} />
      </div>
    </div>

  );
};
export const AdminHeader = (props: Props) => {
  return (
    <>
      <div>
        <AdminSidebar />
        <div>
          <PrivateRoutes {...props} />
        </div>
      </div>
    </>
  );
};


const PublicRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path={routes.HOMEPAGE}
          element={<WithHeader component={HomePage} route={routes.HOMEPAGE} />}
        />
        <Route
          path={routes.DASHBOARD}
          element={
            <WithNavbar component={Dashboard} route={routes.DASHBOARD} />
          }
        />
        <Route
          path={routes.SIGN_UP}
          element={<WithNavbar component={SignUp} route={routes.SIGN_UP} />}
        />
        <Route
          path={routes.LOGIN}
          element={<WithNavbar component={Login} route={routes.LOGIN} />}
        />

        <Route
          path={routes.MYTASK}
          element={<WithHeader component={MyTask} route={routes.MYTASK} />}
        />

        <Route
          path={routes.MYPROFILE}
          element={
            <WithHeader component={MyProfile} route={routes.MYPROFILE} />
          }
        />


        <Route
          path={routes.CREATE_TASK}
          element={
            <WithHeader component={CreateTask} route={routes.CREATE_TASK} />
          }
        />
        <Route
          path={routes.UPDATE_TASK}
          element={
            <WithHeader component={UpdateTask} route={routes.UPDATE_TASK} />
          }
        />
        <Route
          path={routes.UPDATE_USER}
          element={
            <WithHeader component={UpdateUser} route={routes.UPDATE_USER} />
          }
        />

        <Route
          path={routes.PAGE_NOT_FOUND}
          element={
            <WithHeader component={PageNotFound} route={routes.PAGE_NOT_FOUND} />
          }
        />

        <Route
          path={routes.ADMIN_DASHBOARD}
          element={<AdminHeader component={AdminDashboard} route={routes.ADMIN_DASHBOARD} />}
        />
        <Route
          path={routes.SHOW_USER_TASK}
          element={<AdminHeader component={ShowParticularUserTask} route={routes.SHOW_USER_TASK} />}
        />

        <Route
          path={routes.ALL_USER}
          element={<AdminHeader component={AllUser} route={routes.ALL_USER} />}
        />
        <Route
          path={routes.UPDATE_TASK_BY_ADMIN}
          element={<AdminHeader component={UpdateTaskByAdmin} route={routes.UPDATE_TASK_BY_ADMIN} />}
        />
        <Route
          path={routes.SHOW_ALL_USER_TASK}
          element={<AdminHeader component={ShowAllUserTask} route={routes.SHOW_ALL_USER_TASK} />}
        />
        <Route
          path={routes.ADD_TASK_BY_ADMIN}
          element={<AdminHeader component={AddTaskByAdmin} route={routes.ADD_TASK_BY_ADMIN} />}
        />
      </Routes>

    </div>
  );
};

export default PublicRoutes;
