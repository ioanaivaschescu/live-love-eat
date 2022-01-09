import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Registerscreen() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;

  const dispatch = useDispatch();

  function register() {
    if (password != confirmPassword) {
      alert("Passwords don't match!");
    } else {
      const user = {
        name,
        email,
        password,
        confirmPassword,
      };
      dispatch(registerUser(user));
    }
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    let errors = {};

    if (password !== confirmPassword)
      errors.password = "Passwords must match !";

    if (!validateEmail(email)) errors.email = "This is not a valid email !";

    if (name.trim() === "") errors.name = "Username must not be empty !";
    if (email.trim() === "") errors.email = "Email must not be empty !";
    if (password.trim() === "")
      errors.password = "Password must not be empty !";
    if (confirmPassword.trim() === "")
      errors.confirmPassword = "Confirm password must not be empty !";

    if (Object.keys(errors).length > 0) {
      setErrorMessages(Object.keys(errors).map((error) => errors[error]));
    }
  }, [error]);

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {success && <Success success="User registered successfully" />}
          {error && <Error errors={errorMessages} />}

          <h2 className="m-2" style={{ fontSize: "35px" }}>
            {" "}
            Register{" "}
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="E-mail"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button onClick={register} className="btn mt-3 mb-3">
              REGISTER
            </button>
            <br />
            <a style={{ color: "black" }} href="/login">
              {" "}
              Click here to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
