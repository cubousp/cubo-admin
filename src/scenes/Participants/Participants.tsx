import Button from '@material-ui/core/Button/Button'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import { CircularProgress } from '../../../node_modules/@material-ui/core'
import Query from '../../../node_modules/react-apollo/Query'
import { PARTICIPANTS } from '../../repositories/participants'
import ParticipantsList from './ParticipantsList'
import ParticipantsSignUp from './ParticipantsSignUp'

class Participants extends React.Component {
    public state = {
        openParticipantSignUpDialog: false,
        openSnackbar: false,
        resetForm: false,
        savingParticipant: false,
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
        // try {
        //     this.setState({
        //         savingActivity: true
        //     })
        //     await createParticipant({ variables: { participant: this.mapToInput(newParticipant) } })
        //     this.setState({
        //         openParticipantSignUpDialog: false,
        //         resetForm: true,
        //         openSnackbar: true,
        //     })
        // } catch (err) {
        //     console.log('err', err)
        // }
        // this.setState({
        //     savingActivity: false
        // })
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
                                   participants = {data.participants.participants}/>
                                <Button
                                    variant='fab'
                                    color='secondary'
                                    aria-label='add'
                                    style={{ position: 'absolute', bottom: 64, right: 64 }}
                                    onClick={this.handleAddClick}
                                >
                                    <AddIcon/>
                                </Button>
                            </div>
                        )
                    }}
                </Query>
                <ParticipantsSignUp
                    open={this.state.openParticipantSignUpDialog}
                    handleClose={this.handleCloseAddDialog}
                    handleSave={(newParticipant) => this.handleSaveNewParticipant(undefined, newParticipant)}
                    // handleResetForm={this.handleResetForm}
                    // resetForm={this.state.resetForm}
                    saving={this.state.savingParticipant}                    
                />
            </div>
        )
    }
}

export default Participants