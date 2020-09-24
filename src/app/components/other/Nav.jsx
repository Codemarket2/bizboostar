import React, { useState } from "react";
import { Link } from "next/link";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { unsetAuthUser } from "../../redux/actions/auth";
import { setRedirectPath } from "../../redux/actions/redirect";

const NavC = (props) => {
  const { ivdrips, therapies, teams, services } = props.data;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Auth.signOut().then(() => {
      localStorage.removeItem("frontend-starter");
      props.dispatch(unsetAuthUser());
    });
  };
  const handleRedirect = () => {
    props.dispatch(setRedirectPath("/"));
  };

  return (
    <>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand tag={Link} href="/">
          Unitabiz
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} href="/">
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Data
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem tag={Link} href="/map">
                  Map
                </DropdownItem> */}
                <DropdownItem tag={Link} href="/data/yelp">
                  Yelp Scrapper
                </DropdownItem>
                <DropdownItem tag={Link} href="/data/linkedin">
                  LinkedIn Scrapper
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                SES
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem tag={Link} href="/map">
                  Map
                </DropdownItem> */}
                <DropdownItem tag={Link} href="/createemailtemplate">
                  Create Email Template
                </DropdownItem>
                <DropdownItem tag={Link} href="/sendtemplateemail">
                  Send Template Email
                </DropdownItem>
                <DropdownItem tag={Link} href="/email">
                  Email
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} href="/admin/offices">
                  Manage Offices
                </DropdownItem>
                <DropdownItem tag={Link} href="/admin/sliders">
                  Manage Slider
                </DropdownItem>
                <DropdownItem tag={Link} href="/admin/forms">
                  Manage Forms
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {props.auth.authenticated ? (
            <>
              <NavbarText className="pr-2 text-light">
                <img
                  className="my-n3 mr-1"
                  style={{ width: "40px", borderRadius: "50%" }}
                  //  src={
                  //   props.auth.data.attributes.imageUrl
                  //     ? props.auth.data.attributes.imageUrl
                  //     : require("../../../assets/default.jpg")
                  // }
                  src={require("../../../assets/default.jpg")}
                />
                {props.auth.data.attributes.name}
              </NavbarText>
              <NavbarText className="py-0">
                <Button onClick={handleLogout} color="light" outline>
                  Logout
                </Button>
              </NavbarText>
            </>
          ) : (
            <NavbarText className="py-0">
              <Link onClick={handleRedirect} href="/signin">
                <Button color="light" outline>
                  SignUp/SignIn
                </Button>
              </Link>
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(NavC);
