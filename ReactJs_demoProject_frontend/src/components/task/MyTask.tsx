import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task, Performance } from "../../types/Task";
import styles from "./style/MyTask.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import { useSelector } from "react-redux";
import { IRootState } from "../../state_management/reducers/AuthReducers";

const MyTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [performance, setPerformance] = useState<Performance>({ pending: 0, completed: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { token } = useSelector((state: IRootState) => state.userProfile);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3002/api/v1/task/getAllTask",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.data.allTask);
      setPerformance(response.data.data.getscore);
      console.log(response.data.data.getscore);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const updateTask = (taskId: string) => {
    navigate(routes.UPDATE_TASK.replace(":id", taskId));
  };

  const deleteTask = async (taskId: string) => {
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this task?");
      if (userConfirmed) {
        await axios.delete(
          `http://localhost:3002/api/v1/task/deleteTask/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(tasks.filter((task) => task._id !== taskId));
        fetchTasks()
      }
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    statusFilter === "all" || task.status.toLowerCase() === statusFilter
  );

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredTasks.length === 0) {
    return (
      <div className={styles.container}>
        <h1>No tasks found</h1>
        <br />
        <button type="button" className={styles.addButton} onClick={() => navigate(routes.CREATE_TASK)}>
          Create Task
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => updateTask(task._id)}
                    disabled={task.status === "completed"}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTask(task._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pending</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{performance.pending}</td>
              <td>{performance.completed}</td>
            </tr>
          </tbody>
        </table>

        <center>
          <button type="button" onClick={() => navigate(routes.CREATE_TASK)} className={styles.addButton}>
            Add more Task
          </button>
        </center>
      </div>
    );
  }
};

export default MyTask;
