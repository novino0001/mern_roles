// src/components/TaskTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../state_management/reducers/AuthReducers";
import styles from "./style/allTaskTable.module.css";
import routes from "../../constants/routes";

interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    fullName: string;
}

const ShowAllUserTask: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [titleQuery, setTitleQuery] = useState<string>("");
    const [statusQuery, setStatusQuery] = useState<string>("");
    const navigate = useNavigate();
    const { token } = useSelector((state: IRootState) => state.userProfile);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3002/api/v1/task/admin/alluser-task",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTasks(response.data.data.results);
            } catch (err) {
                setError("Failed to fetch tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [token]);

    const updateTask = (taskId: string) => {
        navigate(routes.UPDATE_TASK_BY_ADMIN.replace(":taskId", taskId));
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
            }
        } catch (err) {
            setError("Failed to delete task");
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.fullName.toLowerCase().includes(titleQuery.toLowerCase()) &&
        (statusQuery === "" || task.status.toLowerCase() === statusQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }
let i = 1;
    return (
        <div>
            <h2>All User Tasks</h2>
            <div className={styles.tableContainer}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={statusQuery}
                        onChange={(e) => setStatusQuery(e.target.value)}
                        className={styles.searchSelect}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Full Name</th>
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
                                <td>{i++}</td>
                                <td>{task.fullName}</td>
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
            </div>
        </div>
    );
};

export default ShowAllUserTask;
