// import React, { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout";

import Head from "next/head"

import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import CssBaseline from "@mui/material//CssBaseline"

// import useSSR from 'use-ssr'
// import useSSR from '../utils/useSsr'

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


// function ClientSideRenderedNextJS({ children }) {
//   const [domLoaded, setDomLoaded] = useState(false)
  
//   useEffect(() => {
//     setDomLoaded(true)
//   }, [])

//   const { isServer } = useSSR()
//   if (!domLoaded) return null
//   if (isServer) return <></>

//   return children
// }



function MyApp({ Component, pageProps }) {
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
          <Layout>
            {/* <ClientSideRenderedNextJS> */}
              {/* <ToastContainer 
                theme="dark"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                // toastStyle={{ backgroundColor: "crimson" }}
              /> */}
              <Component {...pageProps} />
            {/* </ClientSideRenderedNextJS> */}
          </Layout>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}


export default MyApp