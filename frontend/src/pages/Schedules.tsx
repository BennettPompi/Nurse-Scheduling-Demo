import React from 'react';
import Schedule from '../components/ScheduleMenu';

const Schedules: React.FC = () => {
  return (
    <div className="card">
      <h2>View Schedules</h2>
      <Schedule />
    </div>
  );
};

export default Schedules;
