import React, { Component } from "react";
import Axios from "axios";
import MapGoogle from "./MapGoogle";
import { Link } from "react-router-dom";
import FooterEasy from "./FooterEasy";

export class EventInfo extends Component {
  state = {
    name: "",
    type: "",
    date: "",
    dateCreated: "",
    emailInvitados: [],
    message: "",
    place: "",
    hostName: "",
    publicIdCode: "",
    serverWorking: true,
    eventFound: false,
  };
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
  componentDidMount = () => {
    var publicId = this.props.match.params.id;
    Axios.get("http://localhost:7777/event/" + publicId)
      .then((res) => {
        console.log(res);
        if (res.data.type === "success") {
          var eventData = res.data.msg;
          var eventTypeCorrectSpelling;
          if (eventData.type === "cumpleanos") {
            eventTypeCorrectSpelling = "Cumpleaños";
          } else if (eventData.type === "despedidadSoltero") {
            eventTypeCorrectSpelling = "Despedida de soltero";
          } else if (eventData.type === "babyShower") {
            eventTypeCorrectSpelling = "Baby shower";
          } else if (eventData.type === "boda") {
            eventTypeCorrectSpelling = "Boda";
          } else if (eventData.type === "fiesta") {
            eventTypeCorrectSpelling = "Fiesta";
          }
          this.setState({
            name: eventData.name,
            type: eventTypeCorrectSpelling,
            date: eventData.date,
            dateCreated: eventData.dateCreated,
            emailInvitados: eventData.guestsEmails,
            hostName: eventData.hostName,
            place: eventData.place,
            publicIdCode: eventData.publicIdCode,
            message: eventData.message,
            eventFound: true,
            serverWorking: false,
          });
        } else if (res.data.type == "error") {
          this.setState({
            eventFound: false,
            serverWorking: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <div className="container" id="createEventContainer">
          {this.state.serverWorking == false &&
          this.state.eventFound == false ? (
            <div className="container center-align">
              <h3>
                El evento con el id: {this.props.match.params.id} no existe
              </h3>
              <h6>
                <Link to="/">Home</Link>
              </h6>
              <Link to="/" style={{ width: "100%" }}>
                <img src="/fotos/logo.png" id="logo" alt="logo" />
              </Link>
            </div>
          ) : (
            ""
          )}
          {this.state.serverWorking ? (
            <div className="progress" style={{ marginTop: "30px" }}>
              <div className="indeterminate"></div>
            </div>
          ) : this.state.eventFound ? (
            <div>
              <h1 style={{ color: this.colores.colorPrimary }}>
                {this.state.name}
              </h1>
              <h5 style={{ color: this.colores.colorAccent }}>
                CódigoIDPúblico: {this.props.match.params.id}
              </h5>
              <h5 style={{ color: this.colores.colorPrimaryDark }}>
                {this.state.type}
              </h5>
              <h5 style={{ color: this.colores.colorAccent }}>
                Anfitrión: {this.state.hostName}
              </h5>
              <h5>Lugar: {this.state.place}</h5>
              <p
                style={{
                  float: "right",
                }}
              >
                <b>
                  Fecha y hora: {new Date(this.state.date).toLocaleString()}
                </b>
              </p>
              <h6 style={{ color: this.colores.colorPrimary }}>Mensaje:</h6>{" "}
              <p>
                <em>"{this.state.message}"</em>
              </p>
              <MapGoogle query={this.state.place} />
              <p
                style={{
                  float: "right",
                }}
              >
                Fecha creado:{" "}
                {new Date(this.state.dateCreated).toLocaleString()}
              </p>
              <FooterEasy />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default EventInfo;
