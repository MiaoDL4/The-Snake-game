import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery , useMutation } from "@apollo/client";
import { QUERY_MERCH } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations"

import Auth from "../utils/auth";

const Shop = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_MERCH);

  const [addItem] = useMutation(ADD_ITEM);

  const user = data?.me;

  const items = data?.merch;


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
    console.log(ID)

    try {
      // eslint-disable-next-line
      const { data } = await addItem({
        variables: { merch: ID },
      });
    } catch (err) {
 
      console.error(err);
    }
  };

  return (
    <>
    {items.map((item) => (
        <div>
          <h2>name: {item.name}</h2>
          <div>image: {item.image}</div>
          <span>description: {item.description}</span>
          <span>price: {item.price}</span>
          <button value={item._id} onClick={handleButtonSubmit}> purchase</button>
        </div>
        ))}
    </>
  );
};

export default Shop;
