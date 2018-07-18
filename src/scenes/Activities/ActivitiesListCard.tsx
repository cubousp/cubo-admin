import { Theme, WithStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any
    }
})

interface IProps {
    activity: {
        id: string
        title: string
        startsAt: string
        endsAt: string
        kind: string
    }
}

class ActivitiesListCard extends React.Component<IProps & WithStyles<'title'>> {
    private mapKind = {
        'EXPO': 'Exposição de Painéis',
        'HANDSON': 'Hands-On',
        'LECTURE': 'Palestra',
        'STAND': 'Stand',
        'SURGERY': 'Cirurgia ao vivo',
        'WORKSHOP': 'Workshop'
    }

    public render() {
        const {classes, activity} = this.props
        return (
            <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                <ListItem button={true}>
                    <Avatar
                        name={this.mapKind[activity.kind]}
                        size={56}
                        round={true}
                        maxInitials={1}
                        textSizeRatio={3}
                    />
                    <ListItemText
                        primary={activity.title}
                        secondary={`${this.toHHMM(activity.startsAt)} às ${this.toHHMM(activity.endsAt)} | ${this.mapKind[activity.kind]}`}
                        className={classes.title}
                    />
                </ListItem>
            </Link>
        )
    }

    private toHHMM = (dateTime: string) => new Date(dateTime).toTimeString().split(' ')[0].split(':').slice(0,2).join(':')
}

export default withStyles(styles)(ActivitiesListCard)