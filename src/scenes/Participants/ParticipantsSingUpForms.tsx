import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField/TextField'
import * as classNames from 'classnames'
import * as React from 'react'

const styles = (theme: Theme) => ({
    container: {
        display: 'flex' as any,
        flexDirection: 'column' as any,
        flexShrink: 0,
        margin: 32,
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    short: {
        width: 280,
    },
    expansionPanel: {
        marginTop: 16,
        boxShadow: 'none',
        '&:before': {
            content: 'none',
        },
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
        fontWeight: '600' as any,
    },
})


const mapKind = {
    'GRADUATING_FOUSP': 'FOUSP - Graduando',
    'POS_GRADUATING_FOUSP': 'FOUSP - Pós-Graduando',
    'EXTERNAL_PARTICIPANT': 'Participante Externo',
}

const kinds = Object.keys(mapKind).map((key) => ({label: mapKind[key], value: key}))

interface IProps {
    showError: boolean
    handleChange: (name: string) => (event: any) => void
    participantModel: any
    validState: boolean
    disabled?: boolean
    showHint?: boolean
}

class ParticipantSignUpForms extends React.Component<IProps & WithStyles<'container' | 'textField' | 'menu' | 'short' | 'expansionPanel' | 'expansionPanelSummary' | 'moreOptions' | 'expansionPanelDetails'>> {
    public formatDate = (type: 'start' | 'end') => {
        return type === 'start' ?
            (date:Date) => `Início*: ${date && date.toLocaleString('pt-BR').replace(' ', ' - ')}` :
            (date:Date) => `Término*: ${date && date.toLocaleString('pt-BR').replace(' ', ' - ')}`
    }

    public render() {
        const { classes, showError, handleChange, participantModel, validState, disabled, showHint = true } = this.props
        return (
            <form className={classes.container} noValidate={true} autoComplete='off'>
                <TextField
                    style={{ marginTop: 15 }}
                    id='name'
                    disabled={disabled}
                    label='Nome'
                    error={showError && !validState }
                    required={true}
                    className={classes.textField}
                    value={participantModel.name}
                    onChange={handleChange('name')}
                    margin='normal'
                />

                <TextField
                    style={{ marginTop: 15 }}
                    id='email'
                    disabled={disabled}
                    label='Email'
                    error={showError && !validState }
                    required={true}
                    className={classes.textField}
                    value={participantModel.email}
                    onChange={handleChange('email')}
                    margin='normal'
                />
                <TextField
                    style={{ marginTop: 15 }}
                    id='kind'
                    disabled={disabled}
                    select={true}
                    required={true}
                    className={classNames(classes.textField, classes.short)}
                    value={participantModel.kind}
                    onChange={handleChange('kind')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText={showHint && 'Selecione o tipo de participante*'}
                    margin='normal'
                >
                    {kinds.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
        )
    }
}

export default withStyles(styles)(ParticipantSignUpForms)