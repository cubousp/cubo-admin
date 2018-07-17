import { Theme, WithStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any,
    },
})

interface IProps {
    inscription
}

class ActivityInscriptionsListCard extends React.Component<IProps & WithStyles<'title'>> {
    public render() {
        const {classes, inscription} = this.props
        return (
            <ListItem>
                <ListItemText
                    primary={inscription.participant.name}
                    secondary={inscription.participant.email}
                    className={classes.title}
                />
            </ListItem>
        )
    }
}

export default withStyles(styles)(ActivityInscriptionsListCard)