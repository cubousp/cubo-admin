import Button from '@material-ui/core/Button/Button'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import { CircularProgress, Portal } from '../../../node_modules/@material-ui/core'
import Query from '../../../node_modules/react-apollo/Query'
import Dialog from '../../components/Dialog'
import Snackbar from '../../components/Snackbar'
import { CREATE_PARTICIPANT, PARTICIPANTS } from '../../repositories/participants'
import ParticipantsList from './ParticipantsList'
import ParticipantsSignUp from './ParticipantsSignUp'

class Participants extends React.Component {
    public state = {
        openParticipantSignUpDialog: false,
        openSnackbar: false,
        resetForm: false,
        savingParticipant: false,
        newParticipant: undefined,
        participants: new Array<any>(),
        showSaveError: false,
        saveErrorMessage: undefined,
    }

    public closeErrorDialog = () => {
        this.setState({
            showSaveError: false,
        })
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false,
        })
    }

    public handleCloseAddDialog = () => {
        this.setState({
            openParticipantSignUpDialog: false
        })
    }

    public handleResetForm = () => {
        this.setState({
            resetForm: false
        })
    }

    public handleAddClick = () => {
        this.setState({
            openParticipantSignUpDialog: true
        })
    }

    public handleSaveNewParticipant = async(createParticipant: any, newParticipant: any) => {
        try {
            this.setState({
                savingActivity: true
            })
            await createParticipant({ variables: { input: this.mapToInput(newParticipant) } })

            this.setState({
                openParticipantSignUpDialog: false,
                resetForm: true,
                openSnackbar: true,
                newParticipant,
            })
        } catch (err) {
            const saveErrorMessage = 'Houve um erro inesperado. Tente novamente mais tarde.'
            this.setState({
                showSaveError: true,
                saveErrorMessage,
            })
        }
        this.setState({
            savingActivity: false
        })
    }

    public mapToInput = (participant) => ({
        ...participant,
    })

    public render() {
        return (
            <div>
                <Query
                    query = {PARTICIPANTS} variables={{limit: 1000}}>
                    {({loading, error, data}) => {
                        if (loading) { return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress style={{ width: 56, height: 56}}/></div> }
                        if (error) { return `Error! ${error.message}` }

                        return (
                            <div>
                               <ParticipantsList
                                       participants = {data.participants.participants}
                                       openSnackbar = {this.state.openSnackbar}/>
                                    <Button
                                        variant='fab'
                                        color='secondary'
                                        aria-label='add'
                                        style={{ position: 'absolute', bottom: 64, right: 64 }}
                                        onClick={this.handleAddClick}>
                                        <AddIcon/>
                                    </Button>
                            </div>
                        )
                        }}
                </Query>
                <Mutation mutation={CREATE_PARTICIPANT}>
                {(createParticipant) => (
                    <div>
                        <ParticipantsSignUp
                            open={this.state.openParticipantSignUpDialog}
                            handleClose={this.handleCloseAddDialog}
                            handleSave={(newParticipant) => this.handleSaveNewParticipant(createParticipant, newParticipant)}
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
                        <Portal>
                            <Snackbar
                                open={this.state.openSnackbar}
                                onClose={this.handleCloseSnackbar}
                                message={'Usuário cadastrado com sucesso'}
                                variant={'success'}
                                absolute={true}
                            />
                        </Portal>
                    </div>
                )}
                </Mutation>

            </div>
        )
    }
}

export default Participants