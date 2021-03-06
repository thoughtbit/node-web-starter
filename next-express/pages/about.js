// @flow

import { Component } from 'react'
import Layout from '../components/Layout'

export default class extends Component {
  // Add some delay
  static async getInitialProps () {
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    return {}
  }

  render () {
    return (
      <Layout title="关于我们">
        <p>About us Page!</p>
      </Layout>
    )
  }
}
