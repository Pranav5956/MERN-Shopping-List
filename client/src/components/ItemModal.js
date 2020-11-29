import React, { useState, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddShoppingCartTwoTone } from "@material-ui/icons";

import { addItemAction } from "../actions/itemActions";

function ItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();

  var isAuthenticated = useSelector((state) => state.auth).isAuthenticated;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: nameInput,
    };

    dispatch(addItemAction(newItem));
    toggleModal();
  };

  return (
    <Fragment>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={toggleModal}
          block>
          <AddShoppingCartTwoTone className="mr-2" />
          Add Item to Shopping List
        </Button>
      ) : (
        <h2 className="mb-3 ml-4 text-center">
          Get started with Shopping List!
        </h2>
      )}

      <Modal isOpen={isOpen} toggle={toggleModal} fade centered>
        <ModalHeader toggle={toggleModal}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label htmlFor="item">Item: </Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Enter item name"
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ItemModal;
