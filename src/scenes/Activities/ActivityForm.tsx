import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
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
    handleCheckedChange: (name: string) => (event: any) => void
    handleChangeDate: (name: string) => (value: Date) => void
    activityModel: any
    validState: boolean
    disabled?: boolean
    showHint?: boolean
}

class ActivityForm extends React.Component<IProps & WithStyles<'container' | 'textField' | 'menu' | 'short' | 'expansionPanel' | 'expansionPanelSummary' | 'moreOptions' | 'expansionPanelDetails'>> {
    public formatDate = (type: 'start' | 'end') => {
        return type === 'start' ?
            (date:Date) => `Início*: ${date && date.toLocaleString('pt-BR').replace(' ', ' - ')}` :
            (date:Date) => `Término*: ${date && date.toLocaleString('pt-BR').replace(' ', ' - ')}`
    }

    public render() {
        const { classes, showError, handleChange, handleChangeDate, handleCheckedChange, activityModel, validState, disabled, showHint = true } = this.props
        return (
            <form className={classes.container} noValidate={true} autoComplete='off'>
                <Typography className={classes.moreOptions}>Informações básicas</Typography>
                <TextField
                    style={{ marginTop: 32 }}
                    id='title'
                    disabled={disabled}
                    label='Título'
                    error={showError && !validState }
                    required={true}
                    helperText={showHint && 'Ex: Atuação do cirurgião-dentista militar nas Forças Armadas – Força Aérea: expectativas, realidades e dificuldades'}
                    className={classes.textField}
                    value={activityModel.title}
                    onChange={handleChange('title')}
                    margin='normal'
                />
                <div>
                    <DateTimePicker
                        disabled={disabled}
                        placeholder={'Início do evento'}
                        value={activityModel.startsAt}
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
                        disabled={disabled}
                        placeholder={'Término do evento'}
                        value={activityModel.endsAt}
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
                    disabled={disabled}
                    select={true}
                    required={true}
                    className={classNames(classes.textField, classes.short)}
                    value={activityModel.kind}
                    onChange={handleChange('kind')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText={showHint && 'Selecione o tipo de atividade*'}
                    margin='normal'
                >
                    {kinds.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} style={{ width: 276 }} expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.moreOptions}>Informações complementares</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <TextField
                            id='location'
                            disabled={disabled}
                            label='Local da atividade'
                            value={activityModel.location}
                            onChange={handleChange('location')}
                            helperText={showHint && 'Coloque aqui o local da atividade. Ex: "Sala Laranja" '}
                            className={classes.textField}
                            margin='normal'
                        />
                        <TextField
                            id='shortDescription'
                            disabled={disabled}
                            label='Resumo da atividade'
                            multiline={true}
                            rowsMax='3'
                            rows={3}
                            value={activityModel.shortDescription}
                            onChange={handleChange('shortDescription')}
                            helperText={showHint && 'Coloque aqui um breve resumo do conteúdo da atividade. Isso a tornará mais atrativa para os participantes.'}
                            className={classes.textField}
                            margin='normal'
                        />
                        <TextField
                            id='totalVacancies'
                            disabled={disabled}
                            label='Número de vagas'
                            type='number'
                            value={activityModel.totalVacancies}
                            onChange={handleChange('totalVacancies')}
                            className={classNames(classes.textField, classes.short)}
                            margin='normal'
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} style={{ width: 212}} expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.moreOptions}>Dados do palestrante</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <TextField
                            id='speakerName'
                            disabled={disabled}
                            label='Nome'
                            value={activityModel.speakerName}
                            onChange={handleChange('speakerName')}
                            className={classNames(classes.textField, classes.short)}
                            margin='normal'
                        />
                        <TextField
                            id='speakerDescription'
                            disabled={disabled}
                            label='Descrição'
                            value={activityModel.speakerDescription}
                            onChange={handleChange('speakerDescription')}
                            className={classes.textField}
                            multiline={true}
                            rowsMax='2'
                            rows={2}
                            margin='normal'
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} style={{ width: 200}} expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.moreOptions}>Data das inscrições</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <DateTimePicker
                            placeholder={'Início das inscrições'}
                            disabled={disabled}
                            value={activityModel.inscriptionBeginsAt}
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
                            disabled={disabled}
                            placeholder={'Término das inscrições'}
                            value={activityModel.inscriptionEndsAt}
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.moreOptions}>Mais opções</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                        <FormControlLabel
                            style={{ marginTop: 16, paddingLeft: 8 }}
                            control={
                                <Checkbox
                                    disabled={disabled}
                                    checked={activityModel.visibleForParticipants}
                                    onChange={handleCheckedChange('visibleForParticipants')}
                                    color={'primary'}
                                />
                            }
                            label={'Visível para os participantes'}
                        />
                        <TextField
                            id='longDescription'
                            label='Observações para os participantes'
                            multiline={true}
                            rowsMax='3'
                            disabled={disabled}
                            rows={3}
                            value={activityModel.longDescription}
                            onChange={handleChange('longDescription')}
                            helperText={showHint && 'Você pode incluir observações e instruções para os participantes, ex: Trazer seu próprio kit clínico'}
                            className={classes.textField}
                            margin='normal'
                        />
                        <TextField
                            id='internalComment'
                            label='Comentários internos'
                            disabled={disabled}
                            multiline={true}
                            rows={5}
                            value={activityModel.internalComment}
                            onChange={handleChange('internalComment')}
                            helperText={showHint && 'Comentários internos para a organização. Esse campo não será visível para os participantes. Ex: "Lembrar de trazer os brindes para a sala meia hora antes"'}
                            className={classes.textField}
                            margin='normal'
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        )
    }
}

export default withStyles(styles)(ActivityForm)