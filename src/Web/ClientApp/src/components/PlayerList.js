import React, { Component } from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PlayerRow from "../components/PlayerRow";
import { positions, teams, tierColors } from "../util/values";

class PlayerFilter extends Component {
  state = {};

  handlePositionChange = e => {
    this.props.changePosition(e.target.value);
  };

  handleTeamChange = e => {
    this.props.changeTeam(e.target.value);
  };

  render() {
    return (
      <Col sm={12}>
        <span>
          <label htmlFor="position">Position</label>
          <select id="position" onChange={this.handlePositionChange}>
            {positions.map(position => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </span>
        <span>
          <label htmlFor="team">Team</label>
          <select id="team" onChange={this.handleTeamChange}>
            {teams.sort().map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </span>
      </Col>
    );
  }
}

export default class PlayerList extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    handleDraftPlayer: PropTypes.func.isRequired
  };

  static defaultProps = {
    players: []
  };

  state = {
    loading: true,
    position: "ALL",
    team: "ALL"
  };

  changePosition = position => {
    if (positions.includes(position)) {
      this.setState({
        position
      });
    }
  };

  changeTeam = team => {
    if (teams.includes(team)) {
      this.setState({
        team
      });
    }
  };

  draftPlayer = (player, bid, owner) => {
    this.props.handleDraftPlayer(player, bid, owner);
  };

  render() {
    return (
      <Col sm={10}>
        <PlayerFilter
          changePosition={this.changePosition}
          changeTeam={this.changeTeam}
        />
        <span>{this.state.remainingBudget}</span>
        <table className="table">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Overall</th>
              <th>Player</th>
              <th>Position</th>
              <th>Team</th>
              <th>Maximum Value</th>
              <th>Bid</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.players
              .filter(({ value }) => this.props.budget >= value)
              .filter(
                ({ position }) =>
                  this.state.position === "ALL" ||
                  this.state.position === position
              )
              .filter(
                ({ team }) =>
                  this.state.team === "ALL" || this.state.team === team
              )
              .map(player => (
                <PlayerRow
                  key={player.name}
                  player={player}
                  budget={this.props.budget}
                  draftPlayer={this.draftPlayer}
                />
              ))}
          </tbody>
        </table>
      </Col>
    );
  }
}
