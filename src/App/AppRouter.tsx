/* tslint:disable jsx-no-lambda */
import { createBrowserHistory } from 'history'
import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Activities from '../scenes/Activities/Activities'
import ActivityDetail from '../scenes/Activities/ActivityDetail'
import Analytics from '../scenes/Analytics/Anlytics'
import FeedContainer from '../scenes/Feed/FeedContainer'
import LoginContainer from '../scenes/Login/LoginContainer'
import Participants from '../scenes/Participants/Participants'
import { isAuthenticated } from '../services/auth'
import AppShell from './AppShell'

export const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
            )
        }
        }
    />
)

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path='/login' component={LoginContainer} />
            <AppShell>
                <PrivateRoute exact={true} path='/' component={Activities} />
                <PrivateRoute exact={true} path='/analytics' component={Analytics} />
                <PrivateRoute exact={true} path='/activities' component={Activities} />
                <PrivateRoute path='/activities/:id' component={ActivityDetail} />
                <PrivateRoute exact={true} path='/feed' component={FeedContainer} />
                <PrivateRoute exact={true} path='/participants' component={Participants} />
            </AppShell>
        </Switch>
    </Router>
)
export default AppRouter