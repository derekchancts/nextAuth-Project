// import React, { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";

import Head from "next/head"

import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import CssBaseline from "@mui/material//CssBaseline"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { wrapper } from "../store/store";


// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp



// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SessionProvider>
//   );
// }



function MyApp({ Component, pageProps }) {
// function MyApp({ Component, ...rest }) {

  // const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
        {/* <SessionProvider session={props.session}> */}
          <Layout>
            <ToastContainer 
              theme="dark"
              autoClose={3000}
              hideProgressBar={true}
              closeOnClick
              // toastStyle={{ backgroundColor: "crimson" }}
            />
            <Component {...pageProps} />
            {/* <Component {...props.pageProps} /> */}
          </Layout>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}


export default wrapper.withRedux(MyApp);