import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "reactstrap";
import { ExitToAppTwoTone } from "@material-ui/icons";

import { logoutAction } from "../../actions/authActions";
import { clearItemsAction } from "../../actions/itemActions";

function Logout() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    dispatch(clearItemsAction());
  };

  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        <ExitToAppTwoTone className="mr-1" />
        Logout
      </NavLink>
    </Fragment>
  );
}

export default Logout;
