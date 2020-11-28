import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "reactstrap";

import { logoutAction } from "../../actions/authActions";

function Logout() {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <NavLink onClick={() => dispatch(logoutAction())} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
}

export default Logout;
