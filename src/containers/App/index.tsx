import * as React from 'react'
import { Layout, Row } from 'antd'
import { NavMenu } from 'components'

import './App.css'

const logo = require('./logo.svg')
const { Header, Content, Footer } = Layout

export class App extends React.Component {
  render() {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Row type="flex" align="middle">
            <img src={logo} className="App-logo" alt="logo" />
            <NavMenu />
          </Row>
        </Header>
        <Content style={{ padding: '0 50px', width: '80%', margin: `0 auto` }}>
          {this.props.children} 
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Joe Buza</Footer>
      </Layout>
    )
  }
}
