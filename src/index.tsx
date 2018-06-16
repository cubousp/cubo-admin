import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import pt from 'javascript-time-ago/locale/pt'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import App from './App/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

// Initialize the desired locales.
JavascriptTimeAgo.locale(pt)
JavascriptTimeAgo.locale(en)
ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
