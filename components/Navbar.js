import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { unsetAuthUser } from "../src/app/redux/actions/auth";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      sticky: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    //Mobile Menu
    this.mobileMenu();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 70) {
      this.setState({
        sticky: true,
      });
    } else if (window.scrollY < 70) {
      this.setState({
        sticky: false,
      });
    }
  };

  mobileMenu = () => {
    //Mobile Menu Toggle
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    let mainNavContent = document.querySelector(".main-nav__main-navigation")
      .innerHTML;
    mobileNavContainer.innerHTML = mainNavContent;

    document
      .querySelector(".side-menu__toggler")
      .addEventListener("click", function (e) {
        document.querySelector(".side-menu__block").classList.toggle("active");
        e.preventDefault();
      });

    //Close Mobile Menu
    document
      .querySelector(".side-menu__close-btn")
      .addEventListener("click", function (e) {
        document.querySelector(".side-menu__block").classList.remove("active");
        e.preventDefault();
      });
  };

  handleLogout = () => {
    Auth.signOut().then(() => {
      localStorage.removeItem("unitabiz-data");
      this.props.dispatch(unsetAuthUser());
    });
  };

  render() {
    return (
      <div>
        <header className="main-nav__header-one ">
          <nav
            className={
              this.state.sticky
                ? "header-navigation stricky stricked-menu stricky-fixed"
                : "header-navigation stricky"
            }
          >
            <div className="container">
              <div className="main-nav__logo-box">
                <a href="/" className="main-nav__logo">
                  <img
                    src="/assets/images/unita-logo.png"
                    width="105"
                    alt="Awesome Image"
                  />
                </a>
                <a href="#" className="side-menu__toggler">
                  <i className="fa fa-bars"></i>
                </a>
              </div>
              <div className="main-nav__main-navigation">
                <ul className="one-page-scroll-menu main-nav__navigation-box">
                  <li className="current scrollToLink">
                    <a href="/">Home</a>
                  </li>
                  <li className="scrollToLink">
                    <a href="#features">Offices</a>
                    <ul>
                      <li>
                        <Link href="/blog-details">
                          <a>Offices</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Team Pods</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Co-working</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="scrollToLink">
                    <a href="#app-shots">Digital Studios</a>
                    <ul>
                      <li>
                        <Link href="/digital-studio/podcast">
                          <a>Podcast Studio</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Photo/Video Studio</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>AR/VR Studio</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="scrollToLink">
                    <a href="#app-shots">Biz Accelerator</a>
                    <ul>
                      <li>
                        <Link href="/blog-details">
                          <a>Webinars</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Member Highlights</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Office Hours</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Referral Network</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-details">
                          <a>Happy Hours</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="scrollToLink">
                    <a href="#testimonials">Testimonials</a>
                  </li>

                  <li className="scrollToLink">
                    <a href="#contact">Contact</a>
                  </li>
                  {this.props.admin && (
                    <li className="dropdown scrollToLink">
                      <a href="#blog">Admin</a>
                      <ul>
                        <li>
                          <Link href="/admin/offices">
                            <a>Manage Offices</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/sliders">
                            <a>Manage Sliders</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/forms">
                            <a>Manage Forms</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
              <div className="main-nav__right">
                {this.props.authenticated ? (
                  <button
                    type="button"
                    onClick={this.handleLogout}
                    className="thm-btn header__btn scroll-to-target text-dark"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/auth/signin">
                    <a className="thm-btn header__btn scroll-to-target">
                      SignIn
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.name : null,
    admin: auth.authenticated ? auth.data.admin : false,
  };
};

export default connect(mapStateToProps)(Navbar);
