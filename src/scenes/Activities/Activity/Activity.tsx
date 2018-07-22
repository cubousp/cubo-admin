import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import Query from 'react-apollo/Query'
import SwipeableViews from 'react-swipeable-views'
import { GET_ACTIVITY } from '../../../repositories/activities'
import ActivityAbout from './ActivityAbout/ActivityAbout'
import ActivityAttendance from './ActivityAttendance/ActivityAttendance'
import ActivityInscriptions from './ActivityInscriptions/ActivityInscriptions'

export enum TABS {
    ABOUT = 0,
    INSCRIPTIONS = 1,
    ATTENDANCE = 2
}

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
        alignItems: 'center',
    },
    loading: {
        width: '56px !important',
        height: '56px !important',
    },
})

class Activity extends React.Component<WithStyles<'root' | 'loadingContainer' | 'loading'>> {
    public container: any = null

    public state = {
        value: TABS.ABOUT,
    }

    public handleChange = (event, value) => {
        this.setState({value})
    }

    public handleChangeIndex = index => {
        this.setState({value: index})
    }

    public render() {
        const {classes} = this.props

        return (
            <div className={classes.root}>
                <AppBar position='static' color='default' elevation={2}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        fullWidth={true}
                    >
                        <Tab label='Sobre'/>
                        <Tab label='Inscrições'/>
                        <Tab label='Controle de presença'/>
                    </Tabs>
                </AppBar>
                <Query query={GET_ACTIVITY} variables={{id: (this.props as any).match.params.id}} pollInterval={500}>
                    {({loading, error, data: {activity}}) => {
                        if (loading) {
                            return <div className={classes.loadingContainer}><CircularProgress
                                className={classes.loading}/></div>
                        }
                        if (error) {
                            return `Error! ${error.message}`
                        }
                        return (
                            <SwipeableViews
                                axis={'x-reverse'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                <ActivityAbout activity={activity} container={this.container} activeTab={this.state.value}/>
                                <ActivityInscriptions activity={activity} container={this.container} activeTab={this.state.value}/>
                                <ActivityAttendance activity={activity} container={this.container} activeTab={this.state.value}/>
                            </SwipeableViews>
                        )
                    }}
                </Query>
                <div
                    ref={node => {
                        this.container = node
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Activity)

