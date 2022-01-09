import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
import AdminView from "../components/AdminView";

export default function Addpizza() {
  const [name, setName] = useState("");
  const [smallprice, setSmallprice] = useState();
  const [mediumprice, setMediumprice] = useState();
  const [largeprice, setLargeprice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const addpizzaState = useSelector((state) => state.addPizzaReducer);
  const { success, error, loading } = addpizzaState;

  function formHandler(e) {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    dispatch(addPizza(pizza));
  }

  return (
    <AdminView>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Add pizza</h1>

        {loading && <Loading />}
        {error && <Error error="Something went wrong!" />}
        {success && <Success success="New pizza added successfully!" />}

        <form className="f-class" onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Small Price"
            value={smallprice}
            onChange={(e) => {
              setSmallprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Medium Price"
            value={mediumprice}
            onChange={(e) => {
              setMediumprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Large Price"
            value={largeprice}
            onChange={(e) => {
              setLargeprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button className="btn m-3" type="submit">
            Add Pizza
          </button>
        </form>
      </div>
    </AdminView>
  );
}
