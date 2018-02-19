import * as React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { App, BoardsContainer, BoardContainer  } from 'containers'
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
              <Switch>
                <Route exact={true} path="/" component={BoardsContainer} />
                <Route path="/boards/:boardId" component={BoardContainer} />
              </Switch>
            </App>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}
