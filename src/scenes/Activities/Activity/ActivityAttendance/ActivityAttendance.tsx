import Portal from '@material-ui/core/Portal/Portal'
import * as React from 'react'
import { TABS } from '../Activity'
import ActivityAttendanceList from './ActivityAttendanceList'
import ActivityAttendanceStats from './ActivityAttendanceStats'

interface IProps {
    activity,
    container,
    activeTab: TABS
}

class ActivityAttendance extends React.Component<IProps> {
    public state = {
        openActivityInscriptionsAdd: false,
        savingParticipant: false,
        showSaveError: false,
        saveErrorMessage: undefined,
        openSnackbar: false
    }

    public getCountByStatus = (status) => {
        return this.props.activity.enrolled.filter((inscription) => inscription.status === status).length
    }

    public orderInscriptionsByName = () => {
        const newArray = this.props.activity.enrolled.map(a => ({...a}))
        return newArray.sort(({ participant: { name: a }}, { participant: { name: b} }) => {
            if (a < b ) { return -1 }
            if (a > b ) { return 1 }
            return 0
        })
    }

    public render() {
        const { container, activeTab } = this.props
        if (activeTab !== TABS.ATTENDANCE) {
            return null
        }
        return (
            <div style={{ minHeight: 'calc(100vh - 116px)', overflowY: 'hidden', marginTop: 4 }}>
                <ActivityAttendanceList
                    inscriptions={this.orderInscriptionsByName()}
                />
                <Portal container={container}>
                    <ActivityAttendanceStats
                        attended={this.getCountByStatus('ATTENDED')}
                        missed={this.getCountByStatus('MISSED')}
                        confirmed={this.getCountByStatus('CONFIRMED')}
                    />
                </Portal>
            </div>
        )
    }
}

export default ActivityAttendance