import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAuthUser } from "../../redux/actions/auth";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "contactvivekvt@gmail.com",
      password: "contactvivekvt@gmail.com",
      disabled: false,
      verify: false,
      code: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.verify) {
      this.verifyAccount();
    } else {
      const { email, password } = this.state;
      this.props.dispatch(showLoading());
      this.setState({ ...this.state, disabled: true });
      Auth.signIn(email, password)
        .then((res) => {
          this.props.dispatch(hideLoading());
          const data = {
            attributes: res.attributes,
            signInUserSession: res.signInUserSession,
          };

          this.props.dispatch(setAuthUser(data));

          localStorage.setItem("unitabiz-data", JSON.stringify(data));
          // console.log(
          //   res.signInUserSession.accessToken.payload["cognito:groups"][0]
          // );
          // console.log("====================================");
          // console.log(res);
          // console.log("====================================");

          this.setState({ ...this.state, disabled: false });
        })
        .catch((err) => {
          this.props.dispatch(hideLoading());
          this.setState({ ...this.state, disabled: false });
          if (err.code === "UserNotConfirmedException") {
            this.sendVerificationCode(email);
          } else {
            alert(err.message);
          }
        });
    }
  };

  sendVerificationCode = (email) => {
    Auth.resendSignUp(email)
      .then(() => {
        this.setState({
          ...this.state,
          disabled: false,
          verify: true,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          disabled: false,
        });
      });
  };

  verifyAccount = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: "",
          email: "",
          password: "",
          verify: false,
          disabled: false,
        });
      })
      .catch(() => {
        this.setState({ ...this.state, disabled: false });
        alert("Something went wrong please try again");
      });
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, disabled, verify, code } = this.state;
    if (verify) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <div className="input__box">
              <span>Verify your email!</span>
              <small>Verification code has been sent to {email}</small>
              <input
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Enter Verification Code"
                required
              />
            </div>
            <button disabled={disabled} type="submit" className="account__btn">
              Verify
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <div className="input__box">
              <span>Email</span>
              <input
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input__box">
              <span>Password</span>
              <input
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <p
              onClick={() => this.props.changeLogin(false)}
              className="forget__pass"
              style={{ cursor: "pointer" }}
            >
              Lost your password?
            </p>
            <button disabled={disabled} type="submit" className="account__btn">
              Login
            </button>
          </div>
        </form>
      );
    }
  }
}

export default connect()(Signin);
