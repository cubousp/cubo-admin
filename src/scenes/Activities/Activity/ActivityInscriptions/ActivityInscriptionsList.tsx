import { Theme, WithStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider'
import Typography from '@material-ui/core/es/Typography/Typography'
import List from '@material-ui/core/List'
import Portal from '@material-ui/core/Portal/Portal'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Snackbar from '../../../../components/Snackbar'
import ActivityInscriptionsListCard from './ActivityInscriptionsListCard'

const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'calc(100% - 300px)',
        marginTop: 4,
        overflowY: 'auto' as any,
    },
})

interface IProps {
    inscriptions: any[]
}

class ActivityInscriptionsList extends React.Component<IProps & WithStyles<'root'>> {
    public state = {
        openSnackbar: false,
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
        })
    }

    public onRemove = async(removeActivity) => {
        removeActivity().then(() => {
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
                                <ActivityInscriptionsListCard
                                    inscription={inscription}
                                    onRemove={this.onRemove}
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
                <Portal>
                    <Snackbar
                        open={this.state.openSnackbar}
                        onClose={this.handleCloseSnackbar}
                        message={'Inscrição removida com sucesso'}
                        variant={'success'}
                        absolute={true}
                    />
                </Portal>
            </div>
        )
    }
}

export default withStyles(styles)(ActivityInscriptionsList)