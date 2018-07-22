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
    public render() {
        const { activity, container, activeTab } = this.props
        if (activeTab !== TABS.ATTENDANCE) {
            return null
        }
        return (
            <div style={{ minHeight: 'calc(100vh - 116px)', overflowY: 'hidden', marginTop: 4 }}>
                <ActivityAttendanceList
                    inscriptions={activity.enrolled}
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