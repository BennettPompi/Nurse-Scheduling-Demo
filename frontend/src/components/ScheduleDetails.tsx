import React from 'react';
import ScheduleTable from './ScheduleTable';

interface ScheduleDetailsProps {
  schedule: any;
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({ schedule }) => {
  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-details">
      <h3>Schedule {schedule.id}</h3>
      <p>Created: {new Date(schedule.created).toLocaleString()}</p>
      <ScheduleTable shifts={schedule.shifts} />
    </div>
  );
};

export default ScheduleDetails;