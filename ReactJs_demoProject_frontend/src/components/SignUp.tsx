import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./components.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../constants/routes";

// Define Yup validation schema
const schema = yup.object().shape({
  fullName: yup.string().min(3, "At least 3 characters").max(30).required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string()
    .min(6, "minimum 8 character required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/, "minimum - one uppercase letter, one lowercase letter, one number and one special character")
    .required("Password is required"),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3002/api/v1/auth/signup", data);
      if (response.data.success === true) {
        setMessage("Sign up successful");
        navigate(routes.LOGIN);
      } else {
        setMessage(`Sign up failed: ${response.data.message}`);
      }
    } catch (error) {
      setMessage("Sign up failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row-data">
          <label>Full Name:</label>
          <input type="text" {...register("fullName")} />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div className="row-data">
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="row-data">
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="addButton">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
