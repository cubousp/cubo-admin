import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import * as classNames from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { drawerItems } from './drawerItems'
import logo from './logo.png'

const drawerWidth = 240

const disabledLink = {
        cursor: 'default',
        display: 'block',
        pointerEvents: 'none' as 'none'
}

const decorate = withStyles(({ palette, spacing, transitions, zIndex, mixins, breakpoints }) => ({
    drawerPaper: {
        position: 'relative' as 'relative',
        transition: transitions.create('width', {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
        }),
        whiteSpace: 'nowrap' as 'nowrap',
        width: drawerWidth,
    },
    drawerPaperClose: {
        overflowX: 'hidden' as 'hidden',
        transition: transitions.create('width', {
            duration: transitions.duration.leavingScreen,
            easing: transitions.easing.sharp,
        }),
        width: spacing.unit * 7,
        [breakpoints.up('sm')]: {
            width: spacing.unit * 9,
        },
    },
    responsiveDrawerPaper: {
        width: drawerWidth,
        [breakpoints.up('md')]: {
            position: 'relative' as 'relative',
        },
    },
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...mixins.toolbar,
    },
    toolbarLogo: {
        width: 160,
    }
}))

interface IProps {
    open: boolean
    onCloseClick: () => void
}

const AppDrawer = decorate<IProps>(({ classes, theme, open, onCloseClick }) => (
    <div>
        <Hidden mdUp={true}>
            <Drawer
                variant='temporary'
                anchor={theme && theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
                onClose={onCloseClick}
                classes={{
                    paper: classes.responsiveDrawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div>
                    <div className={classes.toolbar}>
                        <img src={logo} className={classes.toolbarLogo} />
                    </div>
                    <Divider />
                    <List>{
                        drawerItems.map((item) => (
                            <Link
                                to={item.link}
                                key={item.label}
                                style={ item.disabled ?
                                    { ...disabledLink, textDecoration: 'none' } :
                                    { textDecoration: 'none' } }
                            >
                                <ListItem
                                    button={true}
                                    disabled={item.disabled}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            </Link>
                        ))
                    }</List>
                </div>
            </Drawer>
        </Hidden>
        <Hidden smDown={true}>
            <Drawer
                variant='permanent'
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <img src={logo} className={classes.toolbarLogo} />
                    <IconButton onClick={onCloseClick}>
                        {theme && theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>{
                    drawerItems.map((item) => (
                        <Link
                            to={item.link}
                            key={item.label}
                            style={ item.disabled ?
                                { ...disabledLink, textDecoration: 'none' } :
                                { textDecoration: 'none' } }

                        >
                            <ListItem
                                button={true}
                                disabled={item.disabled}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        </Link>
                    ))
                }</List>
            </Drawer>
        </Hidden>
    </div>
))

export default AppDrawer