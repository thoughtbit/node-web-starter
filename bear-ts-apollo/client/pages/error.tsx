import * as React from 'react';
import Layout from '../components/Layout';

export default (): JSX.Element => (
  <Layout title='错误'>
    <p>This should not be rendered via SSR</p>
  </Layout>
);
