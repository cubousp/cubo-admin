import AppBar from '@material-ui/core/AppBar/AppBar'
import Divider from '@material-ui/core/Divider/Divider'
import IconButton from '@material-ui/core/IconButton/IconButton'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import { Close, Search } from '@material-ui/icons'
import * as React from 'react'

const styles = () => ({
    toolbar: {
        padding: '0 24px'
    },
})

interface IProps {
    placeholder?: string
}

class Searchbar extends React.Component<IProps & WithStyles<'toolbar' | 'underline'>> {
    public state = {
        searchTerm: ''
    }

    public updateSearchTerm = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    public resetSearch = () => {
        this.setState({
            searchTerm: ''
        })
    }

    public render() {
        const { placeholder, classes } = this.props
        return (
            <AppBar position={'static'} color={'default'} style={{ backgroundColor: 'white'}} elevation={0}>
                <Toolbar disableGutters={true} style={{ minHeight: 48, height: 48, display: 'flex' }} className={classes.toolbar}>
                    <TextField
                        placeholder={placeholder || 'Pesquisar'}
                        style={{ flexGrow: 1 }}
                        InputProps={{
                            disableUnderline: true
                        }}
                        onChange={this.updateSearchTerm}
                        value={this.state.searchTerm}
                    />
                    {
                        this.state.searchTerm.length === 0 ?
                            <IconButton
                                color='default'
                                aria-label='open drawer'
                            >
                                <Search />
                            </IconButton> :
                            <IconButton
                                color='default'
                                aria-label='open drawer'
                                onClick={this.resetSearch}
                            >
                                <Close />
                            </IconButton>
                    }
                </Toolbar>
                <Divider/>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Searchbar)