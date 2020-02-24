import React from 'react';

const ChooseOrg = ({state, history}) => {

  const orgHandler = e => {
   history.push(`/addproject/${e.target.value}`)
  };
  return (
    <label>Choose an Organization
      <select onChange={orgHandler}>
        <option>Select Org</option>
        {state.orgs.map(org => <option key={org.id}
                                       value={org.id}>{org.name}</option>)}
      </select>
    </label>
  );
};

export default ChooseOrg;