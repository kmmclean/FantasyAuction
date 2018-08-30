import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import PlayerList from "./PlayerList";
import DraftedPlayerList from "./DraftedPlayerList";
import { getPlayers } from "../util/api";

export default class DraftBoard extends Component {
  state = {
    loading: true,
    players: [],
    drafted: [],
    budget: 100,
    leagueSize: 12
  };

  async componentDidMount() {
    const players = await getPlayers();

    this.setState((prevState, props) => ({
      loading: false,
      players
    }));
  }

  handleDraftPlayer = (player, bid) => {
    let { players, drafted, budget } = this.state;

    const draftedPlayer = players.find(p => p === player);
    draftedPlayer.drafted = true;
    draftedPlayer.finalBid = Number.parseInt(bid);
    drafted.push(player);

    this.setState({
      drafted,
      budget: budget - bid
    });
  };

  handleUndoDraftedPlayer = player => {
    let { players, drafted, budget } = this.state;

    const draftedPlayer = players.find(p => p === player);
    draftedPlayer.drafted = false;

    this.setState((prevState, props) => ({
      drafted: drafted.filter(p => p !== draftedPlayer),
      budget: prevState.budget + draftedPlayer.finalBid
    }));
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>{this.state.budget}</Col>
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
              />
            </div>
          )}
        </Row>
      </Grid>
    );
  }
}
