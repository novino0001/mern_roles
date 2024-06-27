import React, { useState } from "react";
import "../components.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../constants/routes";
import { useSelector } from "react-redux";
import { IRootState } from "../../state_management/reducers/AuthReducers";

const AddTaskByAdmin: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state: IRootState) => state.userProfile);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        `http://localhost:3002/api/v1/task/createTaskByAdmin/${userId}`,
        {
          title,
          description,
          dueDate,
          status: taskStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setMessage("Task created successfully");
      navigate(-1);
      alert("Task created successfully");
    } catch (error) {
      setMessage("Task creation failed");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="row-data">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="row-data">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row-data">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            min={getCurrentDate()}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="row-data">
          <label>Task Status:</label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
           
        </div>
        <button type="submit" className="addButton">Create Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTaskByAdmin;
