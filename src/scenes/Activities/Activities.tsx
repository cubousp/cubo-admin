import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import Query from 'react-apollo/Query'
import { getActivities } from '../../repositories/activities'
import ActivitiesList from './ActivitiesList'

const Activities = () => (
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
                            <AddIcon />
                        </Button>
                    </div>
                )
            }}
        </Query>
    </div>
)

export default Activities