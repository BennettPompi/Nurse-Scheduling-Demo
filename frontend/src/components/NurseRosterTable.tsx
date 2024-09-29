import React, { useState, useEffect } from 'react';
import NursePreferences from './NursePreferences';
import * as api from '../services/apiService';
import '../App.css';
import { NurseModel } from '../data-objects/nurse-preferences.interface';
const NurseRosterTable: React.FC = () => {
    const [nurses, setNurses] = useState<NurseModel[] | null>(null);

    useEffect(() => {
        const fetchNurses = async () => {
            const nurses = await api.default.getNurses(); // TODO: this appears to be getting called twice on page load... why?
            setNurses(nurses);
        };

        fetchNurses().catch(console.error);
    }, []);


    return (
        <div className="table-container">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nurses &&
                            nurses.map((nurse: NurseModel) => (
                                <tr key={nurse.id}>
                                    <td>{nurse.id}</td>
                                    <td>
                                        <NursePreferences
                                        {...nurse}

                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NurseRosterTable;

