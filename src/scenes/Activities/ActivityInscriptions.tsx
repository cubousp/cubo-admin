import Button from '@material-ui/core/Button/Button'
import { Add } from '@material-ui/icons'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import { ENROLL_PARTICIPANT } from '../../repositories/participants'
import ActivityInscriptionsAdd from './ActivityInscriptionsAdd'
import ActivityInscriptionsList from './ActivityInscriptionsList'
import ActivityInscriptionsStats from './ActivityInscriptionsStats'

interface IProps {
    activity
}

class ActivityInscriptions extends React.Component<IProps> {
    public state = {
        openActivityInscriptionsAdd: false,
        savingParticipant: false
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

    public handleAddInscriptionSave = async(enrollParticipant, participant) => {
        try {
            this.setState({
                savingParticipant: true,
            })
            await enrollParticipant({ variables: { activityId: this.props.activity.id, participantId: participant.id }})
        } catch (err) {
            console.log('err', err)
        }
        this.setState({
            savingParticipant: false,
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
                <Mutation mutation={ENROLL_PARTICIPANT} >
                    {(enrollParticipant) => (
                        <ActivityInscriptionsAdd
                            open={this.state.openActivityInscriptionsAdd}
                            handleClose={this.handleAddInscriptionClose}
                            handleSave={(participant) => this.handleAddInscriptionSave(enrollParticipant, participant)}
                        />
                    )}
                </Mutation>
            </div>
        )
    }
}

export default ActivityInscriptions