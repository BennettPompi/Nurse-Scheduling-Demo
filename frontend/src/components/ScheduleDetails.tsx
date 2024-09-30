import React, { useEffect, useState } from 'react';
import * as api from '../services/apiService';
import ScheduleTable from './ScheduleTable';

interface ScheduleDetailsProps {
  scheduleId: number;
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({ scheduleId }) => {
  const [schedule, setSchedule] = useState<any | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const fetchedSchedule = await api.default.getSchedule(scheduleId);
      setSchedule(fetchedSchedule);
    };

    fetchSchedule();
  }, [scheduleId]);

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-details">
      <h3>Schedule {schedule.id}</h3>
      <p>Created: {new Date(schedule.created).toLocaleString()}</p>
      <ScheduleTable schedule={schedule} />
    </div>
  );
};

export default ScheduleDetails;