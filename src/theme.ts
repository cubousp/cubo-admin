import { lightBlue, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#fff',
            main: lightBlue[500]
        },
        secondary: red,
    },
})