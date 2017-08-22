import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from './Header';

const Layout: React.StatelessComponent<any> = ({ children, title = 'This is the default title' }): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    </Head>
    <Header />
    {children}
    <footer>
      I`m here to stay
    </footer>
  </div>
);

export default Layout;
