import React, { useEffect, useState } from "react";
import "../components.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IRootState } from "../../state_management/reducers/AuthReducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 

const UpdateTaskByAdmin: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useSelector((state: IRootState) => state.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
      
        const response = await axios.get(
          `http://localhost:3002/api/v1/task/getTaskById/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const task = response.data.data.getTask;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split("T")[0]);
        setTaskStatus(task.status);
      } catch (error) {
        console.log(error);
        setMessage("Task not found");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      await axios.patch(
        `http://localhost:3002/api/v1/task/admin/update-task/${taskId}`,
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
      setMessage("Task updated successfully");
      alert("Task updated successfully");
      navigate(-1);
    } catch (error) {
      setMessage("Task update failed");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div>
      <h2>Update Task</h2>
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
        <button type="submit" className="addButton">Update Task</button>
      </form>
      {<p>{message}</p>}
    </div>
  );
};

export default UpdateTaskByAdmin;
