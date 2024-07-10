import { QueryClientProvider } from "@tanstack/react-query";
import Head from 'next/head';
import "../app/globals.css";

import { queryClient } from "../src/api";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
    return (
      <>
      <Head>
        <title>Starwars</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}> 
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </QueryClientProvider>
      </>
    );
  }
  