import ActionType from "../../resources/enums/index";
import {UserData } from "../../interfaces/CommonInterfaces"


export const loginAction = (data: UserData) => ({
    type: ActionType.LOGIN,
    payload: data,
})

export const logoutAction = () => ({
    type: ActionType.LOGOUT,
})

export const UpdateProfile = (data: UserData) => ({
    type: ActionType.UPDATE_PROFILE,
    payload: data,
})



