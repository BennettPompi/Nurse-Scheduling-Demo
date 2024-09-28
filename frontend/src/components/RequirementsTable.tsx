import "../App.css";
import * as api from '../services/apiService';
import React, { useState, useEffect } from 'react';

const RequirementsTable = () => {
    const [requirements, setRequirements] = useState<any[] | null>(null);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const shifts = ['day', 'night'];

    useEffect(() => {
        const fetchRequirements = async () => {
            const requirements = await api.default.getShiftRequirements();
            console.log(requirements);
            setRequirements(requirements);
        };

        fetchRequirements().catch(console.error);
    }, []);

    const getRequirement = (day: string, shift: string) => {
        return requirements?.find(req => req.dayOfWeek === day && req.shift === shift) || { nursesRequired: '-' };
    };

    return (
            <table className="requirements-table">
                <thead>
                    <tr>
                        <th></th>
                        {days.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {shifts.map(shift => (
                        <tr key={shift}>
                            <th>{shift}</th>
                            {days.map(day => {
                                const req = getRequirement(day, shift);
                                console.log(req);
                                return <td key={day}>{req.nursesRequired}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default RequirementsTable;

// Original version commented out:
/*
const RequirementsTable = () => {
    const [requirements, setRequirements] = useState<unknown[] | null>(null);

    useEffect(() => {
        const fetchRequirements = async () => {
            const requirements = await api.default.getShiftRequirements();
            setRequirements(requirements);
        };

        fetchRequirements().catch(console.error);
    }, []);
    return (
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>Day</th>
                <th>Shift</th>
                <th>Nurses required</th>
                </tr>
            </thead>
            <tbody>
                {requirements &&
                requirements.map((req: any) => (
                    <tr key={req.dayOfWeek + "-" + req.shift}>
                    <td>{req.dayOfWeek}</td>
                    <td>{req.shift}</td>
                    <td>{req.nursesRequired}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};
*/
