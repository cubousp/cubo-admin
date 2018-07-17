import { Theme } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider'
import Typography from '@material-ui/core/es/Typography/Typography'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import ActivityInscriptionsListCard from './ActivityInscriptionsListCard'

const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        marginTop: 4,
        overflowY: 'auto' as any,
    },
})

interface IProps {
    inscriptions: any[]
}

const ActivityInscriptionsList = withStyles(styles)<IProps>(({ classes, inscriptions  }) => (
    <div className={classes.root}>
        <List>
            {
                inscriptions.map((inscription: any) =>
                    <div key={inscription.id}>
                        <ActivityInscriptionsListCard
                            inscription={inscription}
                        />
                        <Divider/>
                    </div>
                )
            }
            {
                inscriptions.length === 0 && (
                    <div style={{ margin: '128px 0', textAlign: 'center', width: 'calc(100% - 333px)'}}>
                        <Typography variant={'subheading'} color={'primary'}>
                            Essa atividade ainda não possui inscritos :(
                        </Typography>
                    </div>
                )
            }
        </List>
    </div>
))

export default ActivityInscriptionsList