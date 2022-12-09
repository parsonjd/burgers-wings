import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const { token } = mutationResponse.data.login;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <Link to="/signup" className="brown-text flex-row go-back">
          ← Do you have an account? If not, signup first!
        </Link>

        <h3 className="center-align brown-text login">Login</h3>
        <form className="col s12" onSubmit={handleFormSubmit}>
          <div className="row flex-row">
            <div className="input-field col s10">
              <input
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-field col s10">
              <input
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
              <label htmlFor="pwd">Password</label>
            </div>
          </div>
          {error ? (
            <div>
              <p className="error-text">This combination is invalid!</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button
              className="btn-large waves-effect waves-light brown"
              type="submit"
              name="action"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
