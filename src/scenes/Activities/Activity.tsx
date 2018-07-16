import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import Query from 'react-apollo/Query'
import SwipeableViews from 'react-swipeable-views'
import { GET_ACTIVITY } from '../../repositories/activities'
import ActivityAbout from './ActivityAbout'
import ActivityAttendanceControl from './ActivityAttendanceControl'
import ActivityInscriptions from './ActivityInscriptions'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
    },
    loadingContainer: {
        minHeight: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: '56px !important',
        height: '56px !important'
    }
})

class Activity extends React.Component<WithStyles<'root' | 'loadingContainer' | 'loading'>> {
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
                <Query query={GET_ACTIVITY} variables={{ id: (this.props as any).match.params.id }} pollInterval={500}>
                    {({ loading, error, data: { activity } }) => {
                        if (loading) { return <div className={classes.loadingContainer}><CircularProgress className={classes.loading}/></div> }
                        if (error) { return `Error! ${error.message}` }
                        return (
                            <SwipeableViews
                                axis={'x-reverse'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                    <ActivityAbout activity={activity}/>
                                    <ActivityInscriptions/>
                                    <ActivityAttendanceControl/>
                            </SwipeableViews>
                        )
                    }}
                    </Query>
            </div>
        )
    }
}

export default withStyles(styles)(Activity)

