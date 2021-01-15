import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';

const SuperheroDetail = ({ superheroid }) => {
  const [detail, setDetail] = useState({
    name: "",
    nickname: "",
    alterego: "",
    sidekick: ""
  });

  useEffect(() => {
    const getSuperhero = async () => {
      // fetch uses the "proxy" value set in client/package.json
      let response = await fetch('/superhero/' + superheroid);
      let detail = await response.json();
      setDetail(detail);
    };
    getSuperhero();
  }, [superheroid]);

  return (
    <Paper>
      <h3>Name</h3>
      <div>{ detail.name }</div>
      <h3>Nickname</h3>
      <div>{ detail.nickname || (<i>No nickname</i>)}</div>
      <h3>Alter Ego</h3>
      <div>{ detail.alterego }</div>
      <h3>Sidekick</h3>
      <div>{ detail.sidekick }</div>
    </Paper>
  )
}

export default SuperheroDetail;

