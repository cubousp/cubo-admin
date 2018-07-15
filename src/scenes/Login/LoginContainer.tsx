import { push } from 'connected-react-router'
import { connect, Dispatch } from 'react-redux'
import { IState } from '../../App/state'
import { signIn } from '../../services/auth'
import { client } from '../../services/client'
import Login from './Login'
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from './LoginReducer'

const mapStateToProps = ({ loading, loginError, redirectToDashboard }: IState) => ({ loading, error: loginError, redirectToDashboard })

const mapDispatchToProps = (dispatch: Dispatch) => ({
    async onLoginClick(email: string, password: string) {
        dispatch({ type: LOGIN_REQUEST })
        try {
            const { data } = await client.query({ query: signIn(email, password) }) as any
            localStorage.setItem('token', data.signInAsAdmin.token)
            localStorage.setItem('currentUser', JSON.stringify(data.signInAsAdmin.user))
            await client.resetStore()
            dispatch({ type: LOGIN_SUCCESS, user: data.signInAsAdmin.user })
            dispatch(push('/'))
        } catch(err) {
            dispatch({ type: LOGIN_ERROR})
        }
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
