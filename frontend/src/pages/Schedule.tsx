import React, { useState } from 'react';

const Schedule: React.FC = () => {
  const [schedules, setSchedules] = useState<unknown[] | null>(null);
  return (<div className="card">
    <h2>Schedules</h2>
    <div>TODO</div>
    {schedules &&
      schedules.map((schedule: any) => (
        <div className="schedule" key={schedule.id}>
          {/* TODO: Display table of available schedules */}
        </div>
      ))}
  </div>);
};

export default Schedule;
