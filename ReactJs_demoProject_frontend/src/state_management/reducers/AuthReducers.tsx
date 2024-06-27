import { UserData   } from '../../interfaces/CommonInterfaces';
import ActionType from '../../resources/enums/index';

// interface UserData {
//     userId : string;
//     fullName: string; 
//     email: string; 
//     token : string;
//     role: string;
   
// }
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
interface UpdateAction {
    type: ActionType.UPDATE_PROFILE,
    payload: UserData 
}

interface LogoutAction {
    type: ActionType.LOGOUT
}
 
type Action = LoginAction | LogoutAction | UpdateAction ;
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
        case ActionType.UPDATE_PROFILE:
            return ({
                ...state, 
                userProfile: action.payload,
               
            })
    
        default:
            return state;
    }
}

export default authReducer;