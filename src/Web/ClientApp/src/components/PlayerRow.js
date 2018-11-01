import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import { tierColors } from "../util/values";

export default class PlayerRow extends Component {
  state = {
    currentBid: 0,
    owner: null
  };

  handleBidChange = e => {
    if (e.target.value && e.target.validity.valid) {
      this.setState({
        currentBid: e.target.value
      });
    }
  };

  handleTeamChange = e => {
    console.log(e.target.value);
    this.setState({
      owner: e.target.value
    });
  };

  handleDraftClick = e => {
    this.props.draftPlayer(
      this.props.player,
      this.state.currentBid,
      this.state.owner
    );

    this.setState({
      currentBid: 0,
      owner: null
    });
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
    const teamOptions = [<option key={0} />];
    for (let i = 1; i <= 12; i++) {
      teamOptions.push(
        <option key={i} value={i}>
          Team {i}
        </option>
      );
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
          <select onChange={this.handleTeamChange}>{teamOptions}</select>
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={this.handleDraftClick}
            disabled={!this.state.owner}
          >
            Draft
          </button>
        </td>
      </tr>
    );
  }
}
