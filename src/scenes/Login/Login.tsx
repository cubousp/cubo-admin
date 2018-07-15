import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import FormControl from '@material-ui/core/FormControl/FormControl'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Paper from '@material-ui/core/Paper/Paper'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import { WithWidthProps } from '@material-ui/core/withWidth'
import withWidth from '@material-ui/core/withWidth/withWidth'
import { Email, Visibility, VisibilityOff } from '@material-ui/icons'
import * as classNames from 'classnames'
import * as React from 'react'
import { Redirect } from 'react-router'
import { compose } from 'recompose'

const styles = (theme: Theme) => ({
    button: {
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        marginTop: 64,
    },
    container: {
        background: 'url(cubo-entrance.jpg) center center no-repeat',
        backgroundSize: 'cover',
        bottom: 0,
        display: 'flex',
        left: 0,
        position: 'absolute' as 'absolute',
        right: 0,
        top: 0
    },
    error: {
        color: theme.palette.error.main,
        marginTop: 32,
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginTop: 32
    },
    header: {
        marginTop: 32
    },
    margin: {
        margin: theme.spacing.unit,
    },
    mobilePaper: {
        height: '100vh !important'
    },
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: 400,
        margin: 'auto',
        padding: 16,
        width: 288
    },
    progress: {
        marginTop: 64
    }
})

interface ILoginProps {
    onLoginClick: (email: string, password: string) => Promise<void>
    loading: boolean,
    error: boolean,
    redirectToDashboard: boolean
}

const Login = class extends React.Component<
        ILoginProps &
        WithStyles<'margin' | 'form' | 'mobilePaper' | 'container' | 'paper' | 'button' | 'header' | 'progress' | 'error'> &
        WithWidthProps
    > {

        public state = {
            email: '',
            password: '',
            showPassword: false,
        }

        public handleChange = (prop: string) => (event: any) => {
            this.setState({ [prop]: event!.target!.value })
        }

        public handleMouseDownPassword = (event: any) => {
            event.preventDefault()
        }

        public handleClickShowPassword = () => {
            this.setState({ showPassword: !this.state.showPassword })
        }

        public handleLogin = () => this.props.onLoginClick(this.state.email, this.state.password)

        public render() {
            const { classes, width, loading, error, redirectToDashboard } = this.props

            if (redirectToDashboard) {
                return <Redirect to={'/'}/>
            }

            return (
                <div className={classes.container}>
                    <Paper className={classNames(classes.paper, width === 'xs' && classes.mobilePaper)} elevation={4}>
                        <div className={classes.header}>
                            <Typography variant={'headline'}>Cubo | Admin</Typography>
                        </div>
                        <div className={classes.form}>
                            <FormControl className={classes.margin}>
                                <InputLabel>Email</InputLabel>
                                <Input
                                    id='email'
                                    type={'email'}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='Email'
                                                tabIndex={-1}
                                            >
                                                <Email/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <InputLabel>Senha</InputLabel>
                                <Input
                                    id='password'
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='Toggle password visibility'
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                tabIndex={-1}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        {
                            loading
                            ? <CircularProgress className={classes.progress} />
                            : <Button
                                    color='primary'
                                    className={classes.button}
                                    variant={'raised'}
                                    size={'large'}
                                    onClick={this.handleLogin}
                                >
                                    Entrar
                                </Button>
                        }
                        {
                            error &&
                                <div className={classes.error}>
                                    E-mail ou senha incorretos
                                </div>
                        }
                    </Paper>
                </div>
            )
        }
    }

export default compose<{}, ILoginProps>(withStyles(styles, { withTheme: true }), withWidth())(Login)