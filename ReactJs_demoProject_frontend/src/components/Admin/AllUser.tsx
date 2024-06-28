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
  const [message, setMessage] = useState(""); // State for block/unblock message
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [emailQuery, setEmailQuery] = useState<string>(''); // State for email query
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const { token } = useSelector((state: IRootState) => state.userProfile);

  const fetchUsers = async (page: number) => {
    try {
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get('http://localhost:3002/api/v1/user/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit: 10, 
          searchByName: searchQuery,
          searchByEmail: emailQuery,
        },
      });
      const { users, totalPages } = response.data.data;
      setUsers(users);
      setTotalPages(totalPages);
  
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [token, currentPage, searchQuery, emailQuery]);

  const toggleUserBlock = async (userId: string, name: string, isActive: boolean) => {
    try {
      const action = isActive ? 'block' : 'unblock';
      const userConfirmed = window.confirm(`Are you sure you want to ${action} ${name}?`);
      if (userConfirmed) {
        const response = await axios.patch(
          `http://localhost:3002/api/v1/user/admin/block/${userId}`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(`User ${action}ed successfully`);
        setUsers(users.map(user => user._id === userId ? { ...user, isActive: !isActive } : user));
      } else {
        setMessage(`User not ${action}ed`);
      }
    } catch (err) {
      setError(`Failed to ${isActive ? 'block' : 'unblock'} user`);
    }
  };

  const showUserTask = (userId: string) => {
    navigate(routes.SHOW_USER_TASK.replace(':userId', userId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchUsers(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let i = (currentPage - 1) * 10 + 1; // Adjust the index based on current page
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className={styles.container}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="email"
            placeholder="Search by email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
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
            {users.map(user => (
              <tr key={user._id}>
                <td>{i++}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button type="button" onClick={() => showUserTask(user._id)}
                     className={styles.userButton}>
                    user activity
                  </button>
                  {user.isActive ? (
                    <button
                      type="button"
                      onClick={() => toggleUserBlock(user._id, user.fullName, true)}
                      className={styles.blockButton}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleUserBlock(user._id, user.fullName, false)}
                      className={styles.unblockButton}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUser;
