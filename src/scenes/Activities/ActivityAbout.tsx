import Button from '@material-ui/core/Button/Button'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import { Edit } from '@material-ui/icons'
import * as React from 'react'
import ActivityForm from './ActivityForm'

const styles = () => ({
    appBar: {
        position: 'relative' as any,
    },
    flex: {
        flex: 1,
    },
})

interface IProps {
    activity: any
}

class ActivityAbout extends React.Component<IProps & WithStyles<'appBar' | 'flex'>> {
    public state = {
        activity: Object.assign({}, this.props.activity),
        showError: false,
        savingActivity: false,
        resetForm: false,
        disableEdition: true,
    }

    public handleClose = () => {
        console.log('close')
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
            disableEdition: false
        })
    }

    public render() {
        return (
            <div>
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
                    <Button
                        variant='fab'
                        color='secondary'
                        aria-label='add'
                        style={{ position: 'absolute', bottom: 64, right: 64 }}
                        onClick={this.handleEditClick}
                    >
                        <Edit/>
                    </Button>
            </div>
        )
    }
}

export default withStyles(styles)(ActivityAbout)