import { Theme, WithStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider'
import Typography from '@material-ui/core/es/Typography/Typography'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Searchbar from '../../components/Searchbar'
import ParticipantsListCard from './ParticipantsListCard'


const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'calc(100% - 300px)',
        marginTop: 1,
        overflowY: 'auto' as any,
    },
})

interface IProps {
    participants: any[]
    openSnackbar: boolean
}

class ParticipantsList extends React.Component<IProps & WithStyles<'root'>> {
    public state = {
        openSnackbar: false,
        searchTerm: ''
    }

    public handleCloseSnackbar = () => {
        this.setState({
            openSnackbar: false
        })
    }

    public filteredParticipants = (): any[] => {
        if (this.state.searchTerm.trim().length === 0) {
            return this.props.participants
        }
        else {
            return this.props.participants.filter(({ email, name }) => {
                return this.normalizeString(email).indexOf(this.normalizeString(this.state.searchTerm)) > -1 || this.normalizeString(name).indexOf(this.normalizeString(this.state.searchTerm)) > -1
            })
        }
    }

    public normalizeString = (str: string ) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()

    public updateSearchTerm = (searchTerm: string) => {
        this.setState({ searchTerm })
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Searchbar placeholder={'Pesquisar'} onUpdateSearchTerm={(searchTerm) => this.updateSearchTerm(searchTerm)} />
                <List>
                    {
                        this.filteredParticipants().map((participant: any) =>
                            <div key={participant.id}>
                                <ParticipantsListCard
                                    participant={participant}
                                />
                                <Divider/>
                            </div>
                        )
                    }
                    {
                        this.props.participants.length === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', marginTop: 300 }}>
                                <Typography variant={'subheading'} color={'primary'}>
                                    Ainda não há participantes :(
                                </Typography>
                            </div>
                        )
                    }
                    {
                        this.props.participants.length !== 0 && this.filteredParticipants().length === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', marginTop: 300 }}>
                                <Typography variant={'subheading'} color={'primary'}>
                                    Nenhum participante encontrado com esses termos :(
                                </Typography>
                            </div>
                        )
                    }
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(ParticipantsList)