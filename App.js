import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx`,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`
  }
});

const initialState = {
  action: "",
  name: "Unknown User",
  avatar: "http://bit.ly/2PpTKD3"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.avatar };
    case "CLOSE_CARD":
      return { ...state, action: "closeCard" };
    case "OPEN_CARD":
      return { ...state, action: "openCard" };
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    case "OPEN_NOTIF":
      return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF":
      return { ...state, action: "closeNotif" };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  /** Provider acts as the redux-store where you can store all the data and
   * pass it down to all of the inner components which in this case is the Homescreen
   */
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
);

export default App;
