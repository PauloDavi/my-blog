import React from 'react';

import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
