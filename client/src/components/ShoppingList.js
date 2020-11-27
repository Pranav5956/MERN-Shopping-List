import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";

function ShoppingList() {
  const [items, setItems] = useState([
    { id: uuid(), name: "eggs" },
    { id: uuid(), name: "milk" },
  ]);

  const addItem = () => {
    const item = prompt("Enter name of item: ");
    if (item) {
      setItems([...items, { id: uuid(), name: item }]);
    }
  };

  return (
    <Container>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={addItem}>
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setItems(items.filter((item) => item.id !== id));
                  }}>
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default ShoppingList;
