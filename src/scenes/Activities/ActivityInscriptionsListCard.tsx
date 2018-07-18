import { Theme, WithStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Menu from '@material-ui/core/Menu/Menu'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'
import { MoreVert } from '@material-ui/icons'
import * as React from 'react'
import Mutation from 'react-apollo/Mutation'
import { DISENROLL_PARTICIPANT } from '../../repositories/participants'

const styles = (theme: Theme) => ({
    title: {
        fontStyle: 'italic' as any,
        flexGrow: 1
    },
})

interface IProps {
    inscription
    onRemove: (removeInscription) => Promise<void>
}

class ActivityInscriptionsListCard extends React.Component<IProps & WithStyles<'title'>> {
    public state = {
        anchorEl: undefined,
    }

    public handleClose = () => {
        this.setState({ anchorEl: undefined })
    }

    public handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    public render() {
        const {classes, inscription} = this.props
        return (
            <ListItem style={{ display: 'flex' }}>
                <ListItemText
                    primary={inscription.participant.name}
                    secondary={inscription.participant.email}
                    className={classes.title}
                />
                <Button
                    aria-label='add'
                    onClick={this.handleClick}
                    style={{ marginRight: 300 }}
                >
                    <MoreVert/>
                </Button>
                <Menu
                    id='simple-menu'
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <Mutation mutation={DISENROLL_PARTICIPANT} variables={{ inscriptionId: inscription.id }}>
                        {(removeInscription) => (
                            <MenuItem onClick={() => this.props.onRemove(removeInscription)}>Remover</MenuItem>
                        )}
                    </Mutation>
                </Menu>
            </ListItem>
        )
    }
}

export default withStyles(styles)(ActivityInscriptionsListCard)