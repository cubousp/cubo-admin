import { Theme, WithStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any,
        flexGrow: 1
    },
})

interface IProps {
    participant
}

class ParticipantsListCard extends React.Component<IProps & WithStyles<'title'>> {
    public state = {
        anchorEl: undefined,
    }

    public handleClose = () => {
        this.setState({ anchorEl: undefined })
    }

    public handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    public render() {
        const {classes, participant} = this.props
        return (
            <ListItem style={{ display: 'flex' }}>
                <ListItemText
                    primary={participant.name}
                    secondary={participant.email}
                    className={classes.title}
                />
            </ListItem>
        )
    }
}

export default withStyles(styles)(ParticipantsListCard)