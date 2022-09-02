import React from 'react';
import { Layout } from '../components/Index';
import '../styles/globals.scss'


function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component { ...pageProps } />
    </Layout>
  )
}

export default MyApp

