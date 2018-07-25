import Drawer from '@material-ui/core/Drawer/Drawer'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'

const styles = (theme: Theme) =>({
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
    classes,
    participants
}


enum ParticipantKind {
    fouspGraduating = 'GRADUATING_FOUSP',
    fouspPosGraduation = 'POS_GRADUATING_FOUSP',
    externalParticipants = 'EXTERNAL_PARTICIPANT',
}

class ParticipantsStats extends React.Component<IProps & WithStyles<'drawerPaper' | 'dot'>> {
    
    public getParticipantCount = (participants: any[], kindFilter: ParticipantKind): number => {
        return participants.filter(
            ({ kind }) => kind === kindFilter).length
    }


    public render() {
        const {
            classes,
            participants
        } = this.props

        const fouspGraduating = this.getParticipantCount(participants, ParticipantKind.fouspGraduating) 
        const fouspPosGraduating=this.getParticipantCount(participants, ParticipantKind.fouspPosGraduation)
        const externalParticipants=this.getParticipantCount(participants, ParticipantKind.externalParticipants) 
    
        return (
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
        )
    }
}

export default withStyles(styles)(ParticipantsStats)