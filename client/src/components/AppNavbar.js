import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { useSelector } from "react-redux";
import { ShoppingCartTwoTone } from "@material-ui/icons";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  var isAuthenticated = useSelector((state) => state.auth).isAuthenticated;
  var username = useSelector((state) => state.auth).user?.name;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const guestLinks = (
    <Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{username && `Welcome, ${username}!`}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment className="appNavbar">
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            <ShoppingCartTwoTone
              style={{ fontSize: "2rem" }}
              className="mr-3"
            />
            Shopping List
          </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default AppNavbar;
