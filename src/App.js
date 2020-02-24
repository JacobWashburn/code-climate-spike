import React,{useState} from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage';
import AddProjectForm from './components/AddProjectForm';
import ChooseOrg from './components/ChooseOrg';

const initialState = {
  orgs: [],
  // org: {
  //   name: '',
  //   orgId: null,
  //   token: null,
  //   projects: [{
  //         id: null,
  //         name:'',
  //         manager: '',
  //         team:''
  //   }]
  // },
  roles: ['M','SL','TL','WEB','DS','UX']
};

function App() {
  const [state, setState] = useState(initialState)
  console.log('state', state);
  return (
    <div className="App">
    <Route exact path='/' render={props => <LandingPage {...props} setState={setState} state={state}/>}/>
    <Route path='/chooseorg' render={props => <ChooseOrg {...props} setState={setState} state={state}/>}/>
    <Route path='/addproject/:orgId' render={props => <AddProjectForm {...props} setState={setState} state={state}/>}/>
    </div>
  );
}

export default App;
