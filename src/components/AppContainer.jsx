import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import { getAllTags, getRingFilters } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar-actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: getAllTags(),
      selectedTags: [],
      rings: getRingFilters(),
      selectedRings: [],
    };

    this.selectTags = this.selectTags.bind(this);
    this.selectRings = this.selectRings.bind(this);
    this.renderExternalRadar = this.renderExternalRadar.bind(this);
  }

  selectTags(selectedTags) {
    this.setState({selectedTags}, this.renderExternalRadar );
  }

  selectRings(selectedRings) {
    this.setState({ selectedRings}, this.renderExternalRadar );
  }

  componentDidMount() {
    this.renderExternalRadar();
  }

  renderExternalRadar() {
    setTimeout(() => {
      const selectedRingsValues = this.state.rings[this.state.selectedRings[0]] || [];
      redrawRadar(this.props.radarId, this.state.selectedTags, selectedRingsValues);
    }, 0);
  }

  render() {
    return (
      <>
        <Typography variant="h4">
          Technology radar - <a href="https://codelight.house/">Codelight.house</a>
        </Typography>
        <Typography variant="subtitle1">
          <a className="social-icon" title="Fork us" href="https://github.com/codelight-house/tech-radar" target="_BLANK" rel="noopener noreferrer"><img alt="github" src="./img/GitHub-Mark-32px.png"></img></a>
          <a className="social-icon" title="Linkedin" href="https://www.linkedin.com/company/codelight-house/" target="_BLANK" rel="noopener noreferrer" ><img alt="github" src="./img/In-Black-34px-R.png"></img></a>
        </Typography>
        <Typography variant="h6">Filter by tag:</Typography>
        <FilterContainer
          tags={this.state.tags.sort()}
          selectedTags={this.state.selectedTags}
          selectTags={this.selectTags}
        />
        <Typography variant="h6">Filter by ring:</Typography>
        <FilterContainer
          tags={Object.keys(this.state.rings)}
          selectedTags={this.state.selectedRings}
          selectTags={this.selectRings}
        />
      </>
    );
  }
}

export default AppContainer;
