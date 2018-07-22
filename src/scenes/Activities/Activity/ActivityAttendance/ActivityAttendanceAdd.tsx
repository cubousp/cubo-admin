import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import ActivityAttendanceAutoSuggest from './ActivityAttendanceAutoSuggest'

interface IProps {
    open: boolean
    handleClose: () => void
    handleSave: (participant) => void
    saving: boolean
}

const InvalidParticipantError = () => (
    <div>
        <Typography variant={'body1'} color={'secondary'}>
            Participante não encontrado. Por favor digite um e-mail válido.
        </Typography>
    </div>
)

class ActivityAttendance extends React.Component<IProps> {
    public state = {
        participant: {
            email: '',
            id: undefined,
        },
        lastInvalidErrorEmail: undefined,
    }

    public handleParticipantChange = (participant) => {
        this.setState({participant})
    }

    public handleSave = async () => {
        if (!this.state.participant.id) {
            this.setState({
                lastInvalidErrorEmail: this.state.participant.email,
            })
            return
        }
        await this.props.handleSave(this.state.participant)
        this.setState({
            participant: {
                email: '',
                id: undefined
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
                <DialogTitle id='form-dialog-title'>Inscrever participante</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecione o participante. Você pode encontrá-lo pesquisando pelo email.
                    </DialogContentText>
                    <div style={{marginTop: 32}}>
                        <ActivityAttendanceAutoSuggest
                            participant={this.state.participant}
                            handleChange={this.handleParticipantChange}
                        />
                        {
                            this.state.lastInvalidErrorEmail === this.state.participant.email &&
                            <InvalidParticipantError/>
                        }
                    </div>
                </DialogContent>
                {
                    this.props.saving ? <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 32 }}><CircularProgress/></div> :
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color='secondary'>
                                Cancelar
                            </Button>
                            <Button onClick={this.handleSave} color='primary'>
                                Inscrever
                            </Button>
                        </DialogActions>
                }

            </Dialog>
        )
    }
}

export default ActivityAttendance