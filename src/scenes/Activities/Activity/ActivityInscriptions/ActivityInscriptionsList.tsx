import { Theme, WithStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider/Divider'
import Typography from '@material-ui/core/es/Typography/Typography'
import List from '@material-ui/core/List'
import Portal from '@material-ui/core/Portal/Portal'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Searchbar from '../../../../components/Searchbar'
import Snackbar from '../../../../components/Snackbar'
import ActivityInscriptionsListCard from './ActivityInscriptionsListCard'

const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'calc(100% - 300px)',
        marginTop: 1,
        overflowY: 'auto' as any,
    },
})

interface IProps {
    inscriptions: any[]
}

class ActivityInscriptionsList extends React.Component<IProps & WithStyles<'root'>> {
    public state = {
        openSnackbar: false,
        searchTerm: ''
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

    public filteredInscriptions = (): any[] => {
        if (this.state.searchTerm.trim().length === 0) {
            return this.props.inscriptions
        }
        else {
            return this.props.inscriptions.filter(({ participant: { email, name }}) => {
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
                        this.filteredInscriptions().map((inscription: any) =>
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
                        this.props.inscriptions.length === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', marginTop: 300 }}>
                                <Typography variant={'subheading'} color={'primary'}>
                                    Essa atividade ainda não possui inscritos :(
                                </Typography>
                            </div>
                        )
                    }
                    {
                        this.props.inscriptions.length !== 0 && this.filteredInscriptions().length === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', marginTop: 300 }}>
                                <Typography variant={'subheading'} color={'primary'}>
                                    Nenhum participante encontrado com esses termos :(
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