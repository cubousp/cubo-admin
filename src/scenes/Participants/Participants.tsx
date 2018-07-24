import * as React from 'react'
import { CircularProgress } from '../../../node_modules/@material-ui/core'
import Query from '../../../node_modules/react-apollo/Query'
import { PARTICIPANTS } from '../../repositories/participants'
import ParticipantsList from './ParticipantsList'

const Participants = () => (
    <div>
        <Query
            query = {PARTICIPANTS}>
            {({loading, error, data}) => {
                if (loading) { return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress style={{ width: 56, height: 56}}/></div> }
                if (error) { return `Error! ${error.message}` }
                return (
                    <div>
                        <ParticipantsList
                           participants = {data.participants.participants}/>
                    </div>
                )
            }}

        </Query>
    </div>
)

export default Participants