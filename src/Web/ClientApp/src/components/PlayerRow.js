import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import { tierColors } from "../util/values";

export default class PlayerRow extends Component {
  state = {
    currentBid: 0
  };

  handleBidChange = e => {
    if (e.target.value && e.target.validity.valid) {
      this.setState({
        currentBid: e.target.value
      });
    }
  };

  handleDraftClick = e => {
    this.props.draftPlayer(this.props.player, this.state.currentBid);
  };

  render() {
    const {
      tier,
      rank,
      name,
      position,
      team,
      value,
      drafted
    } = this.props.player;
    if (drafted) {
      return false;
    }
    return (
      <tr style={{ backgroundColor: tierColors[tier % 4] }}>
        <td>{tier}</td>
        <td>{rank}</td>
        <td>{name}</td>
        <td>{position}</td>
        <td>{team}</td>
        <td>${value}</td>
        <td>
          <input
            type="number"
            min="0"
            max={this.props.budget}
            onChange={this.handleBidChange}
            value={this.state.currentBid}
          />
        </td>
        <td>
          <button className="btn btn-primary" onClick={this.handleDraftClick}>
            Draft
          </button>
        </td>
      </tr>
    );
  }
}
