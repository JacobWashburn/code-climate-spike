import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Projects from './Projects';

const Div = styled.div``;
const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;

const LandingPage = ({state, setState, history}) => {
  const [token, setToken] = useState('');
  const [grades, setGrades] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  console.log({grades});
  console.log({snapshots});
  useEffect(() => {
    axios.get('https://api.codeclimate.com/v1/repos/5dcc150b234ac30e83009498/ref_points?filter[branch]=master', {headers: {Authorization:'Token token=a8bd69e0e7cafd98a0581184ae71ffbf13b53cd8'}})
      .then(res => {
        console.log('res', res);
        const snapshotList = res.data.data.map(stuff => stuff.relationships.snapshot.data.id);
        setSnapshots(snapshotList)
      })
  },[]);

  useEffect(() => {
    Promise.all(snapshots.map(snapshot => axios.get(`https://api.codeclimate.com/v1/repos/5dcc150b234ac30e83009498/snapshots/${snapshot}`, {headers: {Authorization:'Token token=a8bd69e0e7cafd98a0581184ae71ffbf13b53cd8'}})
      .then(res => res.data.data.attributes.ratings[0].letter)
      .catch(error => console.log('error res', error))
    ))
      .then(res => {
        setGrades(res)
      })

  },[snapshots]);

  const handleChange = e => {
    setToken(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const {data} = await axios.get('https://api.codeclimate.com/v1/orgs', {headers: {Authorization: `Token token=${token}`}});
    const orgConfig = data.data.map(org => {
      return {
        name: org.attributes.name,
        id: org.id,
        token: token,
        projects: []
      };
    });
    setState({
      ...state,
      orgs: [...state.orgs, ...orgConfig]
    });
    history.push('/chooseorg');
  };
{/*<Div>*/}
{/*        <Form onSubmit={handleSubmit}>*/}
{/*          <Input*/}
{/*            required*/}
{/*            type='text'*/}
{/*            name='token'*/}
{/*            value={token}*/}
{/*            placeholder='Token'*/}
{/*            onChange={handleChange}*/}
{/*          />*/}
{/*          <Button type='submit'>Submit</Button>*/}
{/*        </Form>*/}
{/*      </Div>*/}
  if ( !state.orgs.length) {
    return (

    <div>
      {grades.map(grade => grade ? <p>{grade}</p>:<p>No grade.</p>)}
    </div>
    );
  } else {
    return (
      <div>
        <button onClick={e => {e.stopPropagation(); history.push('/chooseorg')}}>Add Organization</button>
      <Projects state={state} history={history}/>
      </div>
      )
  }
};

export default LandingPage;