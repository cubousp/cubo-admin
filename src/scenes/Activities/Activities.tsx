import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import Query from 'react-apollo/Query'
import Snackbar from '../../components/Snackbar'
import { CREATE_ACTIVITY, GET_ACTIVITIES } from '../../repositories/activities'
import ActivitiesList from './ActivitiesList'
import AddActivity from './AddActivity'

class Activities extends React.Component {
    public state = {
        openAddActivityDialog: false,
        showError: false,
        resetForm: false,
        savingActivity: false,
        openSnackbar: false,
    }

    constructor(props: any) {
        super(props)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleCloseAddDialog = this.handleCloseAddDialog.bind(this)
    }

    public handleAddClick = () => {
        this.setState({
            openAddActivityDialog: true
        })
    }

    public handleCloseAddDialog = () => {
        this.setState({
            openAddActivityDialog: false
        })
    }

    public handleSaveNewActivity = async(createActivity: any, newActivity: any) => {
        try {
            this.setState({
                savingActivity: true
            })
            await createActivity({ variables: { activity: this.mapToInput(newActivity) } })
            this.setState({
                openAddActivityDialog: false,
                resetForm: true,
                openSnackbar: true,
            })
        } catch (err) {
            console.log('err', err)
        }
        this.setState({
            savingActivity: false
        })
    }

    public handleResetForm = () => {
        this.setState({
            resetForm: false
        })
    }

    public mapToInput = (newActivity) => ({
        ...newActivity,
        speakerName: undefined,
        speakerDescription: undefined,
        speaker: newActivity.speakerName ? {
            name: newActivity.speakerName,
            description: newActivity.speakerDescription
        } : undefined,
        startsAt: newActivity.startsAt.toISOString(),
        endsAt: newActivity.endsAt.toISOString(),
        inscriptionBeginsAt: newActivity.inscriptionBeginsAt && newActivity.inscriptionBeginsAt.toISOString(),
        inscriptionEndsAt: newActivity.inscriptionEndsAt && newActivity.inscriptionEndsAt.toISOString()
    })

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
        })
    }

    public render() {
        return (
            <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 64px)'}}>
                <Query
                    query={GET_ACTIVITIES}
                    pollInterval={500}
                >
                    {({loading, error, data}) => {
                        if (loading) { return <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress style={{ width: 56, height: 56}}/></div> }
                        if (error) { return `Error! ${error.message}` }
                        return (
                            <div>
                                <ActivitiesList activities={data.eventSchedule}/>
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
                <Mutation mutation={CREATE_ACTIVITY}>
                    {(createActivity) => (
                        <div>
                            <AddActivity
                                open={this.state.openAddActivityDialog}
                                handleClose={this.handleCloseAddDialog}
                                handleSave={(newActivity) => this.handleSaveNewActivity(createActivity, newActivity)}
                                handleResetForm={this.handleResetForm}
                                resetForm={this.state.resetForm}
                                savingActivity={this.state.savingActivity}
                            />
                            <Snackbar
                                open={this.state.openSnackbar}
                                onClose={this.handleCloseSnackbar}
                                message={'Atividade criada com sucesso'}
                                variant={'success'}
                            />
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }
}
export default Activities