import * as React from 'react';
import Layout from '../components/Layout';

export default class extends React.Component<{ id: any }> {
  static getInitialProps ({ query: { id } }) {
    return { id };
  }

  render () {
    return (
      <Layout title='我的博客'>
        <h1>My {this.props.id} blog post</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Layout>
    );
  }
}
