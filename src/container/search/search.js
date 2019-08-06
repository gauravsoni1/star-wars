import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Grid,  
  Dialog
} from "@material-ui/core";
import styles from "./search.module.scss";

import PopulationTable from "../../components/populationTable/populationTable";
import Axios from "axios";
import config from "../../config/config";
import Planet from "../../components/planet/planet";

class Search extends Component {
  state = {
    selectedPlanet:null,
    smallPlanets: [],
    mediumPlanets: [],
    largePlanets: [],
    filteredPlanets: [
      { name: "Earth", population: "200123" },
      { name: "Jupiter", population: "123902" }
    ],
    showPlanet:false
  };

  sortPlanets = planets => {
    let sm = [],
      md = [],
      lg = [];
    planets.forEach((val, index) => {
      if (val.population <= config.small || val.population === "unknown") {
        sm.push(val);
      } else if (
        val.population > config.small &&
        val.population <= config.medium
      ) {
        md.push(val);
      } else {
        lg.push(val);
      }
    });
    this.setState({ smallPlanets: sm, mediumPlanets: md, largePlanets: lg });
  };

  searchPlanets = e => {
    Axios.get(`https://swapi.co/api/planets/?search=${e.target.value}`).then(
      res => {
        this.sortPlanets(res.data.results);
      }
    );
  };

  hidePlanetView = () =>{
    this.setState({showPlanet:false});
  }

  planetSelected = planet => {
    this.setState({ selectedPlanet: planet,showPlanet:true });
  };

  logout = () =>{
    localStorage.removeItem("token");
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className={styles.searchPage}>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <Typography variant="h5">Welcome Jedi</Typography>
            <Button variant="contained" color="secondary" onClick={this.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className={styles.body}>
          <div className={styles.searchBox}>
            <TextField
              fullWidth
              label="Search for planets"
              variant="outlined"
              onChange={this.searchPlanets}
            />
          </div>
          <Grid className={styles.populationView}>
            {this.state.smallPlanets.length > 0 ? (
              <PopulationTable
                title={`Small Planets (size < ${config.medium})`}
                data={this.state.smallPlanets}
                planetSelected={this.planetSelected}
              />
            ) : null}
            {this.state.mediumPlanets.length > 0 ? (
              <PopulationTable
                title={`Medium Planets (size ${config.small}-${config.medium})`}
                data={this.state.mediumPlanets}
                planetSelected={this.planetSelected}
              />
            ) : null}
            {this.state.largePlanets.length > 0 ? (
              <PopulationTable
                title={`Large Planets (size>${config.medium})`}
                data={this.state.largePlanets}
                planetSelected={this.planetSelected}
              />
            ) : null}
          </Grid>
          <Dialog open={this.state.showPlanet} onClose={this.hidePlanetView} >
              <Grid item xs={12}>
                {this.state.selectedPlanet ?<Planet selectedPlanet={this.state.selectedPlanet} />:null}
              </Grid>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Search;
