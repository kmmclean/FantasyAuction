import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import PlayerList from "./PlayerList";
import DraftedPlayerList from "./DraftedPlayerList";
import { getPlayers } from "../util/api";
import { budgets } from "../util/values";

export default class DraftBoard extends Component {
  state = {
    loading: true,
    players: [],
    drafted: [],
    budget: 100
  };

  async componentDidMount() {
    const players = await getPlayers();

    this.setState((prevState, props) => ({
      loading: false,
      players
    }));
  }

  async handleBudgetChange(event) {
    const budget = event.target.value;
    
    this.setState({
      loading: true,
      budget: event.target.value
    });

    
    const players = await getPlayers(budget);

    this.setState({
      players,
      loading: false
    });
  }

  handleDraftPlayer = (player, bid, owner) => {
    let { players, drafted, budget } = this.state;

    const draftedPlayer = players.find(p => p === player);
    draftedPlayer.drafted = true;
    draftedPlayer.finalBid = Number.parseInt(bid);
    draftedPlayer.owner = Number.parseInt(owner);
    drafted.push(draftedPlayer);

    this.setState({
      drafted
    });
  };

  handleUndoDraftedPlayer = player => {
    let { players, drafted, budget } = this.state;

    const draftedPlayer = players.find(p => p === player);

    this.setState({
      drafted: drafted.filter(p => p !== draftedPlayer)
    });

    draftedPlayer.drafted = false;
    draftedPlayer.owner = null;
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <label htmlFor="budget">Budget</label>
            <select id="budget" onChange={this.handleBudgetChange.bind(this)}>
              {budgets.map(b => (
                <option key={b} value={b} defaultValue={this.state.budget}>
                  ${b}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          {this.state.loading ? (
            <div>
              <h1>Loading</h1>
            </div>
          ) : (
            <div>
              <PlayerList
                players={this.state.players}
                handleDraftPlayer={this.handleDraftPlayer}
                budget={this.state.budget}
              />
              <DraftedPlayerList
                drafted={this.state.drafted}
                handleUndoDraftedPlayer={this.handleUndoDraftedPlayer}
                leagueSize={this.state.leagueSize}
                budget={this.state.budget}
              />
            </div>
          )}
        </Row>
      </Grid>
    );
  }
}
