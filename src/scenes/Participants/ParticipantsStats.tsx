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
        paddingTop: 128
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
    fouspGraduating: number,
    fouspPosGraduating:  number,
    externalParticipants: number
}

const ParticipantsStats = withStyles(styles)<IProps>(({ classes, fouspGraduating, fouspPosGraduating, externalParticipants  }) => (
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
                    !(fouspGraduating || fouspPosGraduating || externalParticipants) ? <div style={{ marginTop: 32 }}>Nenhuma estatística para mostrar :( </div> :
                        <div>
                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey='value'
                                    data={[
                                        { name: 'FOUSP - Graduação', value: fouspGraduating || 0}, 
                                        { name: 'FOUSP - Pós-graduação', value: fouspPosGraduating || 0 },
                                        { name: 'Participantes Externos', value: externalParticipants || 0}
                                    ]}
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
                                    <Typography variant={'body1'} >FOUSP - Graduação: {fouspGraduating}</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8}}>
                                    <div className={classes.dot} style={{ backgroundColor: '#F44336'}}/>
                                    <Typography variant={'body1'}>FOUSP - Pós-graduação: {fouspPosGraduating}</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8}}>
                                    <div className={classes.dot} style={{ backgroundColor: '#F44336'}}/>
                                    <Typography variant={'body1'}>Participantes Externos: {externalParticipants}</Typography>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </Drawer>
    </div>
))

export default ParticipantsStats