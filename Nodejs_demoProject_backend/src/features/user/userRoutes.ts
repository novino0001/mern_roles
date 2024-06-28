import express from 'express';
import { updateUserProfile , getUsers ,myProfile, getLatestUsers, blockUser } from "./userControllers"
import { authMiddleware } from "../../middlewares/authMiddleware"
import { roleMiddleware } from "../../middlewares/roleMiddleware"

const userRoutes = express.Router();
userRoutes.get('/my-profile', authMiddleware, myProfile);
userRoutes.patch('/update-profile', authMiddleware, updateUserProfile);

// Admin routes
userRoutes.get('/admin/users', authMiddleware, roleMiddleware('admin'), getUsers);
userRoutes.get("/admin/latest-users", authMiddleware, roleMiddleware("admin"), getLatestUsers);
userRoutes.patch("/admin/block/:id", authMiddleware, roleMiddleware("admin"), blockUser);
 


export default userRoutes;