import React from 'react';
import Project from './Project';


const Projects = ({state, history}) => {
  return (
    <div>
      {state.orgs.map(org => {
        if (org.projects.length) {
          return (
          <div key={org.name}>
            <h2>{org.name}</h2>
            <button value={org.id} onClick={e => {e.stopPropagation(); history.push(`/addproject/${org.id}`)}}>Add Project</button>
            <div>
              {org.projects.map(project => <Project key={project.name} project={project} token={org.token}/>)}
            </div>
          </div>
        )
        } else {
          return <></>
        }
      })}
    </div>
  )
};

export default Projects