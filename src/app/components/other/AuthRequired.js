import React from "react";
import { connect } from "react-redux";
import UnAuthorised from "./UnAuthorised";
import NotFound from "./NotFound";

const AuthRequired = (props) => (
  <div>
    {props.initial ? (
      props.authenticated ? (
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
      )
    ) : null}
  </div>
);

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    admin: auth.authenticated ? auth.data.admin : false,
    initial: auth.initial,
  };
};
export default connect(mapStateToProps)(AuthRequired);
