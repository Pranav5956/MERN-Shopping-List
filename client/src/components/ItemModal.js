import React, { useState, useRef, Fragment } from "react";
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
import { useDispatch } from "react-redux";
import { addItemAction } from "../actions/itemActions";

function ItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();

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
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={toggleModal}>
        Add Item
      </Button>

      <Modal isOpen={isOpen} toggle={toggleModal}>
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
