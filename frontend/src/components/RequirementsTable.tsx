import "../App.css";
import * as api from '../services/apiService';
import { useState, useEffect } from 'react';
import { shiftsUpperArr } from "../utils";

const RequirementsTable = () => {
    const [requirements, setRequirements] = useState<any[] | null>(null);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                    {shiftsUpperArr.map(shift => (
                        <tr key={shift}>
                            <th>{shift}</th>
                            {days.map(day => {
                                const req = getRequirement(day, shift.toLowerCase());
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