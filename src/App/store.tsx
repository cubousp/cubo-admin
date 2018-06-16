import { connectRouter, routerMiddleware } from 'connected-react-router'
import reduceReducers from 'reduce-reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import FeedReducer from '../scenes/Feed/FeedReducer'
import LoginReducer from '../scenes/Login/LoginReducer'
import { history } from './AppRouter'
import { initialState } from './state'

export interface IAction {
    type: string,
}

const rootReducer = reduceReducers(LoginReducer, FeedReducer)

export default createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history)
        ),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    ),
)