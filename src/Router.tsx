import * as React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter, Route } from 'react-router-dom'
import { App, BoardsContainer } from 'containers'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BoardStore } from 'stores'

export default class Router extends React.Component {
  render() {
    return (
      <Provider boardStore={new BoardStore()}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App>
              <Route path="/" component={BoardsContainer} />
            </App>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}
