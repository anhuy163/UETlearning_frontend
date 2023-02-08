import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RouteGuard from "@/src/containers/RouteGuard";
import { Provider } from "react-redux";
import { store } from "@/src/app/redux/store";
// import "antd/dist/antd.less";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}
