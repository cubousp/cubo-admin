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
        <ActivityInscriptionsStats available={activity.vacancies.available} enrolled={activity.vacancies.total - activity.vacancies.available} />
    </div>
)

export default ActivityInscriptions