import Drawer from '@material-ui/core/Drawer/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'

const styles = ({
    drawerPaper: {
        width: 300,
        padding: '32px 16px',
        position: 'absolute' as any,
        height: 'calc(100vh - 184px)'
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: 8
    }
})

interface IProps {
    available: number,
    enrolled:  number
}

const ActivityInscriptionsStats = withStyles(styles)<IProps>(({ classes, available, enrolled  }) => (
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
                {
                    (!available && !enrolled) ? <div style={{ marginTop: 32 }}>Nenhuma estatística para mostrar :( </div> :
                        <div>
                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey='value'
                                    data={[{ name: 'Vagas disponíveis', value: available || 0}, { name: 'Vagas preenchidas', value: enrolled || 0 }]}
                                    cx={150}
                                    cy={160}
                                    outerRadius={80}
                                    fill='#8884d8'
                                    label={true}
                                >
                                    <Cell fill={'#4CAF50'}/>
                                    <Cell fill={'#F44336'}/>
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                            <div style={{ marginLeft: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <div className={classes.dot} style={{ backgroundColor: '#4CAF50' }}/>
                                    <Typography variant={'body1'} >Vagas disponíveis</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8}}>
                                    <div className={classes.dot} style={{ backgroundColor: '#F44336'}}/>
                                    <Typography variant={'body1'}>Vagas preenchidas</Typography>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </Drawer>
    </div>
))

export default ActivityInscriptionsStats