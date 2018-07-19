import * as React from 'react'
import ActivityAttendanceList from './ActivityAttendanceList'
import ActivityAttendanceStats from './ActivityAttendanceStats'

interface IProps {
    activity
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
        const { activity } = this.props
        return (
            <div style={{ position: 'relative', height: 'calc(100vh - 116px)', overflowY: 'hidden', marginTop: 4 }}>
                <ActivityAttendanceList
                    inscriptions={activity.enrolled}
                />
                <ActivityAttendanceStats attended={this.getCountByStatus('ATTENDED')} missed={this.getCountByStatus('MISSED')} confirmed={this.getCountByStatus('CONFIRMED')} />
            </div>
        )
    }
}

export default ActivityAttendance