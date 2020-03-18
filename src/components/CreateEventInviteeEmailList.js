import React, { Component } from "react";

export class CreateEventInviteeEmailList extends Component {
  render() {
    const emailList = this.props.emailList;
    return (
      <>
        {emailList.length > 0 ? (
          <ul className="collection">
            {emailList
              ? emailList.map(email => {
                  return (
                    <li className="collection-item" key={email}>
                      {email}
                    </li>
                  );
                })
              : ""}
          </ul>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default CreateEventInviteeEmailList;
