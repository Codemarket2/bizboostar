import "../node_modules/react-modal-video/scss/modal-video.scss";
import "../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ReduxLoadingBar from "react-redux-loading";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { ApolloProvider } from "@apollo/client";
import Amplify from "aws-amplify";
import "../src/app/assets/style.scss";
import reducer from "../src/app/redux/reducers";
import middleware from "../src/app/redux/middleware";
import { client } from "../src/app/graphql/index";
import aws_exports from "../src/aws-exports";
import React, { useEffect } from "react";
import { setAuthUser, initialAuthUser } from "../src/app/redux/actions/auth";

Amplify.configure(aws_exports);

const store = createStore(reducer, middleware);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ReduxLoadingBar
          style={{ color: "red", zIndex: 9989, position: "fixed", top: 0 }}
        />
        <GetData />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

// const mapStateToProps = ({ auth }) => {
//   return {
//     initial: auth.initial,
//   };
// };

const GetData = connect()((props) => {
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("unitabiz-data"));
    if (data) {
      props.dispatch(setAuthUser(data));
    } else {
      props.dispatch(initialAuthUser());
    }
  }, []);
  // return props.initial ? props.children : null;
  return null;
});
