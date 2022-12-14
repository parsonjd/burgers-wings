import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";
import Auth from "./utils/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import NoMatch from "./pages/NoMatch";
import Success from "./pages/Success";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <div className="app">
            <StoreProvider>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/orderhistory" component={OrderHistory} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/success" component={Success} />
                <Route path="*" component={NoMatch} />
              </Switch>
              <Footer />
            </StoreProvider>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
