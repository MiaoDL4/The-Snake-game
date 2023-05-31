import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MERCH } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auth from "../utils/auth";

const Shop = () => {
  const [state, setState] = useState();
  const [currency, setCurrency] = useState();
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_MERCH);
  const [addItem] = useMutation(ADD_ITEM);

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
      setCurrency(user.currecy);
      console.log('```````````````````````````')
      console.log(filteredItems)
    }
  }, [user]);

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

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    const ID = e.target.value;
    const updateItems = state.filter((item) => item._id !== ID);
    setState(updateItems);
    try {
      const { data } = await addItem({
        variables: { merch: ID },
      });
    } catch (err) {
      console.error(err);
    }
  };
  function app() {
    
  }

if(!state){
  return (
    <h4>
       loading...
    </h4>
  );
}

  return (
    <>
      <Container>
        <Row>
          {state.map((item) => (
            <Col>
              <h2>name: {item.name}</h2>
              <div>image: {item.image}</div>
              <span>description: {item.description}</span>
              <span>price: {item.price}</span>
              <button value={item._id} onClick={handleButtonSubmit}>
                purchase
              </button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Shop;
