import React, { useState } from 'react';
import styled from 'styled-components';
import GetRepos from './GetRepos';

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const Label = styled.label``;
const Select = styled.select``;
const FormWrapper = styled.div``;
const RepoWrapper = styled.div`
display: flex;
flex-direction: column;
`;
const TeamWrapper = styled.div`
display: flex;
flex-direction: column;
`;
const Wrapper = styled.div`
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;
const Title = styled.h2`

`;
const P = styled.p`
margin: 0% 3%;
`;

const AddProjectForm = ({state, setState, history, match}) => {
  const [org, setOrg] = useState(state.orgs.find(org => org.id === match.params.orgId));
  const [projectRepos, setProjectRepos] = useState([]);
  const [team, setTeam] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [member, setMember] = useState({
    name: '',
    role: ''
  });

  const projectNameHandler = e => {
    setProjectName(e.target.value);
  };

  const memberHandler = e => {
    setMember({...member, [e.target.name]: e.target.value});
  };

  const addMemberHandler = e => {
    e.preventDefault();
    setTeam([...team, member]);
  };

  const handleRepoRemove = e => {
    const remove = projectRepos.filter(repo => repo.name !== e.target.value);
    setProjectRepos(remove);
  };

  const handleMemberRemove = e => {
    const remove = team.filter(member => member.name !== e.target.value);
    setTeam(remove);
  };

  const submitHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    const newProject = {
      name: projectName,
      team: team,
      repos: projectRepos
    };
    const addProject = state.orgs.map(stateorg => {
        if (stateorg.id === org.id) {
          return {
            ...stateorg,
            projects: [...stateorg.projects, newProject]
          };
        } else {
          return stateorg;
        }
      }
    );
    setState({
      ...state,
      orgs: addProject
    });
    history.push('/');
  };

  return (
    <FormWrapper>
      <Label>Project Name
        <Input name='projectName' value={projectName}
               onChange={projectNameHandler}/>
      </Label>
      <Form onSubmit={addMemberHandler}>
        <Label>Add Member
          <Input name='name' value={member.name} onChange={memberHandler}/>
        </Label>
        <Label>Role
          <Select name='role' onChange={memberHandler}>
            <option>Select Role</option>
            {state.roles.map(role => <option key={role}
                                             value={role}>{role}</option>)}
          </Select>
        </Label>
        <Button>Add</Button>
      </Form>
      <GetRepos setProjectRepos={setProjectRepos} projectRepos={projectRepos}
                state={state} setState={setState} org={org}/>
      <RepoWrapper>
        <Title>Repos</Title>
        <Wrapper>
          {projectRepos.map(repo => (
            <Wrapper>
              <P>{repo.name}</P>
              <button value={repo.name} onClick={handleRepoRemove}>X</button>
            </Wrapper>
          ))}
        </Wrapper>
      </RepoWrapper>
      <TeamWrapper>
        <Title>Team</Title>
        <Wrapper>
          {team.map(member => {
            return (
              <Wrapper>
                <P>{member.name}</P>
                <P>{member.role}</P>
                <button value={member.name} onClick={handleMemberRemove}>X
                </button>
              </Wrapper>
            );
          })}
        </Wrapper>
      </TeamWrapper>
      <Button onClick={submitHandler}>Create Project</Button>
    </FormWrapper>
  );
};

export default AddProjectForm;