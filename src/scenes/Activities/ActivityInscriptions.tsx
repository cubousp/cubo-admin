import Button from '@material-ui/core/Button/Button'
import { Add } from '@material-ui/icons'
import * as React from 'react'
import ActivityInscriptionsAdd from './ActivityInscriptionsAdd'
import ActivityInscriptionsList from './ActivityInscriptionsList'
import ActivityInscriptionsStats from './ActivityInscriptionsStats'

interface IProps {
    activity
}

class ActivityInscriptions extends React.Component<IProps> {
    public state = {
        openActivityInscriptionsAdd: false
    }

    public handleAddInscriptionClick = () => {
        this.setState({
            openActivityInscriptionsAdd: true
        })
    }

    public handleAddInscriptionClose = () => {
        this.setState({
            openActivityInscriptionsAdd: false
        })
    }

    public render() {
        const { activity } = this.props
        return (
            <div style={{ position: 'relative', height: 'calc(100vh - 116px)' }}>
                <ActivityInscriptionsList
                    inscriptions={activity.enrolled}
                />
                <ActivityInscriptionsStats available={activity.vacancies.available} enrolled={activity.vacancies.total - activity.vacancies.available} />
                <Button
                    variant='fab'
                    color='secondary'
                    aria-label='add'
                    onClick={this.handleAddInscriptionClick}
                    style={{ position: 'absolute', bottom: 64, right: 364 }}
                >
                    <Add/>
                </Button>
                <ActivityInscriptionsAdd
                    open={this.state.openActivityInscriptionsAdd}
                    handleClose={this.handleAddInscriptionClose}
                />
            </div>
        )
    }
}

export default ActivityInscriptions