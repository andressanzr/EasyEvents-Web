import React, { Component } from "react";
import CreateEventAddInvitees from "./CreateEventAddInvitees";
import CreateEventInviteeEmailList from "./CreateEventInviteeEmailList";

import M from "materialize-css";
import "axios";
import MapGoogle from "./MapGoogle";
import Axios from "axios";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";

export class CreateEvent extends Component {
  state = {
    matchingPlaces: [],
    currentPlaceMap: "",
    name: "",
    type: "cumpleanos",
    date: "",
    time: "",
    emailInvitados: [],
    message: ""
  };
  componentDidMount = () => {
    M.Datepicker.init(document.querySelector(".datepicker"), {
      minDate: new Date(),
      onSelect: newDate => {
        this.setState({
          ...this.state,
          date: newDate
        });
      }
    });
    M.Timepicker.init(document.querySelector(".timepicker"), {
      onSelect: (hours, minutes) => {
        this.setState({
          ...this.state,
          time: new Date(0, 0, 0, hours, minutes, 0, 0)
        });
      }
    });
    M.FormSelect.init(document.querySelector("select"), {});
    M.Autocomplete.init(document.querySelector("#lugar"), {});
  };
  handlePlaceSearch = e => {
    if (e.target.value.length > 3) {
      var url =
        "https://api.locationiq.com/v1/autocomplete.php?key=e08e62fc6c9381&q=" +
        e.target.value;
      Axios.get(url)
        .then(data => {
          var placesNames = [];
          if (data) {
            data.data.map(place => {
              return placesNames.push(place.display_name);
            });
            this.setState({
              ...this.state,
              matchingPlaces: placesNames
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        ...this.state,
        matchingPlaces: []
      });
    }
  };
  handlePlaceEntered = (e, val) => {
    console.log(val);
    this.setState({
      ...this.state,
      currentPlaceMap: val
    });
  };
  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  addEmailToState = email => {
    var myEmailArray;
    if (this.state.emailInvitados) {
      myEmailArray = this.state.emailInvitados;
    } else {
      myEmailArray = new []();
    }
    myEmailArray.push(email);
    this.setState({
      ...this.state,
      emailInvitados: myEmailArray
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

    if (
      type !== "" &&
      name !== "" &&
      date !== "" &&
      time !== "" &&
      message !== "" &&
      place !== ""
    ) {
      Axios.post("http://localhost:7777/event/save", {
        type,
        name,
        date,
        time,
        message,
        place,
        emailInvitees
      });
    } else {
      console.log("empty");
    }
  };
  componentWillUpdate(prevState) {
    if (prevState === this.state) return false;
    else return true;
  }
  render() {
    const theme = createMuiTheme({
      color: "red"
    });
    return (
      <div className="container" id="createEventContainer">
        <h1 style={{ fontSize: "4rem" }}>Crear evento</h1>
        <p>Introduce los datos del evento</p>

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
            <ThemeProvider theme={theme}>
              <AutoComplete
                id="Lugar"
                options={this.state.matchingPlaces}
                onChange={this.handlePlaceEntered}
                renderInput={params => (
                  <TextField
                    {...params}
                    onChange={this.handlePlaceSearch}
                    label="Lugar"
                    margin="normal"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </ThemeProvider>
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
            />
            <label htmlFor="textarea1">Mensaje</label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn waves-effect amber darken-2 waves-light"
            onClick={this.sendData}
          >
            Crear
            <i className="material-icons right">send</i>
          </button>
        </div>
        <MapGoogle query={this.state.currentPlaceMap || "madrid"} />
      </div>
    );
  }
}

export default CreateEvent;
