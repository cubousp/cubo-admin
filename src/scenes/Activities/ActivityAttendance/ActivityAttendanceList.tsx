import { Theme, WithStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider'
import Typography from '@material-ui/core/es/Typography/Typography'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Snackbar from '../../../components/Snackbar'
import ActivityAttendanceListCard from './ActivityAttendanceListCard'

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

class ActivityAttendanceList extends React.Component<IProps & WithStyles<'root'>> {
    public state = {
        openSnackbar: false,
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
        })
    }

    public onUpdateStatus = async(updateStatus, variables) => {
        updateStatus({ variables }).then(() => {
            this.setState({
                openSnackbar: true
            })
        })
    }

    public render() {
        const { classes, inscriptions  } = this.props
        return (
            <div className={classes.root}>
                <List>
                    {
                        inscriptions.map((inscription: any) =>
                            <div key={inscription.id}>
                                <ActivityAttendanceListCard
                                    inscription={inscription}
                                    onUpdateStatus={this.onUpdateStatus}
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
                <Snackbar
                    open={this.state.openSnackbar}
                    onClose={this.handleCloseSnackbar}
                    message={'Sucesso'}
                    variant={'info'}
                    absolute={true}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ActivityAttendanceList)