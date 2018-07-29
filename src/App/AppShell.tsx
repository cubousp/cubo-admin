/* tslint:disable member-ordering */
import { WithStyles, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import AppBar from './AppBar'
import AppContent from './AppContent'
import AppDrawer from './AppDrawer/AppDrawer'
import AppTitleContext from './AppTitleContext'

const decorate = withStyles(() => ({
    appShell: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative' as 'relative',
        zIndex: 1,
    },
}))

const AppShell = decorate(
    class extends React.Component<WithStyles<'appShell'>> {
        public updateTitle = (newTitle: string) => {
            this.setState({
                appTitle: {
                    ...this.state.appTitle,
                    title: newTitle,
                }
            })
        }

        public state = {
            open: true,
            appTitle: {
                title: '',
                updateTitle: this.updateTitle
            }
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
                <AppTitleContext.Provider value={this.state.appTitle as any}>
                    <div className={classes.appShell}>
                        <AppBar
                            open={this.state.open}
                            onMenuClick={this.handleDrawerOpen}
                        />
                        <AppDrawer
                            open={this.state.open}
                            onCloseClick={this.handleDrawerClose}
                        />
                        <AppContent>
                            {this.props.children}
                        </AppContent>
                    </div>
                </AppTitleContext.Provider>
            )
        }
    },
)

export default AppShell