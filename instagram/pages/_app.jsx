// import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import React from 'react';
import { RecoilRoot } from 'recoil';

  function App({
  Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
          <Component {...pageProps} />
      </RecoilRoot>
   </SessionProvider>
  )
}

export default App;