import { WithStyles, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import AppBar from './AppBar'
import AppContent from './AppContent'
import AppDrawer from './AppDrawer/AppDrawer'
import { pagesTitle } from './pagesTitle'

const decorate = withStyles(() => ({
    appShell: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative' as 'relative',
        zIndex: 1
    },
}))

const AppShell = decorate(
    class extends React.Component<WithStyles<'appShell'>> {
        public state = {
            open: true,
        }

        public handleDrawerOpen = () => {
            this.setState({ open: true })
        }

        public handleDrawerClose = () => {
            this.setState({ open: false })
        }

        public render() {
            const { classes } = this.props

            return (
                <div className={classes.appShell}>
                    <AppBar
                        open={this.state.open}
                        onMenuClick={this.handleDrawerOpen}
                        title={this.getTitleFromLocation()}
                    />
                    <AppDrawer
                        open={this.state.open}
                        onCloseClick={this.handleDrawerClose}
                    />
                    <AppContent>
                        {this.props.children}
                    </AppContent>
                </div>
            )
        }

        private getTitleFromLocation() {
            const found = pagesTitle.find((pageTitle) => {
                return (this.props as any).location.pathname.match(pageTitle.pattern) !== null
            })
            return found ? found.title : ''
        }
    }
)

export default AppShell