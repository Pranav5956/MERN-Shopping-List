import React, { Fragment, useState } from "react";
import { EditTwoTone } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { updateItemAction } from "../actions/itemActions";

function UpdateItemModal({ id, name, purchased }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [purchasedInput, setPurchasedInput] = useState(purchased);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      (nameInput !== "" && nameInput !== name) ||
      purchasedInput !== purchased
    ) {
      const itemParams = {
        name: nameInput,
        purchased: purchasedInput,
      };
      dispatch(updateItemAction(id, itemParams));
    }

    toggleModal();
  };

  return (
    <Fragment>
      <Button
        className="edit-btn mr-2"
        color="primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}>
        <EditTwoTone />
      </Button>

      <Modal isOpen={isOpen} toggle={toggleModal} fade centered>
        <ModalHeader toggle={toggleModal}>Update Item: {name}</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name: </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter item name"
                value={nameInput}
                className="mb-3"
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="purchased"
                id="purchased"
                checked={purchasedInput}
                onChange={(e) => {
                  setPurchasedInput(e.target.checked);
                }}
              />
              <Label htmlFor="purchased">Purchased </Label>
            </FormGroup>
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Update
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default UpdateItemModal;
