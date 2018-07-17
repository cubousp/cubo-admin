import * as React from 'react'
import ActivityInscriptionsList from './ActivityInscriptionsList'
import ActivityInscriptionsStats from './ActivityInscriptionsStats'

interface IProps {
    activity
}

const ActivityInscriptions = ({ activity }: IProps) => (
    <div style={{ position: 'relative' }}>
        <ActivityInscriptionsList
            inscriptions={activity.enrolled}
        />
        <ActivityInscriptionsStats/>
    </div>
)

export default ActivityInscriptions