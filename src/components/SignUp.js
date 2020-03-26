import React, { Component } from "react";
import Axios from "axios";

export class SignUp extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    pass: "",
    telPref: "",
    tel: "",
    profilePhoto: "",
    serverWorking: false
  };
  onChangeHandler = e => {
    if (e.target.name === "profileFoto") {
      this.setState({
        ...this.state,
        profileFoto: e.target.files[0]
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      });
    }
  };
  onRegisterHandle = () => {
    this.setState({
      ...this.state,
      serverWorking: true
    });
    var fd = new FormData();
    fd.append("name", this.state.name);
    fd.append("surname", this.state.surname);
    fd.append("email", this.state.email);
    fd.append("pass", this.state.pass);
    fd.append("telPref", this.state.telPref);
    fd.append("tel", this.state.tel);
    fd.append("profilePhoto", this.state.profilePhoto);

    Axios.post("http://localhost:7777/user/save", fd)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          console.log("registered!");
          this.setState({
            ...this.state,
            serverWorking: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container center-align  ">
        <h1>Registro</h1>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="surname">Apellido</label>
              <input
                type="text"
                name="surname"
                id="surname"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="pass">Contraseña</label>
              <input
                type="password"
                name="pass"
                id="pass"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="telPref">Prefijo</label>
              <input
                type="number"
                name="telPref"
                id="telPref"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <label htmlFor="tel">Teléfono</label>
              <input
                type="number"
                name="tel"
                id="tel"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <p>
                <label
                  htmlFor="profilePhoto"
                  className="btn amber darken-2 "
                  style={{ cursor: "pointer" }}
                >
                  Subir Foto
                </label>
              </p>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                accept="image/*"
                onChange={this.onChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <button
              className="btn waves-effect amber darken-2 waves-light"
              onClick={this.onRegisterHandle}
            >
              Registro
            </button>
            {/* SHOWS LOADER WHEN SERVER IS WORKING */}
            {this.state.serverWorking ? (
              <div className="progress" style={{ marginTop: "30px" }}>
                <div className="indeterminate"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
