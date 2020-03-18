import React, { Component } from "react";

export class MapGoogle extends Component {
  render() {
    return (
      <div>
        <iframe
          title="Mapa"
          width="100%"
          height="500"
          frameBorder="0"
          style={{ border: "0" }}
          src={
            "https://www.google.com/maps/embed/v1/place?key=AIzaSyDKe59cKaR_I1I593KQHxXjK7tbkr81SnI&q=" +
            this.props.query
          }
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}

export default MapGoogle;
