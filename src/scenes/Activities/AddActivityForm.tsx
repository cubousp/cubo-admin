import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import { AccessTime, ChevronLeft, ChevronRight, DateRange, Event } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as classNames from 'classnames'
import { DateTimePicker } from 'material-ui-pickers'
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
        marginTop: 32,
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
    'LECTURE': 'Palestra',
    'EXPO': 'Exposição de Painéis',
    'HANDSON': 'Hands-On',
    'STAND': 'Stand',
    'SURGERY': 'Cirurgia ao vivo',
    'WORKSHOP': 'Workshop',
}

const kinds = Object.keys(mapKind).map((key) => ({label: mapKind[key], value: key}))

interface IProps {
    showError: boolean
    handleChange: (name: string) => (event: any) => void
    handleChangeDate: (name: string) => (value: Date) => void
    newActivity: any
    validState: boolean
}

class AddActivityForm extends React.Component<IProps & WithStyles<'container' | 'textField' | 'menu' | 'short' | 'expansionPanel' | 'expansionPanelSummary' | 'moreOptions' | 'expansionPanelDetails'>> {
    public formatDate = (type: 'start' | 'end') => {
        return type === 'start' ?
            (date:Date) => `Início*: ${date.toLocaleString('pt-BR').replace(' ', ' - ')}` :
            (date:Date) => `Término*: ${date.toLocaleString('pt-BR').replace(' ', ' - ')}`
    }

    public render() {
        const { classes, showError, handleChange, handleChangeDate, newActivity, validState } = this.props
        return (
            <form className={classes.container} noValidate={true} autoComplete='off'>
                <Typography className={classes.moreOptions}>Informações básicas</Typography>
                <TextField
                    id='title'
                    label='Título'
                    error={showError && !validState }
                    required={true}
                    helperText={'Ex: Atuação do cirurgião-dentista militar nas Forças Armadas – Força Aérea: expectativas, realidades e dificuldades'}
                    className={classes.textField}
                    value={newActivity.title}
                    onChange={handleChange('title')}
                    margin='normal'
                />
                <div>
                    <DateTimePicker
                        placeholder={'Início do evento'}
                        value={newActivity.startsAt}
                        ampm={false}
                        className={classNames(classes.textField, classes.short)}
                        timeIcon={<AccessTime/>}
                        minDate={new Date(2018, 8, 17)}
                        maxDate={new Date(2018, 8, 19, 23, 59, 59)}
                        dateRangeIcon={<DateRange/>}
                        onChange={handleChangeDate('startsAt')}
                        leftArrowIcon={<ChevronLeft/>}
                        keyboardIcon={<Event/>}
                        margin='normal'
                        labelFunc={this.formatDate('start')}
                        cancelLabel={'Cancelar'}
                        rightArrowIcon={<ChevronRight/>}
                    />
                </div>
                <div>
                    <DateTimePicker
                        placeholder={'Término do evento'}
                        value={newActivity.endsAt}
                        className={classNames(classes.textField, classes.short)}
                        ampm={false}
                        minDate={new Date(2018, 8, 17)}
                        maxDate={new Date(2018, 8, 19, 23, 59, 59)}
                        timeIcon={<AccessTime/>}
                        dateRangeIcon={<DateRange/>}
                        keyboardIcon={<Event/>}
                        labelFunc={this.formatDate('end')}
                        margin='normal'
                        cancelLabel={'Cancelar'}
                        onChange={handleChangeDate('endsAt')}
                        leftArrowIcon={<ChevronLeft/>}
                        rightArrowIcon={<ChevronRight/>}
                    />
                </div>
                <TextField
                    id='kind'
                    select={true}
                    required={true}
                    className={classNames(classes.textField, classes.short)}
                    value={newActivity.kind}
                    onChange={handleChange('kind')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText='Selecione o tipo de atividade*'
                    margin='normal'
                >
                    {kinds.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography className={classes.moreOptions} style={{marginTop: 48}}>
                    Informações complementares
                </Typography>
                <TextField
                    id='shortDescription'
                    label='Resumo da atividade'
                    multiline={true}
                    rowsMax='3'
                    rows={3}
                    value={newActivity.shortDescription}
                    onChange={handleChange('shortDescription')}
                    helperText={'Coloque aqui um breve resumo do conteúdo da atividade. Isso a tornará mais atrativa para os participantes.'}
                    className={classes.textField}
                    margin='normal'
                />
                <TextField
                    id='totalVacancies'
                    label='Número de vagas'
                    type='number'
                    value={newActivity.totalVacancies}
                    onChange={handleChange('totalVacancies')}
                    className={classNames(classes.textField, classes.short)}
                    margin='normal'
                />
                <Typography className={classes.moreOptions} style={{marginTop: 48}}>
                    Dados do palestrante
                </Typography>
                <TextField
                    id='speakerName'
                    label='Nome'
                    value={newActivity.speakerName}
                    onChange={handleChange('speakerName')}
                    className={classNames(classes.textField, classes.short)}
                    margin='normal'
                />
                <TextField
                    id='speakerDescription'
                    label='Descrição'
                    value={newActivity.speakerDescription}
                    onChange={handleChange('speakerDescription')}
                    className={classes.textField}
                    multiline={true}
                    rowsMax='2'
                    rows={2}
                    margin='normal'
                />
                <Typography className={classes.moreOptions} style={{ marginTop: 48}}>Data das inscrições</Typography>
                <DateTimePicker
                    placeholder={'Início das inscrições'}
                    value={newActivity.inscriptionBeginsAt}
                    ampm={false}
                    className={classNames(classes.textField, classes.short)}
                    timeIcon={<AccessTime/>}
                    dateRangeIcon={<DateRange/>}
                    onChange={handleChangeDate('inscriptionBeginsAt')}
                    leftArrowIcon={<ChevronLeft/>}
                    keyboardIcon={<Event/>}
                    margin='normal'
                    labelFunc={this.formatDate('start')}
                    cancelLabel={'Cancelar'}
                    rightArrowIcon={<ChevronRight/>}
                />
                <DateTimePicker
                    placeholder={'Término das inscrições'}
                    value={newActivity.inscriptionEndsAt}
                    ampm={false}
                    className={classNames(classes.textField, classes.short)}
                    timeIcon={<AccessTime/>}
                    dateRangeIcon={<DateRange/>}
                    onChange={handleChangeDate('inscriptionEndsAt')}
                    leftArrowIcon={<ChevronLeft/>}
                    keyboardIcon={<Event/>}
                    margin='normal'
                    labelFunc={this.formatDate('end')}
                    cancelLabel={'Cancelar'}
                    rightArrowIcon={<ChevronRight/>}
                />
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.moreOptions}>Mais opções</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <TextField
                            id='longDescription'
                            label='Observações para os participantes'
                            multiline={true}
                            rowsMax='3'
                            rows={3}
                            value={newActivity.longDescription}
                            onChange={handleChange('longDescription')}
                            helperText={'Você pode incluir observações e instruções para os participantes, ex: Trazer seu próprio kit clínico'}
                            className={classes.textField}
                            margin='normal'
                        />
                        <TextField
                            id='internalComment'
                            label='Comentários internos'
                            multiline={true}
                            rows={5}
                            value={newActivity.internalComment}
                            onChange={handleChange('internalComment')}
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