import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import * as React from 'react'
import ApolloProvider from 'react-apollo/ApolloProvider'
import { Provider } from 'react-redux'
import { client } from '../services/client'
import { theme } from '../theme'
import AppRouter from './AppRouter'
import store from './store'

class App extends React.Component {
  public render() {
    return (
      <div className='App'>
          <Provider store={store}>
              <ApolloProvider client={client}>
                  <MuiThemeProvider theme={theme}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <AppRouter/>
                      </MuiPickersUtilsProvider>
                  </MuiThemeProvider>
              </ApolloProvider>
          </Provider>
      </div>
    )
  }
}

export default App
