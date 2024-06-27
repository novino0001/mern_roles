import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './homepage.module.css'; // Import CSS Module styles
// import { Task } from '../types/Task';
import { useSelector } from 'react-redux';
import { IRootState } from '../state_management/reducers/AuthReducers';


// Define the type for a task
interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  userId: string;
  _id: string;
}

// Define the component
const Homepage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: IRootState) => state.userProfile);
  useEffect(() => {
    // Function to fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/task/upcoming-task",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.data.upcomingTasks);
        console.log(response.data.data.upcomingTasks)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles['table-container']}>
      <h1 className={styles.title}>Upcoming week Pending Tasks</h1>
      {tasks.length === 0 ? (
        <div>No upcoming pending tasks.</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              <th className={styles['header-cell']}>Title</th>
              <th className={styles['header-cell']}>Description</th>
              <th className={styles['header-cell']}>Due Date</th>
              <th className={styles['header-cell']}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={index % 2 === 0 ? styles['row-even'] : ''}>
                <td className={styles.cell}>{task.title}</td>
                <td className={styles.cell}>{task.description}</td>
                <td className={styles.cell}>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className={styles.cell}>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Homepage;
