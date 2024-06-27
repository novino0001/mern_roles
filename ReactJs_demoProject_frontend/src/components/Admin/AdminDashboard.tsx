// src/components/AllUser.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/User';
import { Performance } from '../../types/Task';
import routes from '../../constants/routes';
import { useSelector } from 'react-redux';
import { IRootState } from '../../state_management/reducers/AuthReducers';
import styles from './style/adminDashboard.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [performance, setPerformance] = useState<Performance>({ pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const navigate = useNavigate();
  const { token } = useSelector((state: IRootState) => state.userProfile); 
 
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3002/api/v1/user/admin/latest-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data.recent_users);

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  const allTaskData = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:3002/api/v1/task/admin/alluser-task', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPerformance(response.data.data.getscore);
      }
      catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
    allTaskData();
  }, [token]);

  const showUserTask = (userId: string) => {
    navigate(routes.SHOW_USER_TASK.replace(':userId', userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const data = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [performance.pending, performance.completed],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };


 
  return (
    <div>
      <h2>Admin Dashboard</h2>
     
      <div className={styles.main}>
      <div className={styles.container}>
      <h3  >Latest Joined user</h3>
        <table className={styles.table}>
          <thead>
            <tr>
               
              <th>Name</th>
              <th>Email</th> 
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}> 
                <td>{user.fullName}</td>
                <td>{user.email}</td>
               
                <td>
                  <button type="button" onClick={() => showUserTask(user._id)}>
                    {user.fullName}'s activity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
       <div className={styles.piechart}>
        <h3>Task status</h3>
      <div className={styles.chartContainer}>
          <Pie data={data} />
        </div>
       </div>

    </div>
    </div>
  );
};

export default AdminDashboard;
