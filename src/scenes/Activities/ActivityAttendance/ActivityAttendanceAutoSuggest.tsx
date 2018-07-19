import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import * as React from 'react'
import Autosuggest from 'react-autosuggest'
import { SEARCH_PARTICIPANT } from '../../../repositories/participants'
import { client } from '../../../services/client'

function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps

    return (
        <TextField
            fullWidth={true}
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.email, query)
    const parts = parse(suggestion.email, matches)

    return (
        <MenuItem selected={isHighlighted} component='div'>
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    )
                })}
            </div>
        </MenuItem>
    )
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options

    return (
        <Paper {...containerProps} square={true}>
            {children}
        </Paper>
    )
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative' as any,
        height: 160,
    },
    suggestionsContainerOpen: {
        position: 'absolute' as any,
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block' as any,
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none' as any,
    },
})

export interface IProps {
    handleChange: (participant) => void
    participant
}

class ActivityAttendanceAutoSuggest extends React.Component<IProps & WithStyles<'container' | 'suggestionsContainerOpen' | 'suggestion' | 'suggestionsList'>> {
    public state = {
        suggestions: [] as Array<{ email: string, id: string }>,
    }

    public handleSuggestionsFetchRequested = ({ value: email }) => {
        const inputValue = email.trim().toLowerCase()
        const inputLength = inputValue.length
        if (inputLength === 0) {
            this.setState({
                suggestions: [],
            })
        }
        client.query({ query: SEARCH_PARTICIPANT , variables: { email }}).then(({ data }: any) => {
            this.setState({
                suggestions: data.searchParticipant,
            })
        })
    }

    public handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    }

    public handleChange = (event, { newValue }) => {
        const participant = this.state.suggestions.find((suggestion) => suggestion.email === newValue) || { email: newValue }
        this.props.handleChange(participant)
    }

    public render() {
        const { classes } = this.props as any

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={({ email }) => email }
                renderSuggestion={renderSuggestion}
                inputProps={{
                    classes,
                    placeholder: 'Pesquise um participante',
                    value: this.props.participant.email,
                    onChange: this.handleChange,
                }}
            />
        )
    }
}

export default withStyles(styles)(ActivityAttendanceAutoSuggest)