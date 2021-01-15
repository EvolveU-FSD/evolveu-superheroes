import './App.css';
import React from 'react';

import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
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
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <AppBar position='relative'>
          <Toolbar>
            <ShieldIcon className={classes.icon} />
            <Typography variant='h6' color='inherit' noWrap>
              Super Heroes
            </Typography>
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
