import express from 'express';
import { updateUserProfile , getAllUsers ,myProfile, getLatestUsers } from "./userControllers"
import { authMiddleware } from "../../middlewares/authMiddleware"
import { roleMiddleware } from "../../middlewares/roleMiddleware"

const userRoutes = express.Router();
userRoutes.get('/my-profile', authMiddleware, myProfile);
userRoutes.patch('/update-profile', authMiddleware, updateUserProfile);

// Admin routes
userRoutes.get('/admin/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
userRoutes.get("/admin/latest-users", authMiddleware, roleMiddleware("admin"), getLatestUsers);
 


export default userRoutes;