import Drawer from '@material-ui/core/Drawer/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'

const styles = ({
    drawerPaper: {
        width: 300,
        padding: '32px 16px',
        position: 'absolute' as any,
        height: 'calc(100vh - 184px)'
    }
})

const ActivityInscriptionsStats = withStyles(styles)(({ classes }) => (
    <div>
        <Drawer
            variant='permanent'
            anchor={'right'}
            style={{ width: 240 }}
            classes={{
                paper: classes.drawerPaper
            }}
            elevation={8}
        >
            <div>
                <Typography variant={'headline'}>Estatísticas</Typography>

            </div>
        </Drawer>
    </div>
))

export default ActivityInscriptionsStats