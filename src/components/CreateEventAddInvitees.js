import React, { Component } from "react";

export class CreateEventInvitados extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
  }
  state = {
    validEmail: true,
    emailInvitados: []
  };
  addInvitado = e => {
    if (e.key === "Enter") {
      if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        this.props.addEmailToState(e.target.value);
        const node = this.emailInput.current;
        this.setState({
          ...this.state,
          validEmail: "valid"
        });
        node.value = "";
      } else {
        this.setState({
          ...this.state,
          validEmail: "invalid"
        });
      }
    }
  };
  render() {
    return (
      <div>
        <p>Invitados</p>
        <div className="inputMaterialize input-field s12">
          <label htmlFor="invitados">Email invitado:</label>
          <input
            type="email"
            name=""
            id="invitados"
            className={"validate " + this.state.validEmail}
            onKeyDown={this.addInvitado}
            ref={this.emailInput}
          />
          <span className="helper-text" data-error="Email no válido"></span>
        </div>
      </div>
    );
  }
}

export default CreateEventInvitados;
