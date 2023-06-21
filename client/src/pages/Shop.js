import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MERCH } from "../utils/queries";
import { PURCHASE_ITEM } from "../utils/mutations";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Auth from "../utils/auth";

const Shop = () => {
  const [state, setState] = useState();
  const [currency, setCurrency] = useState();
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_MERCH);
  const [addItem] = useMutation(PURCHASE_ITEM);
  const [showDangerAlert, setshowDangerAlert] = useState(false);
  const [showSuccessAlert, setshowSucessAlert] = useState(false);

  const user = data?.me;
  const userItems = data?.me.inventory;
  const items = data?.merch;

  useEffect(() => {
    if (items && userItems) {
      const filteredItems = items.filter((Obj1) => {
        const existing = userItems.some((Obj2) => Obj2.merch._id === Obj1._id);
        return !existing;
      });
      setState(filteredItems);
      setCurrency(user.currency);
    }
  }, [data, items, userItems]);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/store" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (!state) {
    return <h4>loading...</h4>;
  }

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    const ID = e.target.value;
    if (ID == null) {
      console.log("fail");
      console.log(state);
      console.log(ID);
      return;
    }

    const selected = state.find((seletedItem) => seletedItem._id === ID);
    alertButton();
    if (currency >= selected.price) {
      const updateItems = state.filter(
        (FilteredItem) => FilteredItem._id !== ID
      );
      const newCurrency = currency - selected.price;
      console.log(newCurrency);
      try {
        await addItem({
          variables: { merch: ID, currency: newCurrency },
        });
      } catch (err) {
        console.error(err);
      }
      setState(updateItems);
      setCurrency(newCurrency);
      setshowSucessAlert(true);
    } else {
      setshowDangerAlert(true);
    }
  };

  const alertButton = () => {
    setshowDangerAlert(false);
    setshowSucessAlert(false);
  };

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col className="pb-2">
            <Card className="bg-primary rounded-4 text-center pt-2">
              <h2> Apples: {currency}</h2>
            </Card>
          </Col>
        </Row>
        <Row>
          {state.map((item, id) => (
            <Col key={id} md={4} sm={12} className="py-2 h-100">
              <Card className="bg-primary rounded-4">
                <Card.Header>
                  <Row>
                    <Col>
                      <h2>{item.name}</h2>
                    </Col>
                    <Col className="d-flex flex-row-reverse">
                      <Button
                        className="btn-sm bg-dark"
                        key={item._id}
                        variant="outline-secondary"
                        value={item._id}
                        onClick={handleButtonSubmit}
                      >
                        {item.price} Apples
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="pb-1 text-center">
                    <Row>
                      <Col>
                        <div
                          className="rounded-3"
                          style={{
                            color: item.modifierSnake,
                          }}
                        >
                          Snake
                        </div>
                      </Col>
                      <Col>
                        <div
                          className="rounded-3"
                          style={{
                            color: item.modifierBoard,
                          }}
                        >
                          Board
                        </div>
                      </Col>
                      <Col>
                        <div
                          className="rounded-3"
                          style={{
                            color: item.modifierFood,
                          }}
                        >
                          Apple
                        </div>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Alert
        show={showDangerAlert}
        variant="danger"
        className="text-center position-absolute top-50 start-50 translate-middle"
      >
        <h4>
          Not enough currency{" "}
          <Button variant="danger" onClick={alertButton}>
            X
          </Button>
        </h4>
      </Alert>
      <Alert
        show={showSuccessAlert}
        variant="success"
        className="text-center position-absolute top-50 start-50 translate-middle"
      >
        <h4>
          Item purchased{" "}
          <Button variant="success" onClick={alertButton}>
            X
          </Button>
        </h4>
      </Alert>
    </>
  );
};

export default Shop;
