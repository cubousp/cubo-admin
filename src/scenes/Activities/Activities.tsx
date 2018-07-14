import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import Query from 'react-apollo/Query'
import { getActivities } from '../../repositories/activities'
import ActivitiesList from './ActivitiesList'
import AddActivity from './AddActivity'

class Activities extends React.Component {
    public state = {
        openAddActivityDialog: true
    }

    constructor(props: any) {
        super(props)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleCloseAddDialog = this.handleCloseAddDialog.bind(this)
    }

    public handleAddClick = () => {
        this.setState({
            openAddActivityDialog: true
        })
    }

    public handleCloseAddDialog = () => {
        this.setState({
            openAddActivityDialog: false
        })
    }

    public render() {
        return (
            <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 64px)', margin: -24 }}>
                <Query
                    query={getActivities}
                    pollInterval={500}
                >
                    {({loading, error, data}) => {
                        if (loading) { return <CircularProgress/> }
                        if (error) { return `Error! ${error.message}` }
                        return (
                            <div>
                                <ActivitiesList activities={data.eventSchedule}/>
                                <Button
                                    variant='fab'
                                    color='secondary'
                                    aria-label='add'
                                    style={{ position: 'absolute', bottom: 64, right: 64 }}
                                >
                                    <AddIcon onClick={this.handleAddClick} />
                                </Button>
                            </div>
                        )
                    }}
                </Query>
                <AddActivity
                    open={this.state.openAddActivityDialog}
                    handleClose={this.handleCloseAddDialog}
                />
            </div>
        )
    }
}
export default Activities