import React from "react";

import { Link } from "react-router-dom";
import { Component } from "react";

export class FooterEasy extends Component {
  colores = {
    colorPrimary: "#ff9800",
    colorPrimaryDark: "#f57c00",
    colorPrimaryLight: "#ffe0b2",
    colorAccent: "#03a9f4",
    colorPrimaryText: "#212121",
    colorSecondaryText: "#757575",
    colorIcons: "#212121",
    colorDivider: "#bdbdbd",
  };
  render() {
    return (
      <div>
        <div className="container center-align">
          <p>
            <b style={{ color: this.colores.colorPrimary }}>
              Evento creado con EasyEvents
            </b>
          </p>
          <h6>
            <Link to="/">Home</Link>
          </h6>
          <Link to="/" style={{ width: "100%" }}>
            <img src="/fotos/logo.png" id="logo" alt="logo" />
          </Link>
        </div>
      </div>
    );
  }
}

export default FooterEasy;
