import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import * as React from 'react'
import ParticipantSignUpForms from './ParticipantsSingUpForms'

interface IProps {
    open: boolean
    handleClose: () => void
    handleSave: (participant) => void
    saving: boolean
}

class ParticipantsSignUp extends React.Component<IProps> {
    public state = {
        newParticipant: {
            id: undefined,
            name: '',
            email: '',
            kind: '',
            authId: '',
        },
        lastInvalidErrorEmail: undefined,
        showError: false
    }

    public handleChange = (name: string) => (event: any) => {
        this.setState({
            newParticipant: {
                ...this.state.newParticipant,
                [name]: event.target.value,
            }
        })
    }

    public handleParticipantChange = (participant) => {
        this.setState({participant})
    }

    public handleSave = async () => {
        if (!this.state.newParticipant.email) {
            return
        }

        this.state.newParticipant.authId = this.state.newParticipant.email

        // this.setState({
        //     newParticipant: {
        //         ...this.state.newParticipant,
        //         authId: this.state.newParticipant.email,
        //     }
        // })
        console.log(this.state.newParticipant)
        await this.props.handleSave(this.state.newParticipant)
        this.setState({
            newParticipant: {
                id: undefined,                
                name: '',
                email: '',
                kind: '',
                authId: '',
            }
        })
    }

    public render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>Cadastrar participante</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Escreva as informações necessárias para o cadastro do participante.
                    </DialogContentText>
                    <div style={{marginTop: 32}}>
                        <ParticipantSignUpForms 
                              showError={this.state.showError}
                              handleChange={this.handleChange}
                              participantModel={this.state.newParticipant}
                              validState={this.state.newParticipant.name !== undefined && this.state.newParticipant.name.trim().length !== 0}/>
                    </div>
                </DialogContent>
                {
                    this.props.saving ? <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 32 }}><CircularProgress/></div> :
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color='secondary'>
                                Cancelar
                            </Button>
                            <Button onClick={this.handleSave} color='primary'>
                                Cadastrar
                            </Button>
                        </DialogActions>
                }

            </Dialog>
        )
    }
}

export default ParticipantsSignUp