import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { loadUserAction } from "./actions/authActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
