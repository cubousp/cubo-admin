import AppBar from '@material-ui/core/AppBar'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import ActivityAbout from './ActivityAbout'
import ActivityAttendanceControl from './ActivityAttendanceControl'
import ActivityInscriptions from './ActivityInscriptions'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
    },
})

class Activity extends React.Component<WithStyles<'root'>> {
    public state = {
        value: 0,
    }

    public handleChange = (event, value) => {
        this.setState({ value })
    }

    public handleChangeIndex = index => {
        this.setState({ value: index })
    }

    public render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position='static' color='default'>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        fullWidth={true}
                    >
                        <Tab label='Sobre' />
                        <Tab label='Inscrições' />
                        <Tab label='Controle de presença' />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={'x-reverse'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <ActivityAbout/>
                    <ActivityInscriptions/>
                    <ActivityAttendanceControl/>
                </SwipeableViews>
            </div>
        )
    }
}

export default withStyles(styles)(Activity)

