import React from 'react';
import '../App.css';
import NurseRosterTable from '../components/NurseRosterTable';
const Roster: React.FC = () => {
  return (<div className="card">
    <h2>Staff Roster & Preferences</h2>
      <NurseRosterTable />
  </div>);
};

export default Roster;
