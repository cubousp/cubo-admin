/* tslint:disable jsx-no-lambda */
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Analytics from '../scenes/Analytics/Anlytics'
import Events from '../scenes/Events/Events'
import FeedContainer from '../scenes/Feed/FeedContainer'
import LoginContainer from '../scenes/Login/LoginContainer'
import Participants from '../scenes/Participants/Participants'
import AppShell from './AppShell'
import { IState } from './state'

export const history = createBrowserHistory()

const PrivateRoute = connect(
    ({ currentUser }: IState, ownProps: any) => ({
        isAuthenticated: currentUser !== undefined,
        ...ownProps
    })
)(({ component: Component, isAuthenticated, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
))

const AppRouter = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route path='/login' component={LoginContainer} />
            <AppShell>
                <PrivateRoute exact={true} path='/' component={FeedContainer} />
                <PrivateRoute exact={true} path='/analytics' component={Analytics} />
                <PrivateRoute exact={true} path='/events' component={Events} />
                <PrivateRoute exact={true} path='/feed' component={FeedContainer} />
                <PrivateRoute exact={true} path='/participants' component={Participants} />
            </AppShell>
        </Switch>
    </ConnectedRouter>
)
export default AppRouter