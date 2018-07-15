import { initialState, IState } from '../../App/state'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

const LoginReducer = (state: IState = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_REQUEST: return {
                ...state,
                loading: true,
                loginError: false
        }
        case LOGIN_SUCCESS: return {
            ...state,
            currentUser: action.user,
            loading: false,
            redirectToDashboard: true,
        }
        case LOGIN_ERROR: return {
            ...state,
            loading: false,
            loginError: true
        }
        default: return state
    }
}

export default LoginReducer