// src/components/AllUser.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/User';
import routes from '../../constants/routes';
import { useSelector } from 'react-redux';
import { IRootState } from '../../state_management/reducers/AuthReducers';
import styles from './style/allUser.module.css';

const AllUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState(""); // State for block query
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [emailQuery, setEmailQuery] = useState<string>(''); // State for email query
  const navigate = useNavigate();
  const { token } = useSelector((state: IRootState) => state.userProfile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3002/api/v1/user/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data.all_users);

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const blockUser = (userId: string) => {
   const response =  axios.patch(`http://localhost:3002/api/v1/user/admin/block/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage("User blocked successfully");
  };

  const showUserTask = (userId: string) => {
    navigate(routes.SHOW_USER_TASK.replace(':userId', userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter users based on search query and email query
  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    user.email.toLowerCase().includes(emailQuery.toLowerCase())
  );

  let i = 1;
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search by full name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          className={styles.searchInput}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{i++}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button type="button" onClick={() => showUserTask(user._id)}>
                    {user.fullName}'s activity
                  </button>
                  <button type="button" onClick={() => blockUser(user._id)}>
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
