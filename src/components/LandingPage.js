import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Projects from './Projects';

const Div = styled.div``;
const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;

const LandingPage = ({state, setState, history}) => {
  const [token, setToken] = useState('');
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

  if ( !state.orgs.length) {
    return (
      <Div>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            type='text'
            name='token'
            value={token}
            placeholder='Token'
            onChange={handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Div>

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