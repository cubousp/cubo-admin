import Button from '@material-ui/core/Button/Button'
import Fade from '@material-ui/core/Fade/Fade'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom/Zoom'
import { Edit } from '@material-ui/icons'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import BottomActionBar from '../../components/BottomActionBar'
import Snackbar from '../../components/Snackbar'
import { UPDATE_ACTIVITY } from '../../repositories/activities'
import ActivityForm from './ActivityForm'

const styles = () => ({
    container: {
        height: 'calc(100vh - 148px)',
    },
    bottomActionBar: {
        position: 'absolute' as any,
        left: 0 as any,
        right: 0 as any,
        bottom: 0 as any,
    }
})

interface IProps {
    activity: any
}

class ActivityAbout extends React.Component<IProps & WithStyles<'container' | 'bottomActionBar'>> {
    public state = {
        activity: Object.assign({}, { ...this.props.activity, startsAt: new Date(this.props.activity.startsAt), endsAt: new Date(this.props.activity.endsAt), inscriptionBeginsAt: new Date(this.props.activity.inscriptionBeginsAt), inscriptionEndsAt: new Date(this.props.activity.inscriptionEndsAt), speakerName: this.props.activity.speaker && this.props.activity.speaker.name, speakerDescription: this.props.activity.speaker && this.props.activity.speaker.description }),
        showError: false,
        savingActivity: false,
        resetForm: false,
        disableEdition: true,
        openSnackbar: false,
    }

    public handleSave = () => {
        console.log('save')
    }

    public handleChange = (name: string) => (event: any) => {
        this.setState({
            activity: {
                ...this.state.activity,
                [name]: event.target.value,
            },
        })
    }

    public handleChangeDate = (name: string) => (value: Date) => {
        this.setState({
            activity: {
                ...this.state.activity,
                [name]: value,
            },
        })
    }

    public handleCheckedChange = (name: string) => (event: any) => {
        this.setState({
            activity: {
                ...this.state.activity,
                [name]: event.target.checked,
            },
        })
    }

    public validateAndSave = () => {
        const validState = this.state.activity.title !== undefined && this.state.activity.title.trim().length !== 0
        if (!validState) {
            this.setState({
                showError: true,
            })
            return
        }
        this.handleSave()
    }

    public handleEditClick = () => {
        this.setState({
            disableEdition: false,
        })
    }

    public handleSaveClick = (updateActivity) => async() => {
        try {
            await updateActivity()
            this.setState({
                disableEdition: true,
                openSnackbar: true
            })
        } catch (err) {
            console.log('err', err)
        }
    }

    public handleCancelClick = () => {
        this.setState({
            activity: Object.assign({}, { ...this.props.activity, startsAt: new Date(this.props.activity.startsAt), endsAt: new Date(this.props.activity.endsAt), inscriptionBeginsAt: new Date(this.props.activity.inscriptionBeginsAt), inscriptionEndsAt: new Date(this.props.activity.inscriptionEndsAt), speakerName: this.props.activity.speaker && this.props.activity.speaker.name, speakerDescription: this.props.activity.speaker && this.props.activity.speaker.description, totalVacancies: this.props.activity.vacancies.total }),
            disableEdition: true,
        })
    }

    public render() {
        const {classes} = this.props
        return (
            <Mutation mutation={UPDATE_ACTIVITY} variables={{ id: this.props.activity.id, input: this.mapToInput(this.state.activity)}}>
                {(updateActivity) => {
                    return (
                        <div className={classes.container}>
                            <ActivityForm
                                disabled={this.state.disableEdition}
                                showHint={false}
                                showError={this.state.showError}
                                handleChange={this.handleChange}
                                handleChangeDate={this.handleChangeDate}
                                handleCheckedChange={this.handleCheckedChange}
                                activityModel={this.state.activity}
                                validState={this.state.activity.title !== undefined && this.state.activity.title.trim().length !== 0}
                            />
                            <Zoom in={this.state.disableEdition}>
                                <Button
                                    variant='fab'
                                    color='secondary'
                                    aria-label='add'
                                    style={{position: 'absolute', bottom: 64, right: 64}}
                                    onClick={this.handleEditClick}
                                >
                                    <Edit/>
                                </Button>
                            </Zoom>
                            <Fade in={!this.state.disableEdition}>
                                <div className={classes.bottomActionBar}>
                                    <BottomActionBar
                                        onSaveClick={this.handleSaveClick(updateActivity)}
                                        onCancelClick={this.handleCancelClick}
                                    />
                                </div>
                            </Fade>
                            <Snackbar
                                open={this.state.openSnackbar}
                                onClose={this.handleCloseSnackbar}
                                message={'Atividade atualizada com sucesso'}
                                variant={'success'}
                            />
                        </div>
                    )
                }}
            </Mutation>
        )
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
        })
    }

    private mapToInput = (activity) => ({
        ...activity,
        speakerName: undefined,
        speakerDescription: undefined,
        speaker: activity.speakerName ? {
            name: activity.speakerName,
            description: activity.speakerDescription
        } : undefined,
        startsAt: activity.startsAt && activity.startsAt.toISOString(),
        endsAt: activity.endsAt && activity.endsAt.toISOString(),
        inscriptionBeginsAt: activity.inscriptionBeginsAt && activity.inscriptionBeginsAt.toISOString(),
        inscriptionEndsAt: activity.inscriptionEndsAt && activity.inscriptionEndsAt.toISOString(),
        vacancies: undefined,
        __typename: undefined,
        id: undefined,
        enrolled: undefined,
    })
}

export default withStyles(styles)(ActivityAbout)