import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { registerAction } from "../../actions/authActions";
import { clearErrorsAction } from "../../actions/errorActions";

function RegisterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [message, setMessage] = useState("");

  var isAuthenticated = useSelector((state) => state.auth).isAuthenticated;
  const errorState = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for register error
    if (errorState.id === "REGISTER_FAIL") {
      setMessage(errorState.msg);
    }

    if (isOpen && isAuthenticated) {
      setMessage("");
      toggleModal();
    }
  }, [errorState.msg, isOpen, isAuthenticated]);

  const toggleModal = () => {
    if (message) {
      setMessage("");
      dispatch(clearErrorsAction());
    }
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    };

    dispatch(registerAction(newUser));
  };

  return (
    <Fragment>
      <NavLink onClick={toggleModal} href="#">
        Register
      </NavLink>

      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Register</ModalHeader>
        <ModalBody>
          {message && <Alert color="danger">{message}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name: </Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Enter name"
                className="mb-3"
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />

              <Label htmlFor="email">Email: </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="mb-3"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />

              <Label htmlFor="password">Password: </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="mb-3"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default RegisterModal;
