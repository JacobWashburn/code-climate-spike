import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div``;
const Select = styled.select``;

const GetRepos = ({setProjectRepos, projectRepos, org}) => {
  const [repos, setRepos] = useState([]);
  console.log('aa', org);
  useEffect(() => {

    axios.get(`https://api.codeclimate.com/v1/orgs/${org.id}/repos`, {headers: {Authorization: `Token token=${org.token}`}})
      .then(res => {
        const list = res.data.data.map(repo => ({
          id: repo.id,
          name: repo.attributes.human_name,
          orgId: repo.relationships.account.data.id
        }));
        setRepos(list);
      });
  }, [org]);

  const handleChange = e => {
    const addRepo = repos.filter(repo => repo.name === e.target.value);
    setProjectRepos([...projectRepos, ...addRepo]);
  };

  return (
    <Div>
      Add Repo
      <Select onChange={handleChange}>
        {repos.length ? <>
          <option>Add Repo</option>
          {repos.map(repo => {
              if (repo.orgId === org.id) {
                return <option key={repo.name}
                               value={repo.name}>{repo.name}</option>;
              }
            }
          )}</> : <option>no repos</option>}
      </Select>
    </Div>
  );
};

export default GetRepos;