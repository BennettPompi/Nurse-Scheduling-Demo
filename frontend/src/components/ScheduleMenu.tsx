import React, { useState, useEffect } from 'react';
import * as api from '../services/apiService';
import ScheduleList from './ScheduleList';
import ScheduleDetails from './ScheduleDetails';

const ScheduleMenu: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      const fetchedSchedules = await api.default.getSchedules();
      setSchedules(fetchedSchedules);
    };

    fetchSchedules();
  }, []);

  const handleScheduleSelect = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  return (
    <div className="card">
      <h2>Schedules</h2>
      <div className="schedule-container">
        <ScheduleList 
          schedules={schedules} 
          onScheduleSelect={handleScheduleSelect}
          selectedScheduleId={selectedScheduleId}
        />
        {selectedScheduleId && (
          <ScheduleDetails schedule={schedules.find(s => s.id === selectedScheduleId)} />
        )}
      </div>
    </div>
  );
};

export default ScheduleMenu;
