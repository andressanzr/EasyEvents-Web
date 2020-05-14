import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export class Login extends Component {
  state = {
    email: "",
    pass: "",
    responseMsg: "",
    validForm: false,
  };
  onChangeHandler = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  onLoginHandle = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      console.log(this.state.email);
      this.setState({
        ...this.state,
        responseMsg: "Email no válido",
        validForm: false,
      });
      if (this.state.pass.length <= 7) {
        this.setState({
          ...this.state,
          responseMsg: "La contraseña debe tener 7 carácteres como mínimo",
          validForm: false,
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
          responseMsg: "Datos ok",
          validForm: true,
        });

        var fd = new FormData();
        fd.append("email", this.state.email);
        fd.append("pass", this.state.pass);
        Axios.post("http://localhost:7777/user/login", fd)
          .then((res) => {
            console.log("posted");
            if (res.data.type === "error") {
              this.setState({
                ...this.state,
                responseMsg: res.data.msg,
              });
            } else if (res.data.type === "success") {
              this.props.history.push("/crearevento");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  render() {
    return (
      <div className="container center-align  ">
        <h1>Login</h1>
        <div className="row">
          <div className="col s12 m4">
            {this.state.responseMsg ? this.state.responseMsg : ""}
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
            <button
              className="btn waves-effect amber darken-2 waves-light"
              onClick={this.onLoginHandle}
            >
              Login
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <Link to="/passwordreset">Recuperar contraseña</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
