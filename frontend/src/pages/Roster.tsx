import React from 'react';
import '../App.css';
import NurseRosterTable from '../components/NurseRosterTable';

const Roster: React.FC = () => {
  const handleGenerateSchedule = async () => {
    try {
      alert('New schedule generated successfully!');
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Failed to generate schedule. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2>Staff Roster & Preferences</h2>
      <NurseRosterTable />
      <button onClick={handleGenerateSchedule} className="generate-schedule-btn">
        Generate New Schedule
      </button>
    </div>
  );
};

export default Roster;
