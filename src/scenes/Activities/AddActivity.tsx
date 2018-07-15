import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import AddActivityForm from './AddActivityForm'

const styles = () => ({
    appBar: {
        position: 'relative' as any,
    },
    flex: {
        flex: 1,
    },
})

interface IProps {
    handleClose: () => void
    handleSave: (newActivity: any) => void
    open: boolean
}

const Transition = (props: any) => {
    return <Slide direction='up' {...props} />
}

class AddActivity extends React.Component<IProps & WithStyles<'appBar' | 'flex'>> {
    public state = {
        newActivity: {
            title: '',
            startsAt: new Date(2018, 8, 17, 10, 0, 0, 0),
            endsAt: new Date(2018, 8, 17, 11, 0, 0, 0),
            kind: 'LECTURE',
            shortDescription: undefined,
            longDescription: undefined,
            internalComment: undefined,
            speakerName: undefined,
            speakerDescription: undefined,
            inscriptionBeginsAt: new Date(2018, 7, 20, 20, 0, 0, 0),
            inscriptionEndsAt: new Date(2018, 8,16 , 23, 59, 59, 0),
            totalVacancies: undefined,
        },
        showError: false
    }

    public handleChange = (name: string) => (event: any) => {
        this.setState({
            newActivity: {
                ...this.state.newActivity,
                [name]: event.target.value,
            }
        })
    }

    public handleChangeDate = (name: string) => (value: Date) => {
        this.setState({
            newActivity: {
                ...this.state.newActivity,
                [name]: value,
            }
        })
    }

    public validateAndSave = () => {
        const validState = this.state.newActivity.title !== undefined && this.state.newActivity.title.trim().length !== 0
        if (!validState) {
            this.setState({
                showError: true
            })
            return
        }
        this.props.handleSave(this.state.newActivity)
    }

    public render() {
        const { classes, handleClose, open } = this.props
        return (
            <Dialog
                fullScreen={true}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color='inherit' onClick={handleClose} aria-label='Close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='title' color='inherit' className={classes.flex}>
                            Nova atividade
                        </Typography>
                        <Button color='inherit' onClick={this.validateAndSave}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <AddActivityForm
                    showError={this.state.showError}
                    handleChange={this.handleChange}
                    handleChangeDate={this.handleChangeDate}
                    newActivity={this.state.newActivity}
                    validState={this.state.newActivity.title !== undefined && this.state.newActivity.title.trim().length !== 0}
                />
            </Dialog>
        )
    }
}

export default withStyles(styles)(AddActivity)