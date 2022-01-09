import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Editpizza() {
  const dispatch = useDispatch();
  const { pizzaid } = useParams();

  const [name, setName] = useState("");
  const [smallprice, setSmallprice] = useState();
  const [mediumprice, setMediumprice] = useState();
  const [largeprice, setLargeprice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const getpizzabyidState = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getpizzabyidState;

  const editpizzaState = useSelector((state) => state.editPizzaReducer);
  const { editloading, editerror, editsuccess } = editpizzaState;

  useEffect(() => {
    if (pizza) {
      if (pizza._id == pizzaid) {
        setName(pizza.name);
        setDescription(pizza.description);
        setCategory(pizza.category);
        setSmallprice(pizza.prices[0]["small"]);
        setMediumprice(pizza.prices[0]["medium"]);
        setLargeprice(pizza.prices[0]["large"]);
        setImage(pizza.image);
      } else {
        dispatch(getPizzaById(pizzaid));
      }
    } else {
      dispatch(getPizzaById(pizzaid));
    }
  }, [pizza, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id: pizzaid,
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

    dispatch(editPizza(editedpizza));
  }

  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1> Edit Pizza </h1>
        {loading && <Loading />}
        {error && <Error error="Something went wrong!" />}
        {editsuccess && (
          <Success success="Pizza details edited successfully!" />
        )}
        {editloading && <Loading />}

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
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
