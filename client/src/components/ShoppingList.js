import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getItemsAction, deleteItemAction } from "../actions/itemActions";

function ShoppingList() {
  const dispatch = useDispatch();
  var items = useSelector((state) => state.item).items;
  var isAuthenticated = useSelector((state) => state.auth).isAuthenticated;

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);

  const deleteItem = (id) => {
    dispatch(deleteItemAction(id));
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated && (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(_id)}>
                    &times;
                  </Button>
                )}

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
