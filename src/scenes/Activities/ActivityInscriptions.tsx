import Button from '@material-ui/core/Button/Button'
import { Add } from '@material-ui/icons'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import Dialog from '../../components/Dialog'
import Snackbar from '../../components/Snackbar'
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
        savingParticipant: false,
        showSaveError: false,
        saveErrorMessage: undefined,
        openSnackbar: false
    }

    public ERROR_MESSAGE = {
        NoAvailableVacancies: 'Não há vagas disponíveis para essa atividade',
        ItemAlreadyExists: 'Participante já inscrito nessa atividade'
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
            this.setState({
                openSnackbar: true
            })
        } catch (err) {
            const saveErrorMessage = (err.graphQLErrors && err.graphQLErrors.length) ? this.ERROR_MESSAGE[err.graphQLErrors[0].code] : 'Houve um erro inesperado. Tente novamente mais tarde.'
            this.setState({
                showSaveError: true,
                saveErrorMessage,
            })
        }
        this.setState({
            savingParticipant: false,
            openActivityInscriptionsAdd: false
        })
    }

    public closeErrorDialog = () => {
        this.setState({
            showSaveError: false,
            saveErrorMessage: undefined
        })
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
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
                        <div>
                            <ActivityInscriptionsAdd
                                open={this.state.openActivityInscriptionsAdd}
                                handleClose={this.handleAddInscriptionClose}
                                handleSave={(participant) => this.handleAddInscriptionSave(enrollParticipant, participant)}
                                saving={this.state.savingParticipant}
                            />
                            <Dialog
                                open={this.state.showSaveError}
                                isLoading={false}
                                onConfirm={this.closeErrorDialog}
                                disableCancelButton={true}
                                title={'Não foi possível salvar a inscrição'}
                                text={this.state.saveErrorMessage}
                            />
                            <Snackbar
                                open={this.state.openSnackbar}
                                onClose={this.handleCloseSnackbar}
                                message={'Participante inscrito com sucesso'}
                                variant={'success'}
                                absolute={true}
                            />
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default ActivityInscriptions