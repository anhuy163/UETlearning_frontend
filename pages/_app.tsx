import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RouteGuard from "@/src/containers/RouteGuard";
import { Provider } from "react-redux";
import { store } from "@/src/app/redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
// import "antd/dist/antd.less";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </Provider>
    </QueryClientProvider>
  );
}
