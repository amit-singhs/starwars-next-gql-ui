import { Hydrate, QueryClientProvider } from "react-query";
import "../app/globals.css";

import { queryClient } from "../src/api";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    );
  }
  