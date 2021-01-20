import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import {
  Link
} from "react-router-dom";

const ShowSuperhero = ({detail}) => {
  return <div>
    <h3>Name</h3>
    <div>{ detail.name }</div>
    <h3>Nickname</h3>
    <div>{ detail.nickname || (<i>No nickname</i>)}</div>
    <h3>Alter Ego</h3>
    <div>{ detail.alterego }</div>
    <h3>Sidekick</h3>
    <div>{ detail.sidekick }</div>
  </div>
}

const SuperheroDetail = ({ superheroid }) => {
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState(undefined);

  useEffect(() => {
    const getSuperhero = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch('/superhero/' + superheroid);
      if (response.status === 200) {
        let detail = await response.json();
        setDetail(detail);  
      }
      setLoading(false);
    };
    getSuperhero();
  }, [superheroid]);

  return (
    <Paper>
      <Link to="/">Back to List</Link>
      { loading && (<div>Loading....</div>) } 
      { (!loading && !detail) && (<div> Superhero not found! </div>) }
      { detail && <ShowSuperhero detail={detail} /> }
    </Paper>
  )
}

export default SuperheroDetail;

