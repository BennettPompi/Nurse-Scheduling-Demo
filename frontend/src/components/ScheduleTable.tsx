import React, { useEffect, useState } from 'react';
import { daysProperArr } from '../utils';
import { NurseModel, NursePrefModel } from '../data-objects/nurse-preferences.interface';
import apiService from '../services/apiService';

interface shiftInterface {
id: number;
dayOfWeek: string;
type: string;
nurseId: number;
scheduleId: number;
}

interface fullShiftInterface {
  shift: shiftInterface;
  nurse: NurseModel;
}

interface scheduleInterface  {
  shifts: shiftInterface[];
  id: number;
}

interface ScheduleTableProps {
  schedule: scheduleInterface;
}
const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule }) => {
    const [nurses, setNurses] = useState<NurseModel[]>([]);
    const [shiftMap, setShiftMap] = useState<Record<string, shiftInterface>>({});

    useEffect(() => {
      const fetchData = async () => {
        const fetchedNurses: NurseModel[] = await apiService.getNurses();
        setNurses(fetchedNurses);

        const newShiftMap: Record<string, shiftInterface> = {};
        schedule.shifts.forEach((shift: shiftInterface) => {
          const key = `${shift.nurseId}-${shift.dayOfWeek}-${shift.type}`;
          newShiftMap[key] = shift;
        });
        setShiftMap(newShiftMap);
        console.log(newShiftMap);
      };
      fetchData();
    }, [schedule.shifts]);

    // Helper function to get shift for a specific nurse, day, and type
    const getShift = (nurseId: number, day: string, type: string) => {
      const key = `${nurseId}-${day}-${type}`;
      return shiftMap[key];
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
          {nurses.map((nurse) => (
            <tr key={nurse.id}>
              <td>{nurse.name}</td>
              {daysProperArr.map((day) => (
                <React.Fragment key={day}>
                  <td>{getShift(nurse.id, day, 'Day') ? 'X' : ''}</td>
                  <td>{getShift(nurse.id, day, 'Night') ? 'X' : ''}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default ScheduleTable;