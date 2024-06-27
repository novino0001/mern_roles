import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./components.css";
import routes from "../constants/routes";
import { useSelector } from "react-redux";
import { IRootState } from "../state_management/reducers/AuthReducers";
 
interface UserData {
  fullName: string;
  email: string;

}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: IRootState) => state.userProfile);
  useEffect(() => {
    const fetchUserData = async () => {
      try {


        const response = await axios.get(
          "http://localhost:3002/api/v1/user/my-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data)
        setUserData(response.data.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h2>My Profile</h2>
      <div className="table-data">
        <table>
          <tr>
            <th>fullName</th>
            <th>Email</th>

          </tr>
          <tr>
            <td>{userData.fullName}</td>
            <td>{userData.email}</td>

          </tr>
        </table>
        <br />

        <Link to={routes.UPDATE_USER}>Update</Link>
      </div>
    </div>
  );
};

export default Profile;
