import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./components.css";
import routes from "../constants/routes";
import { loginAction } from "../state_management/actions/authActions";

// Define Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string()
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/auth/signin",
        data
      );
      if (response.data.token.token) {

        const total = response.data;
        console.log(total.token)
        dispatch(loginAction(total.token));
        setMessage("Login successful");

        if (total.token.role === "admin") {
          navigate(routes.ADMIN_DASHBOARD);
        } else {
          navigate(routes.HOMEPAGE);
        }
      }
      else {
        setMessage("invalid email or password");
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row-data">
          <label>Email:</label>
          <input
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="row-data">
          <label>Password:</label>
          <input
            type="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="addButton">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
