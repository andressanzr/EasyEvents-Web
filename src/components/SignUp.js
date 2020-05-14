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
    serverWorking: false,
    validForm: false,
    responseMsg: "",
  };
  onChangeHandler = (e) => {
    if (e.target.name === "profileFoto") {
      this.setState({
        ...this.state,
        profileFoto: e.target.files[0],
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      });
    }
  };
  onRegisterHandle = () => {
    if (
      this.state.name.length >= 3 &&
      this.state.surname.length >= 3 &&
      this.state.email.length >= 3 &&
      !isNaN(Number.parseInt(this.state.telPref)) &&
      !isNaN(Number.parseInt(this.state.tel))
    ) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        this.setState({
          ...this.state,
          responseMsg: "Email no válido",
        });
      }
      if (this.state.pass.length <= 7) {
        this.setState({
          ...this.state,
          responseMsg: "La contraseña debe tener 7 carácteres como mínimo",
        });
      }
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.state.email
        ) &&
        this.state.pass.length >= 7
      ) {
        this.setState({
          ...this.state,
          validForm: true,
        });
        this.setState({
          ...this.state,
          serverWorking: true,
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
          .then((res) => {
            if (res.data.type === "error") {
              this.setState({
                ...this.state,
                responseMsg: res.data.msg,
                serverWorking: false,
              });
            } else if (res.data.type === "success") {
              this.props.history.push("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      this.setState({
        ...this.state,
        validForm: false,
        responseMsg: "Complete todos los campos correctamente",
      });
    }
  };
  render() {
    return (
      <div className="container center-align  ">
        <h1>Registro</h1>
        <div className="row">
          <div className="col s12 m4">
            {this.state.responseMsg ? this.state.responseMsg : ""}
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
            {/* SHOWS LOADER WHEN SERVER IS WORKING */}
            {this.state.serverWorking ? (
              <div className="progress" style={{ marginTop: "30px" }}>
                <div className="indeterminate"></div>
              </div>
            ) : (
              ""
            )}
            <button
              className="btn waves-effect amber darken-2 waves-light"
              onClick={this.onRegisterHandle}
            >
              Registro
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
