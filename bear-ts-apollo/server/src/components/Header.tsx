import * as React from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import { expect } from 'chai';

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header: React.StatelessComponent<{}> = (): JSX.Element => (
  <header>
    <nav className='nav'>
      <Link href='/'><a>Home</a></Link>
      <Link href='/blog'><a>blog</a></Link>
      <Link href='/blog?id=first' as='/blog/first'><a>My first blog post</a></Link>
      <Link href='/contact'><a>Contact</a></Link>
      <Link href='/about'><a>About</a></Link>
      <Link href='/error'><a>Error</a></Link>
    </nav>
    <style jsx global>{`
      .nav {
        text-align: center;
      }
      .nav a {
        display: inline-block;
        padding: 5px;
        border: 1px solid #eee;
        margin: 0 5px;
      }
      .nav a:hover {
        background: #ccc;
      }
    `}</style>
  </header>
);

export default Header;
