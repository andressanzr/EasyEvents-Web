import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div className="container center-align  ">
        <h1>Login</h1>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="text" name="" id="email" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="pass">Contraseña</label>
              <input type="password" name="" id="pass" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <button className="btn waves-effect amber darken-2 waves-light">
              Login
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <Link to="/passwordreset">Recuperar contraseña</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
