 

const routes = {
    HOMEPAGE: '/homepage',
    DASHBOARD: '/',
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    LOGOUT: '/logout',
    UPDATE_USER: '/update-user',
    MYPROFILE: '/my-profile', 
    PAGE_NOT_FOUND: '*',  
    MYTASK: "/my-task",
    CREATE_TASK: '/create-task', 
    UPDATE_TASK: '/update-task/:id',
    ADMIN_DASHBOARD: "/admin/dashboard",
    ALL_USER: "/admin/allUser",
    SHOW_USER_TASK: "/admin/userTask/:userId",
    UPDATE_TASK_BY_ADMIN: "/admin/updateTask/:taskId",
    SHOW_ALL_USER_TASK : "/admin/allUserTask",
    ADD_TASK_BY_ADMIN : "/admin/addTask/:userId",

}
export const beforeLoginRoutes = [
    routes.DASHBOARD,
    routes.LOGIN,
    routes.SIGN_UP
    
]
export const AdminRoutes = [
    routes.ADMIN_DASHBOARD,
    routes.SHOW_USER_TASK,
    routes.SHOW_ALL_USER_TASK,
    routes.UPDATE_TASK_BY_ADMIN,
    routes.ADD_TASK_BY_ADMIN,
    routes.ALL_USER,
    routes.LOGOUT
]
export const UserRoutes = [
    routes.CREATE_TASK,
    routes.HOMEPAGE,
    routes.MYPROFILE,
    routes.UPDATE_USER,
    routes.UPDATE_TASK,
    routes.MYTASK,
    routes.LOGOUT
]

export default routes;