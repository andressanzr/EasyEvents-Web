import React from "react";
import { Link } from "react-router-dom";
import FooterEasy from "./FooterEasy";
export default function NotFound() {
  return (
    <div className="container center-align">
      <h1>Error 404</h1>
      <h2>La ruta no existe</h2>
      <FooterEasy />
    </div>
  );
}
