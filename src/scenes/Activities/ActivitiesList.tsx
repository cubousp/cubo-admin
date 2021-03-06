import { Theme } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import ActivitiesListCard from './ActivitiesListCard'

const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        overflowY: 'auto' as any,
    },
})

interface IProps {
    activities: any[]
}

const ActivitiesList = withStyles(styles)<IProps>(({ classes, activities  }) => (
        <div className={classes.root}>
            <List>
                {
                    groupByStartDate(activities).map((group: any) => (
                        <div key={group.date.toString()}>
                            <ListSubheader>{group.date.toLocaleString('pt-BR').split(' ')[0]}</ListSubheader>
                            {
                                activities.length && group.activities.map((activity: any) => <ActivitiesListCard activity={activity} key={activity.id}/>)
                            }
                    </div>
                    ))
                }
                {
                    activities.length === 0 && (
                        <div style={{ textAlign: 'center', width: '100%', marginTop: 300 }}>
                            <Typography variant={'subheading'} color={'primary'}>
                                Nenhuma atividade cadastrada :(
                            </Typography>
                        </div>
                    )
                }
            </List>
        </div>
))

const groupByStartDate = (activities: any) => activities.reduce((acc: any[], value: any) => {
    const existentNode = acc.find((node: any) => sameDay(node.date, new Date(value.startsAt)) )
    if (existentNode) { existentNode.activities.push(value) }
    else { acc.push({ date: new Date(value.startsAt), activities: [value] }) }
    return acc
}, [])

const sameDay = (dateA: Date, dateB: Date) => {
    return dateA.getDay() === dateB.getDay() &&
           dateA.getMonth() === dateB.getMonth() &&
           dateA.getFullYear() === dateB.getFullYear()
}
export default ActivitiesList