import React from 'react';
import { daysProperArr } from '../utils';
import { NurseModel } from '../data-objects/nurse-preferences.interface';

interface Shift {
  id: number;
  dayOfWeek: string;
  type: string;
  nurse: NurseModel;
  scheduleId: number;
}

interface ScheduleTableProps {
  shifts: Shift[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ shifts }) => {
  const shiftMap: Record<string, boolean> = {};
  const nurseSet = new Set<number>();

  shifts.forEach((shift) => {
    const key = `${shift.nurse.id}-${shift.dayOfWeek}-${shift.type}`;
    shiftMap[key] = true;
    nurseSet.add(shift.nurse.id);
  });

  const nurses = Array.from(nurseSet).map(nurseId => 
    shifts.find(shift => shift.nurse.id === nurseId)?.nurse
  ).filter((nurse): nurse is NurseModel => nurse !== undefined);

  const hasShift = (nurseId: number, day: string, type: string): boolean => {
    return shiftMap[`${nurseId}-${day}-${type.toLowerCase()}`] || false;
  };

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
        {nurses.length > 0 ? (
          nurses.map((nurse) => (
            <tr key={nurse.id}>
              <td>{nurse.name}</td>
              {daysProperArr.map((day) => (
                <React.Fragment key={day}>
                  <td>{hasShift(nurse.id, day, 'day') ? 'X' : ''}</td>
                  <td>{hasShift(nurse.id, day, 'night') ? 'X' : ''}</td>
                </React.Fragment>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={15}>No nurses found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScheduleTable;