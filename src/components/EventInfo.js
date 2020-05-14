import React, { Component } from "react";
import Axios from "axios";
import MapGoogle from "./MapGoogle";

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
    console.log(this.props.match.params.id);
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
          {this.state.name ? (
            <div>
              <h1 style={{ color: this.colores.colorPrimary }}>
                {this.state.name}
              </h1>
              <h5 style={{ color: this.colores.colorPrimaryDark }}>
                {this.state.type}
              </h5>
              <h5 style={{ color: this.colores.colorAccent }}>
                Anfitrión: {this.state.hostName}
              </h5>
              <h5>Lugar: {this.state.place}</h5>
              <p>Fecha: {new Date(this.state.date).toLocaleString()}</p>
              <p>
                Fecha creado:{" "}
                {new Date(this.state.dateCreated).toLocaleString()}
              </p>
              <p>Mensaje: {this.state.message}</p>
              <MapGoogle query={this.state.place} />
              <div className="container center-align">
                <p>
                  <b style={{ color: this.colores.colorPrimary }}>
                    Evento creado con EasyEvents
                  </b>
                </p>
                <img src="/fotos/logo.png" id="logo" alt="logo" />
              </div>
            </div>
          ) : (
            <div className="container center-align">
              <h3>
                El evento con el id: {this.props.match.params.id} no existe
              </h3>
              <img src="/fotos/logo.png" id="logo" alt="logo" />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default EventInfo;
