import React from "react";
import { connect } from "react-redux";
import UnAuthorised from "./UnAuthorised";
import NotFound from "./NotFound";

const AuthRequired = (props) => (
  <div>
    {props.authenticated ? (
      props.mustAdmin ? (
        props.admin ? (
          props.children
        ) : (
          <NotFound />
        )
      ) : (
        props.children
      )
    ) : (
      <UnAuthorised redirectPath={props.redirectPath} />
    )}
  </div>
);

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    admin: auth.authenticated ? auth.data.admin : false,
  };
};
export default connect(mapStateToProps)(AuthRequired);
