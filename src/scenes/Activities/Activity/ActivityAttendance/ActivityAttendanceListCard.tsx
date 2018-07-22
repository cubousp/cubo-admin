import { Theme, WithStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'
import { Check, Close, IndeterminateCheckBox } from '@material-ui/icons'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import { UPDATE_INSCRIPTION_STATUS } from '../../../../repositories/participants'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any,
        flexGrow: 1,
    },
})

interface IProps {
    inscription
    onUpdateStatus: (updateInscription, { inscriptionId, status }) => Promise<void>
}

const Attended = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Check style={{ marginRight: 8, color: '#4CAF50' }}/>
        <span style={{ color: '#4CAF50' }}>Presente</span>
    </div>
)

const Missed = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Close style={{ marginRight: 8, color: '#F44336' }}/>
        <span style={{ color: '#F44336' }}>Faltou</span>
    </div>
)

const Waiting = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <IndeterminateCheckBox style={{ marginRight: 8 }}/>
        <span>Aguardando</span>
    </div>
)

const STATUS_COMPONENT = {
    ATTENDED: Attended(),
    MISSED: Missed(),
    CONFIRMED: Waiting()
}

class ActivityAttendanceListCard extends React.Component<IProps & WithStyles<'title'>> {
    public state = {
        anchorEl: undefined,
    }

    public handleClose = () => {
        this.setState({anchorEl: undefined})
    }

    public handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    }

    public onUpdateStatus = (updateInscription, newStatus) => {
        if (newStatus !== this.props.inscription.status) {
            this.props.onUpdateStatus(updateInscription, { inscriptionId: this.props.inscription.id, status: newStatus })
        }
        this.handleClose()
    }

    public render() {
        const {classes, inscription} = this.props
        return (
            <ListItem style={{display: 'flex'}}>
                <ListItemText
                    primary={inscription.participant.name}
                    secondary={inscription.participant.email}
                    className={classes.title}
                />
                <Button
                    aria-label='add'
                    onClick={this.handleClick}
                    style={{marginRight: 32, width: 160 }}
                    variant={'outlined'}
                >
                    { STATUS_COMPONENT[inscription.status]}
                </Button>
                <Menu
                    id='simple-menu'
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    anchorOrigin={{ horizontal: 'right', vertical: 'center'}}
                >
                    <Mutation mutation={UPDATE_INSCRIPTION_STATUS}>
                        {(updateInscription) => (
                            <div>
                                <MenuItem onClick={() => this.onUpdateStatus(updateInscription, 'ATTENDED')}>
                                    <Check style={{ marginRight: 8 }}/>
                                    Presente
                                </MenuItem>
                                <MenuItem onClick={() => this.onUpdateStatus(updateInscription, 'MISSED')}>
                                    <Close style={{ marginRight: 8 }}/>
                                    Faltou
                                </MenuItem>
                                <MenuItem onClick={() => this.onUpdateStatus(updateInscription, 'CONFIRMED')}>
                                    <IndeterminateCheckBox style={{ marginRight: 8 }}/>
                                    Aguardando
                                </MenuItem>
                            </div>
                        )}
                    </Mutation>
                </Menu>
            </ListItem>
        )
    }
}

export default withStyles(styles)(ActivityAttendanceListCard)