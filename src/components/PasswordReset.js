import React, { Component } from "react";

export class PasswordReset extends Component {
  render() {
    return (
      <div className="container center-align">
        <div className="row">
          <h1>Recupera tu contraseña</h1>
          <div className="col s12 m4">
            <p>
              Introduce tu email y te mandaremos un link para que cambies tu
              contraseña
            </p>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" name="" id="email" />
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4">
              <button className="btn waves-effect amber darken-2 waves-light">
                Recuperar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
