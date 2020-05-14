import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  state = {
    idEvento: "",
  };
  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <div className="container center-align" id="homeContainer">
          <img src="/fotos/logo.png" id="logo" alt="logo" />
          <div className="row">
            <div id="homeBox1" className="roundedBox col s12 m6">
              <h5>Crea un evento</h5>
              <Link to="/crearevento">
                <p className="btnHome">Crear Evento</p>
              </Link>
            </div>
          </div>
          <div className="row">
            <div id="homeBox2" className="roundedBox col s12 m6">
              <h5>Modificar tu evento</h5>
              <Link to="/updateevent">
                <p className="btnHome">Modificar Evento</p>
              </Link>
            </div>
          </div>
          <div className="row">
            <div id="homeBox3" className="roundedBox col s12 m6">
              <h5>Introduce la ID del evento</h5>
              <p>
                <input
                  type="number"
                  name="idEvento"
                  onChange={this.handleInputChange}
                  id=""
                  style={{
                    width: "20%",
                    borderColor: "var(--colorPrimaryDark)",
                  }}
                />
              </p>
              <Link to={"/infoevento/" + this.state.idEvento}>
                <p className="btnHome">Ver Evento</p>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
