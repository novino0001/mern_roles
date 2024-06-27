import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./state_management/reducers/AuthReducers";


import routes, {
  beforeLoginRoutes,
  AdminRoutes,
  UserRoutes,
} from "./constants/routes";
import { logoutAction } from "./state_management/actions/authActions";

interface Props {
  component: React.ComponentType;
  route: string;
}
export const PrivateRoutes: React.FC<Props> = ({
  component: RouteComponent,
  route,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token,role } = useSelector((state: IRootState) => state.userProfile);
  // console.log(token)
  // console.log(role) 

  useEffect(() => {
    if (token) sessionExpire();
  });

  const sessionExpire = () => {
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired) {
      dispatch(logoutAction())
      navigate(routes.DASHBOARD);
    }
  };

  let returnData;
   
  if (token) {
    
    if (role === "admin") {

      if (beforeLoginRoutes.includes(route)) {
        // alert("you are already logged in")
        returnData = <Navigate to={routes.ADMIN_DASHBOARD} />;
      } else if (AdminRoutes.includes(route)) {

        returnData = <RouteComponent />;
      } else {
        alert("you are not eligible to access this page")
        returnData = <Navigate to={routes.ADMIN_DASHBOARD} />;
      }
    }
    else if (role === "user") {
      if (beforeLoginRoutes.includes(route)) {
         
        returnData = <Navigate to={routes.HOMEPAGE} />;
      } else if (UserRoutes.includes(route)) {
        returnData = <RouteComponent />;
      } else returnData = <RouteComponent />;
    } else {
      alert("you are not eligible to access this page")
      returnData = <Navigate to={routes.DASHBOARD} />;
    }
  }
  else {
    if (beforeLoginRoutes.includes(route)) returnData = <RouteComponent />;
    else {
      returnData = <Navigate to={routes.LOGIN} />;
      alert("you are not authenticated");
    }
  }

  return returnData;
}; 