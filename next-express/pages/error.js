// @flow

import Layout from '../components/Layout'

export default () => (
  <Layout title="错误">
    <p>This should not be rendered via SSR</p>
  </Layout>
)
