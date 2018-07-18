import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import * as React from 'react'
import ActivityInscriptionsAutoSuggest from './ActivityInscriptionsAutoSuggest'

interface IProps {
    open: boolean
    handleClose: () => void
    handleSave: (participant) => void
}

class ActivityInscriptionsAdd extends React.Component<IProps> {
    public state = {
        participant: {
            email: '',
            id: undefined,
        },
    }

    public handleParticipantChange = (participant) => {
        this.setState({participant})
    }

    public handleSave = async () => {
        this.props.handleSave(this.state.participant)
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
                        <ActivityInscriptionsAutoSuggest participant={this.state.participant}
                                                         handleChange={this.handleParticipantChange}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color='secondary'>
                        Cancelar
                    </Button>
                    <Button onClick={this.handleSave} color='primary'>
                        Inscrever
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ActivityInscriptionsAdd