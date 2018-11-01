import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

export default class DraftedPlayerList extends Component {
  handleRemoveClick = e => {};

  handleUndoClick = (draftedPlayer, e) => {
    this.props.handleUndoDraftedPlayer(draftedPlayer);
  };

  render() {
    const teamPlayers = [];
    for (let i = 1; i <= 12; i++) {
      const currentTotal = this.props.drafted
        .filter(p => p.owner === i)
        .reduce((total, { finalBid }) => {
          return total + finalBid;
        }, 0);
      teamPlayers.push(
        <div>
          <h3>
            Team {i} - ${this.props.budget - currentTotal}
          </h3>
          <ul className="list-group">
            {this.props.drafted
              .filter(draftedPlayer => draftedPlayer.owner === i)
              .map(draftedPlayer => (
                <li key={draftedPlayer.name} className="list-group-item">
                  {draftedPlayer.position} - {draftedPlayer.name} (
                  {draftedPlayer.team}) [$
                  {draftedPlayer.finalBid}]{" "}
                  <Button
                    onClick={this.handleUndoClick.bind(this, draftedPlayer)}
                  >
                    Undo
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return <Col sm={2}>{teamPlayers}</Col>;
  }
}
