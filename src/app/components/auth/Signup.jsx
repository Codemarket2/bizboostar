import React, { Component } from "react";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { Auth } from "aws-amplify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      verify: false,
      code: "",
      disabled: false,
      auth: false,
    };
  }

  signUp = () => {
    const { password, email, name } = this.state;

    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
      },
    })
      .then((res) => {
        this.setState({
          password: "",
          name: "",
          verify: true,
          disabled: false,
        });
        this.props.dispatch(hideLoading());
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        this.props.dispatch(hideLoading());
        alert(err.message);
      });
  };

  confirmSignUp = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: "",
          email: "",
          disabled: false,
          auth: true,
          verify: false,
        });
        this.props.dispatch(hideLoading());
        alert("Account was successfully created!");
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        this.props.dispatch(hideLoading());
        alert(err.message);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(showLoading());
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.confirmSignUp();
    } else {
      this.signUp();
    }
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, name, code, verify, disabled } = this.state;
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
              <span>Name</span>
              <input
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="input__box">
              <span>Email address</span>
              <input
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                id="email"
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
            <button disabled={disabled} type="submit" className="account__btn">
              Register
            </button>
          </div>
        </form>
      );
    }
  }
}

export default connect()(Signup);
