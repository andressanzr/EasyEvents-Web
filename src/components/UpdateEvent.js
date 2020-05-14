import React, { Component } from "react";
import CreateEventAddInvitees from "./CreateEventAddInvitees";
import CreateEventInviteeEmailList from "./CreateEventInviteeEmailList";

import M from "materialize-css";
import "axios";
import MapGoogle from "./MapGoogle";
import Axios from "axios";

export class UpdateEvent extends Component {
  state = {
    currentPlaceMap: "",
    name: "",
    type: "cumpleanos",
    date: "",
    time: "",
    emailInvitados: [],
    message: "",
    hostName: "",
    publicIdCode: "",
  };
  componentDidMount() {
    var publicId = this.props.match.params.id;
    Axios.get("http://localhost:7777/event/" + publicId)
      .then((res) => {
        console.log(res);
        if (res.data.type === "success") {
          var eventData = res.data.msg;
          this.setState({
            name: eventData.name,
            type: eventData.type,
            date: eventData.date,
            dateCreated: eventData.dateCreated,
            emailInvitados: eventData.guestsEmails,
            currentPlaceMap: eventData.place,
            publicIdCode: eventData.publicIdCode,
            message: eventData.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    M.Datepicker.init(document.querySelector(".datepicker"), {
      defaultDate: new Date(this.state.date),
      setDefaultDate: true,
      minDate: new Date(),
      onSelect: (newDate) => {
        this.setState({
          ...this.state,
          date: newDate,
        });
      },
    });
    M.Timepicker.init(document.querySelector(".timepicker"), {
      onSelect: (hours, minutes) => {
        this.setState({
          ...this.state,
          time: new Date(0, 0, 0, hours, minutes, 0, 0),
        });
      },
    });
    M.FormSelect.init(document.querySelector("select"), {});
    M.Autocomplete.init(document.querySelector("#lugar"), {});
  }
  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  addEmailToState = (email) => {
    var myEmailArray;
    if (this.state.emailInvitados) {
      myEmailArray = this.state.emailInvitados;
    } else {
      myEmailArray = new []();
    }
    myEmailArray.push(email);
    this.setState({
      ...this.state,
      emailInvitados: myEmailArray,
    });
  };
  sendData = () => {
    var type = this.state.type;
    var name = this.state.name;
    var date = this.state.date;
    var time = this.state.time;
    var message = this.state.message;
    var place = this.state.currentPlaceMap;
    var emailInvitees = this.state.emailInvitados;
    var publicIdCode = this.state.publicIdCode;
    if (
      type !== "" &&
      name !== "" &&
      date !== "" &&
      time !== "" &&
      message !== "" &&
      place !== ""
    ) {
      Axios.post("http://localhost:7777/event/update", {
        publicIdCode,
        type,
        name,
        date,
        time,
        message,
        place,
        emailInvitees,
      })
        .then((res) => {
          if (res.data.type === "error") {
            this.setState({
              ...this.state,
              responseMsg: res.data.msg,
            });
          } else if (res.data.type === "success") {
            this.props.history.push("/infoevento/" + publicIdCode);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("empty");
    }
  };
  render() {
    return (
      <div className="container" id="createEventContainer">
        <h1 style={{ fontSize: "4rem" }}>Actualizar evento</h1>
        <p>Actualiza los datos del evento</p>
        <p>{this.state.responseMsg}</p>

        <div className="row">
          <label>Tipo:</label>
          <div className="input-field s12 inputMaterialize">
            <select onChange={this.handleInputChange} name="type">
              <option value="cumpleanos">Cumpleaños</option>
              <option value="boda">Boda</option>
              <option value="despedidadSoltero">Despedida de soltero</option>
              <option value="babyShower">Baby Shower</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field s12 inputMaterialize">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="name"
              id="nombre"
              className="validate"
              minLength="3"
              defaultValue={this.state.name}
              onChange={this.handleInputChange}
            />
            <span
              className="helper-text"
              data-error="Longitud mínima 3 carácteres"
            ></span>
          </div>
        </div>

        <div className="row">
          <div className="input-field s12 inputMaterialize">
            <label htmlFor="datepicker1">Fecha</label>
            <input type="text" className="datepicker" id="datepicker1" />
          </div>
        </div>
        <div className="row">
          <div className="input-field s12 inputMaterialize">
            <label htmlFor="hora">Hora</label>
            <input type="text" name="hour" id="hora" className="timepicker" />
          </div>
        </div>
        <div className="row">
          <div className="s12">
            <div className="inputMaterialize input-field s12">
              <textarea
                name="currentPlaceMap"
                className="materialize-textarea"
                defaultValue={this.state.currentPlaceMap}
                onChange={this.handleInputChange}
              />
              <label htmlFor="textarea1">Lugar</label>
            </div>
          </div>
        </div>
        <div className="row">
          <CreateEventAddInvitees addEmailToState={this.addEmailToState} />
          <CreateEventInviteeEmailList emailList={this.state.emailInvitados} />
        </div>
        <div className="row">
          <div className="inputMaterialize input-field s12">
            <textarea
              name="message"
              id="textarea1"
              className="materialize-textarea"
              onChange={this.handleInputChange}
              defaultValue={this.state.message}
            />
            <label htmlFor="textarea1">Mensaje</label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn waves-effect amber darken-2 waves-light"
            onClick={this.sendData}
          >
            Actualizar
            <i className="material-icons right">send</i>
          </button>
        </div>
        <MapGoogle query={this.state.currentPlaceMap || "madrid"} />
      </div>
    );
  }
}

export default UpdateEvent;
