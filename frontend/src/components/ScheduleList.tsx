import React from 'react';

interface ScheduleListProps {
  schedules: any[];
  onScheduleSelect: (scheduleId: number) => void;
  selectedScheduleId: number | null;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onScheduleSelect, selectedScheduleId }) => {
  return (
    <div className="schedule-list">
      <h3>Available Schedules</h3>
      <ul>
        {schedules.map((schedule) => (
          <li 
            key={schedule.id} 
            onClick={() => onScheduleSelect(schedule.id)}
            className={selectedScheduleId === schedule.id ? 'selected' : ''}
          >
            Schedule {schedule.id} - Created: {new Date(schedule.created).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;
