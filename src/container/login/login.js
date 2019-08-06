import React, { Component } from "react";

//Components
import { Paper, Typography, Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import Notification from "../../components/notification/notification";
//Styles
import styles from "./login.module.scss";
//Assets
import lightSaber from "../../assets/images/lightsaber.png";
import Axios from "axios";
//Library

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginMessage: null,
    loading: false
  };

  updateUsername = e => {
    this.setState({ username: e.target.value });
  };
  updatePassword = e => {
    this.setState({ password: e.target.value });
  };

  validateUser = () => {
    this.setState({loading:true});
    Axios.get(
      `https://swapi.co/api/people/?search=${this.state.username}`
    ).then(res => {
      if (res.data.count > 0) {
        const user = res.data.results.filter((val, index) => {
          return (
            val.name === this.state.username &&
            val.birth_year === this.state.password
          );
        });
        if (user.length > 0) {
          localStorage.setItem("token", `${this.state.username + Date.now()}`);
          this.props.history.push("search");
        }
      } else {
        this.setState({
          loginMessage: { type: "error", message: "Login Failed" }
        });
        this.setState({loading:false});
      }      
    });
  };

  render() {
    return (
      <div className={styles.login}>
        <Grid item xs={4}>
          <Paper className={styles.loginContainer}>
            <Grid item xs={12} className={styles.loginHeader}>
              <img src={lightSaber} alt="lightsaver" />
              <Typography variant="h5">Login to Star Wars</Typography>
              <img src={lightSaber} alt="lightsaver" />
            </Grid>
            <hr />
            <Grid item xs={12} className={styles.loginItems}>
              <div className={styles.loginInput}>
                <TextField
                  value={this.state.username}
                  onChange={this.updateUsername}
                  label="Enter Username"
                />
                <TextField
                  value={this.state.password}
                  onChange={this.updatePassword}
                  label="Enter Password"
                  type="password"
                />
              </div>
              {this.state.loading ? <CircularProgress className={styles.progressIcon}/> : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.validateUser}
                >
                  Login
                </Button>
              )}

              {this.state.loginMessage ? (
                <Notification msg={this.state.loginMessage} />
              ) : null}
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default Login;
