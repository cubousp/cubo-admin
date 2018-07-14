import { Theme } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import Avatar from 'react-avatar'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any
    }
})

interface IProps {
    activity: {
        title: string
        startsAt: string
        endsAt: string
        kind: string
    }
}

const ActivitiesListCard = withStyles(styles)<IProps>(({ classes, activity }) => (
    <ListItem>
        <Avatar
            name={mapKind[activity.kind]}
            size={56}
            round={true}
            maxInitials={1}
            textSizeRatio={3}
        />
        <ListItemText
            primary={activity.title}
            secondary={`${toHHMM(activity.startsAt)} às ${toHHMM(activity.endsAt)} | ${mapKind[activity.kind]}`}
            className={classes.title}
        />
    </ListItem>
))

const toHHMM = (dateTime: string) => new Date(dateTime).toTimeString().split(' ')[0].split(':').slice(0,2).join(':')

const mapKind = {
    'EXPO': 'Exposição de Painéis',
    'HANDSON': 'Hands-On',
    'LECTURE': 'Palestra',
    'STAND': 'Stand',
    'SURGERY': 'Cirurgia ao vivo',
    'WORKSHOP': 'Workshop'
}
export default ActivitiesListCard