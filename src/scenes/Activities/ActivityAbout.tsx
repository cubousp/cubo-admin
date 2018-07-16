import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import AddActivityForm from './ActivityForm'

const styles = () => ({
})

class ActivityAbout extends React.Component<WithStyles<'container'>> {
    public render() {
        return (
            <div>
                <AddActivityForm
                    showError={false}
                    handleChange={(name) => (event) => console.log('hi')}
                    handleCheckedChange={(name) => (event) => console.log('hi')}
                    handleChangeDate={(name) => (event) => console.log('hi')}
                    activityModel={(name) => (event) => console.log('hi')}
                    validState={true}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ActivityAbout)