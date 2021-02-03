import './App.css';
import React, { useState } from 'react';

import { AppBar, Container, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import ShieldIcon from '@material-ui/icons/Security';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import SuperheroesTable from './components/SuperheroesTable';
import SuperheroDetail from './components/SuperheroDetail'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LoginOrOut = ({ loggedInUser, login, logout }) => {
  return (loggedInUser) ?
    <>
      <div>Hello, {loggedInUser.username}</div>
      <Button onClick={() => logout() }>Logout</Button>
    </>
    :
    <Button onClick={() => login('tony', 'password')}>Login</Button>
}

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState()

  const login = (username, password) => {
    console.log('Logging in: ' + username)
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username='+username+'&password='+password,
      credentials: 'include'
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw new Error('Login failed!')
      }
    })
    .then((user) => {
      setLoggedInUser(user)
    })
    .catch((error) => {
      console.log('Error trying to login: ', error)
    })
  }

  const logout = () => {
    console.log('Logging out!')
    // go release the session
    setLoggedInUser(undefined)
  }

  const classes = useStyles();
  return (
    <>
      <Router>
        <AppBar position='static'>
          <Toolbar>
            <ShieldIcon className={classes.icon} />
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Super Heroes
            </Typography>
            <LoginOrOut loggedInUser={loggedInUser} login={login} logout={logout}/>
          </Toolbar>
        </AppBar>
        <Container maxWidth='md'>
          <Switch>
            <Route path="/superhero-detail/:superheroid"> 
              <SuperheroDetailPage />
            </Route>
            <Route path="/"> 
              <SuperheroesTable />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
};

function SuperheroDetailPage() {
  let { superheroid } = useParams()
  return <SuperheroDetail superheroid={ superheroid } />
}

export default App;
