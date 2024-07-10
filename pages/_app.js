import { QueryClientProvider } from "@tanstack/react-query";
import "../app/globals.css";

import { queryClient } from "../src/api";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
    return (
      <QueryClientProvider client={queryClient}> 
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </QueryClientProvider>
    );
  }
  