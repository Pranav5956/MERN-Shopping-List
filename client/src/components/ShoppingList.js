import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { RemoveShoppingCartTwoTone, CheckTwoTone } from "@material-ui/icons";

import { deleteItemAction, updateItemAction } from "../actions/itemActions";
import UpdateItemModal from "./UpdateItemModal";

function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  var isAuthenticated = useSelector((state) => state.auth).isAuthenticated;

  const togglePurchasedItem = (id, purchased) => {
    dispatch(updateItemAction(id, { purchased: !purchased }));
  };

  const deleteItem = (id) => {
    dispatch(deleteItemAction(id));
  };

  return (
    <ListGroup>
      <TransitionGroup className="shopping-list">
        {items?.map(({ _id, name, purchased }) => (
          <CSSTransition key={_id} timeout={500} classNames="fade">
            <ListGroupItem className="d-flex align-items-center">
              <h5
                className={`flex-grow-1 ${purchased && "text-muted"}`}
                style={{
                  textDecoration: `${purchased ? "line-through" : "none"}`,
                }}>
                {name}
              </h5>
              {isAuthenticated && (
                <Fragment>
                  <Button
                    className="check-btn mr-2"
                    color="success"
                    size="sm"
                    onClick={() => togglePurchasedItem(_id, purchased)}>
                    <CheckTwoTone />
                  </Button>
                  <UpdateItemModal id={_id} name={name} purchased={purchased} />
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(_id)}>
                    <RemoveShoppingCartTwoTone />
                  </Button>
                </Fragment>
              )}
            </ListGroupItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListGroup>
  );
}

export default ShoppingList;
