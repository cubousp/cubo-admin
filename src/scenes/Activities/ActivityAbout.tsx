import { WithStyles, withStyles } from '@material-ui/core/styles'
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

    public onClose = () => {
        this.setState({
            showError: false,
        })
        this.handleClose()
    }

    public render() {
        return (
            <ActivityForm
                disabled={true}
                showError={this.state.showError}
                handleChange={this.handleChange}
                handleChangeDate={this.handleChangeDate}
                handleCheckedChange={this.handleCheckedChange}
                activityModel={this.state.activity}
                validState={this.state.activity.title !== undefined && this.state.activity.title.trim().length !== 0}
            />
        )
    }
}

export default withStyles(styles)(ActivityAbout)