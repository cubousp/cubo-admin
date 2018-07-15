import MaterialAppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import Typography from '@material-ui/core/Typography'
import { ExitToApp } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import * as classNames from 'classnames'
import * as React from 'react'
import { logout } from '../services/auth'

const drawerWidth = 240

const styles = ({ palette, spacing, transitions, zIndex, mixins }: Theme) => ({
    appBar: {
        color: palette.getContrastText(palette.primary.dark),
        transition: transitions.create(['width', 'margin'], {
            duration: transitions.duration.leavingScreen,
            easing: transitions.easing.sharp,
        }),
        zIndex: zIndex.drawer + 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: transitions.create(['width', 'margin'], {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
    },
    hide: {
        display: 'none',
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...mixins.toolbar,
    },
})

interface IProps {
    open: boolean
    onMenuClick: () => void
    title: string
    onMobile?: boolean
}

class AppBar extends React.Component<IProps & WithStyles<'appBar' | 'appBarShift' | 'hide' | 'menuButton' | 'toolbar'>> {
    public handleLogout = () => logout()
    public render() {
        const { classes, open, title, onMenuClick, onMobile } = this.props
        return (
            <MaterialAppBar
                position='absolute'
                className={classNames(classes.appBar, open && !onMobile && classes.appBarShift)}
            >
                <Toolbar disableGutters={!open} style={{ display: 'flex' }}>
                    <div>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={onMenuClick}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <Typography variant='title' color='inherit' noWrap={true}>
                            {title}
                        </Typography>
                    </div>
                    <div>
                        <Tooltip title={'Logout'}>
                            <IconButton
                                color='inherit'
                                aria-label='logout'
                                onClick={this.handleLogout}
                            >
                                <ExitToApp />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </MaterialAppBar>
        )
    }
}

export default withStyles(styles)(AppBar)