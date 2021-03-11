import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }
const link = new HttpLink({
  uri: "https://sup-boot.herokuapp.com/graphql"
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: relayStylePagination(),
        stores: relayStylePagination(),
        inboundOrders: relayStylePagination()
      }
    }
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

const client = new ApolloClient({
  link,
  cache,
  defaultOptions
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
