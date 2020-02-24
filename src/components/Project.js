import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Project = ({project, token}) => {
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {

    Promise.all(project.repos.map(repo => axios.get(`https://api.codeclimate.com/v1/repos/${repo.id}`, {headers: {Authorization: `Token token=${token}`}})
      .then(res1 => axios.get(`https://api.codeclimate.com/v1/repos/${repo.id}/snapshots/${res1.data.data.relationships.latest_default_branch_snapshot.data.id}`, {headers: {Authorization: `Token token=${token}`}}))
      .then(res2 => ({
        repo: repo.name,
        grade: res2.data.data.attributes.ratings.length ? res2.data.data.attributes.ratings[0].letter: 'No Grade Available'
      }))
    ))
      .then(resOfPromiseAll => {
        setSnapshots(resOfPromiseAll);
      });
  }, [project.repos, token]);

  return (
    <div>
      <h2>{project.name}</h2>
      {project.team.length ? project.team.map(member => {
        {if (member.role === 'M') {
          return <h3 key={member.name}>Manager:{member.name}</h3>;
        } else {
          return <p key={member.name}>{member.role}:{member.name}</p>;
        }}
      }): <h2>No Team Members Yet</h2>}
      <div>
        <h2>Repos</h2>
        {snapshots.length ? snapshots.map(snapshot => {
          return (
            <div key={snapshot.repo}>
              <h3>{snapshot.repo}</h3>
              <h4>Grade:{snapshot.grade}</h4>
            </div>
          );
        }) : <h1>No Repos Yet!</h1>}
      </div>
    </div>
  );
};

export default Project;