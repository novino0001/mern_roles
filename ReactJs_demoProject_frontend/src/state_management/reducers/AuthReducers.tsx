import { UserData   } from '../../interfaces/CommonInterfaces';
import ActionType from '../../resources/enums/index';


export interface IRootState {
    isLoggedIn: boolean,
    userProfile: UserData,
  
}

const initialState: IRootState = {
    isLoggedIn: false,
    userProfile: {} as UserData,
     
}

interface LoginAction {
    type: ActionType.LOGIN,
    payload: UserData 
}

interface LogoutAction {
    type: ActionType.LOGOUT
}
 
type Action = LoginAction | LogoutAction  ;
export const authReducer = (state = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.LOGIN:
            return ({
                ...state,
                isLoggedIn: true,
                userProfile: action.payload,
            })
        case ActionType.LOGOUT:
            return ({
                isLoggedIn: false,
                userProfile: {} as UserData,
            })
    
        default:
            return state;
    }
}

export default authReducer;