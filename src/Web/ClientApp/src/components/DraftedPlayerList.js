import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

export default class DraftedPlayerList extends Component {
  handleRemoveClick = e => {};

  handleUndoClick = (draftedPlayer, e) => {
    this.props.handleUndoDraftedPlayer(draftedPlayer);
  };

  render() {
    return (
      <Col sm={2}>
        <ul className="list-group">
          {this.props.drafted.map(draftedPlayer => (
            <li key={draftedPlayer.name} className="list-group-item">
              {draftedPlayer.position} - {draftedPlayer.name} (
              {draftedPlayer.team}){" "}
              <Button onClick={this.handleUndoClick.bind(this, draftedPlayer)}>
                Undo
              </Button>
            </li>
          ))}
        </ul>
      </Col>
    );
  }
}
