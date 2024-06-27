// src/components/ShowParticularUserTask.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Task, Performance } from '../../types/Task';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { useSelector } from 'react-redux';
import { IRootState } from '../../state_management/reducers/AuthReducers';
import styles from './style/allTaskTable.module.css';

const ShowParticularUserTask: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [performance, setPerformance] = useState<Performance>({ pending: 0, completed: 0 });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useSelector((state: IRootState) => state.userProfile);

  const fetchTasks = async () => {
    try {
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`http://localhost:3002/api/v1/task/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.data.userTask);
      setPerformance(response.data.data.getscore);
    } catch (error) {
      setError('Error fetching tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token, userId]); // Added token and userId to the dependency array

  const updateTask = (taskId: string) => {
    navigate(routes.UPDATE_TASK_BY_ADMIN.replace(':taskId', taskId));
  };

  const addTask = (userId: string) => {
    navigate(routes.ADD_TASK_BY_ADMIN.replace(":userId", userId));
  };

  const deleteTask = async (taskId: string) => {
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this task?");
      if (userConfirmed) {
        await axios.delete(
          `http://localhost:3002/api/v1/task/admin/delete-task/${taskId}`,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let i = 1;

  return (
    <div>
      <h2>User Tasks</h2>
      <button className={styles.addButton} onClick={() => addTask(userId || '')}>Add Task</button>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{i++}</td>
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
      </div>
    </div>
  );
};

export default ShowParticularUserTask;
