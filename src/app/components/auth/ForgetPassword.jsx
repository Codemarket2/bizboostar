import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
      verify: false,
      disabled: false,
    };
  }

  forgetPassword = () => {
    const { email } = this.state;
    this.setState({ ...this.state, disabled: true });
    Auth.forgotPassword(email)
      .then((res) => {
        this.setState({
          disabled: false,
          verify: true,
        });
      })
      .catch(({ message }) => {
        this.setState({ ...this.state, disabled: false });
        alert(message);
      });
  };

  resetPassword = () => {
    const { email, code, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      Auth.forgotPasswordSubmit(email, code, password)
        .then((res) => {
          this.setState({
            code: "",
            email: "",
            password: "",
            confirmPassword: "",
            disabled: false,
          });
          this.props.changeLogin(true);
        })
        .catch((err) => {
          this.setState({ ...this.state, disabled: false });
          alert(err.message);
        });
    } else {
      alert("Password and Confirm Password doesn't Match!");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.resetPassword();
    } else {
      this.forgetPassword();
    }
    e.target.reset();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      email,
      code,
      password,
      confirmPassword,
      disabled,
      verify,
    } = this.state;
    if (verify) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <div className="input__box">
              <span>Verification Code</span>
              <input
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Verification Code"
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
            <div className="input__box">
              <span>Confirm Password</span>
              <input
                onChange={this.handleChange}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => this.props.changeLogin(true)}
              className="forget__pass"
            >
              Already have account login?
            </p>
            <button disabled={disabled} type="submit" className="account__btn">
              Forget Password
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
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => this.props.changeLogin(true)}
              className="forget__pass"
            >
              Already have account login?
            </p>
            <button disabled={disabled} type="submit" className="account__btn">
              Forget Password
            </button>
          </div>
        </form>
      );
    }
  }
}
