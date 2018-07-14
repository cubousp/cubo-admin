import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as classNames from 'classnames'
import * as React from 'react'

const styles = (theme: Theme) => ({
    container: {
        display: 'flex' as any,
        flexDirection: 'column' as any,
        flexShrink: 0,
        margin: 32
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    short: {
        width: 280
    },
    expansionPanel: {
        marginTop: 32,
        boxShadow: 'none',
        '&:before': {
            content: 'none'
        }
    },
    expansionPanelSummary: {
        padding: 0,
        width: 160,
    },
    expansionPanelDetails: {
        display: 'flex' as any,
        flexDirection: 'column' as any,
    },
    moreOptions: {
        fontSize: 16,
        fontWeight: '600' as any
    }
})

const mapKind = {
    'LECTURE': 'Palestra',
    'EXPO': 'Exposição de Painéis',
    'HANDSON': 'Hands-On',
    'STAND': 'Stand',
    'SURGERY': 'Cirurgia ao vivo',
    'WORKSHOP': 'Workshop'
}

const kinds = Object.keys(mapKind).map((key) => ({ label: mapKind[key], value: key }))

class AddActivityForm extends React.Component<WithStyles<'container' | 'textField' | 'menu' | 'short' | 'expansionPanel' | 'expansionPanelSummary' | 'moreOptions' | 'expansionPanelDetails'>> {
    public state = {
        title: undefined,
        startsAt: new Date(), // TODO
        endsAt: undefined, // TODO
        kind: 'LECTURE',
        shortDescription: undefined,
        longDescription: undefined,
        internalComment: undefined,
        speakerName: undefined,
        speakerDescription: undefined,
        inscriptionBeginsAt: undefined, // TODO
        inscriptionEndsAt: undefined, // TODO
        totalVacancies: undefined,
    }

    public handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    public render() {
        const { classes } = this.props
        return (
            <form className={classes.container} noValidate={true} autoComplete='off'>
                <Typography className={classes.moreOptions}>Informações básicas</Typography>
                <TextField
                    id='title'
                    label='Tĩtulo'
                    required={true}
                    helperText={'Ex: Atuação do cirurgião-dentista militar nas Forças Armadas – Força Aérea: expectativas, realidades e dificuldades'}
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                    margin='normal'
                />
                <TextField
                    id='kind'
                    select={true}
                    className={classNames(classes.textField, classes.short)}
                    value={this.state.kind}
                    onChange={this.handleChange('kind')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText='Selecione o tipo de atividade'
                    margin='normal'
                >
                    {kinds.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography className={classes.moreOptions} style={{ marginTop: 48 }}>
                    Informações complementares
                </Typography>
                <TextField
                    id='shortDescription'
                    label='Resumo da atividade'
                    multiline={true}
                    rowsMax='3'
                    rows={3}
                    value={this.state.shortDescription}
                    onChange={this.handleChange('shortDescription')}
                    helperText={'Coloque aqui um breve resumo do conteúdo da atividade. Isso a tornará mais atrativa para os participantes.'}
                    className={classes.textField}
                    margin='normal'
                />
                <TextField
                    id='totalVacancies'
                    label='Número de vagas'
                    type='number'
                    value={this.state.totalVacancies}
                    onChange={this.handleChange('totalVacancies')}
                    className={classNames(classes.textField, classes.short)}
                    margin='normal'
                />
                <Typography className={classes.moreOptions} style={{ marginTop: 48 }}>
                    Dados do palestrante
                </Typography>
                <TextField
                    id='speakerName'
                    label='Nome'
                    value={this.state.speakerName}
                    onChange={this.handleChange('speakerName')}
                    className={classNames(classes.textField, classes.short)}
                    margin='normal'
                />
                <TextField
                    id='speakerDescription'
                    label='Descrição'
                    value={this.state.speakerDescription}
                    onChange={this.handleChange('speakerDescription')}
                    className={classes.textField}
                    multiline={true}
                    rowsMax='2'
                    rows={2}
                    margin='normal'
                />
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.moreOptions}>Mais opções</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <TextField
                            id='longDescription'
                            label='Observações para os participantes'
                            multiline={true}
                            rowsMax='3'
                            rows={3}
                            value={this.state.longDescription}
                            onChange={this.handleChange('longDescription')}
                            helperText={'Você pode incluir observações e instruções para os participantes, ex: Trazer seu próprio kit clínico'}
                            className={classes.textField}
                            margin='normal'
                        />
                        <TextField
                            id='internalComment'
                            label='Comentários internos'
                            multiline={true}
                            rows={5}
                            value={this.state.internalComment}
                            onChange={this.handleChange('internalComment')}
                            helperText={'Comentários internos para a organização. Esse campo não será visível para os participantes. Ex: "Lembrar de trazer os brindes para a sala meia hora antes"'}
                            className={classes.textField}
                            margin='normal'
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        )
    }
}

export default withStyles(styles)(AddActivityForm)