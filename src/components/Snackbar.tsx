/* tslint:disable max-classes-per-file */
import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import MaterialSnackbar from '@material-ui/core/Snackbar'
import MaterialSnackbarContent from '@material-ui/core/SnackbarContent'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import * as classNames from 'classnames'
import * as React from 'react'

const variantIcon = {
    error: ErrorIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
}

const decorated1 = withStyles((theme) => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        marginRight: theme.spacing.unit,
        opacity: 0.9,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    message: {
        alignItems: 'center',
        display: 'flex',
    },
    success: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
}))

interface IContentProps {
    message: string
    onClose?: (event: any, reason: string) => void
    variant: 'success' | 'warning' | 'error' | 'info'
    className?: string
}

const SnackbarContent = decorated1(
    class extends React.Component<WithStyles<'error' | 'message' | 'icon' | 'iconVariant'> & IContentProps> {
        public render() {
            const { classes, message, variant, className, onClose, ...other } = this.props
            const Icon = variantIcon[variant]
            return (
                <MaterialSnackbarContent
                    className={classNames(classes[variant], className)}
                    aria-describedby='client-snackbar'
                    message={
                        <span id='client-snackbar' className={classes.message}>
                            <Icon className={classNames(classes.icon, classes.iconVariant)} />
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            onClick={onClose as any}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                    {...other as any}
                />
            )
        }
    } as any
) as any

const decorated2 = withStyles((theme) => ({
    margin: {
        margin: theme.spacing.unit,
    },
}))

interface ISnackbarProps {
    open: boolean
    onClose: (event: any, reason: any) => void
    message: string
    variant: 'success' | 'warning' | 'error' | 'info'
    absolute?: boolean
}

const Snackbar = decorated2(
    class extends React.Component<WithStyles<'margin'> & ISnackbarProps> {
        public render() {
            const { open, onClose, message, variant, absolute } = this.props
            return (
                <div>
                    <MaterialSnackbar
                        style={{ position: absolute? 'absolute' : 'fixed' }}
                        anchorOrigin={{
                            horizontal: 'left',
                            vertical: 'bottom',
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={onClose}
                    >
                        <SnackbarContent
                            onClose={onClose}
                            variant={variant}
                            message={message}
                        />
                    </MaterialSnackbar>
                </div>
            )
        }
    }
)

export default Snackbar