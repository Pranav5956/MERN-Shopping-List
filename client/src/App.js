import { useSelector, useDispatch } from "react-redux";
import { Container, Col } from "reactstrap";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { loadUserAction } from "./actions/authActions";

function App() {
  const loading = useSelector(
    (state) => state.auth.isLoading || state.item.loading
  );
  const dispatch = useDispatch();
  const progressBar = useRef(null);

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      progressBar.current.continuousStart();
    } else {
      progressBar.current.complete();
    }
  }, [loading]);

  return (
    <div className="App">
      <LoadingBar color="#964ec2" ref={progressBar} />
      <AppNavbar />
      <Container>
        <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
          <ItemModal />
          <ShoppingList />
        </Col>
      </Container>
    </div>
  );
}

export default App;
