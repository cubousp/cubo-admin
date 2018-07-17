import Drawer from '@material-ui/core/Drawer/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

const styles = ({
    drawerPaper: {
        width: 300,
        padding: '32px 16px',
        position: 'absolute' as any,
        height: 'calc(100vh - 184px)'
    }
})

const data01 = [
    {name: 'Vagas disponíveis', value: 80},
    {name: 'Vagas preenchidas', value: 20},
]



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
                <PieChart width={300} height={300}>
                    <Pie dataKey='value' data={data01} cx={150} cy={160} outerRadius={80} fill='#8884d8' label={true}>
                        <Cell fill={'#4CAF50'}/>
                        <Cell fill={'#F44336'}/>
                    </Pie>
                </PieChart>
                <div style={{ marginLeft: 16 }}>
                    <Typography variant={'body1'}>Vagas disponíveis</Typography>
                    <Typography variant={'body1'} style={{ marginTop: 4}}>Vagas ocupadas</Typography>
                </div>
            </div>
        </Drawer>
    </div>
))

export default ActivityInscriptionsStats