import React from 'react';
import { daysProperArr } from '../utils';

interface ScheduleTableProps {
  schedule: any;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Nurse</th>
          {daysProperArr.map(day => (
            <th key={day} colSpan={2}>{day}</th>
          ))}
        </tr>
        <tr>
          <th></th>
          {daysProperArr.map(day => (
            <React.Fragment key={day}>
              <th>Day</th>
              <th>Night</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {schedule.shifts.map((nurseShifts: any) => (
          <tr key={nurseShifts.nurse.id}>
            <td>{nurseShifts.nurse.name}</td>
            {daysProperArr.map(day => (
              <React.Fragment key={day}>
                <td>{nurseShifts.shifts[day.toLowerCase()]?.day ? 'X' : ''}</td>
                <td>{nurseShifts.shifts[day.toLowerCase()]?.night ? 'X' : ''}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;