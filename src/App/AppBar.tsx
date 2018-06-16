import MaterialAppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import * as classNames from 'classnames'
import * as React from 'react'

const drawerWidth = 240

const decorate = withStyles(({ palette, spacing, transitions, zIndex, mixins }) => ({
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
}))

interface IProps {
    open: boolean
    onMenuClick: () => void
    title: string
    onMobile?: boolean
}

const AppBar = decorate<IProps>(({ classes, open, title, onMenuClick, onMobile }) => (
    <MaterialAppBar
        position='absolute'
        className={classNames(classes.appBar, open && !onMobile && classes.appBarShift)}
    >
        <Toolbar disableGutters={!open}>
            <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={onMenuClick}
                className={classNames(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap={true}>
                {title}
            </Typography>
        </Toolbar>
    </MaterialAppBar>
))

export default AppBar