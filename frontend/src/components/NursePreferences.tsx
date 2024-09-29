import React, { useEffect, useState } from "react";
import apiService, * as api from "../services/apiService";
import "../App.css"
import { NurseModel, NursePrefModel, ShiftPrefModel } from "../data-objects/nurse-preferences.interface";
import { daysLowerArr, shiftsLowerArr } from "../utils";

const NursePreferences = (nurse: NurseModel) => {
  const defaultShiftPrefs = (): ShiftPrefModel => {
    return { day: false, night: false };
  }
  const defaultNursePrefs = (): NursePrefModel => {
    const prefs = {} as NursePrefModel;
    for (const day of daysLowerArr) {
      prefs[day as keyof NursePrefModel] = defaultShiftPrefs();
    }
    return prefs;
  }

  // state for show depending on button click on the nurse itself to show details page
  const [showNursePreferredShifts, setShowNursePreferredShifts] =
    useState(false);
  // preferred shifts represents nurse preferences for the week in a format that makes it easy to render
  const [nursePreferredShifts, setNursePreferredShifts] = useState(
    defaultNursePrefs()
    // {
    //   monday_day: false, 
    //   monday_night: false,
    //   tuesday_day: false,
    //   tuesday_night: false,
    //   wednesday_day: false,
    //   wednesday_night: false,
    //   thursday_day: false,
    //   thursday_night: false,
    //   friday_day: false,
    //   friday_night: false,
    //   saturday_day: false,
    //   saturday_night: false,
    //   sunday_day: false,
    //   sunday_night: false
    // }
  );

  const handleClick = () => {
    setShowNursePreferredShifts((show) => !show);
  };

  const handleSubmitPreferences = (event: any) => {
    const setPreferences = async () => {
      apiService.setNursePreferences(nurse.id, nursePreferredShifts);
    };
    event.preventDefault();
    setPreferences().catch(console.error);
  };

  useEffect(() => {
    // converts the preferences from the API to the format that is used in the state of nursePreferredShifts
    const fetchPreferences = async () => {
      let nursePreferences = await api.default.getNursePreferences(nurse.id);
      if (!nursePreferences) {
        nursePreferences = defaultNursePrefs();
      }
      setNursePreferredShifts(nursePreferences);
    };
    fetchPreferences().catch(console.error);
  }, [nurse.id]);

  // changing the preferredShifts in the page depending on the checkboxes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setNursePreferredShifts(prevPrefs => ({
      ...prevPrefs,
      [name as keyof NursePrefModel]: {
        ...(prevPrefs[name as keyof NursePrefModel] || {}),
        [value]: checked
      }
    }));
  };

  return (
    <div>
      <button onClick={handleClick}>{nurse.name}</button>
      {showNursePreferredShifts && (
        <div>
          Pick at least 3 preferred shiftsLowerArr for the week:
          <form onSubmit={handleSubmitPreferences}>
            <table className="nurse-preferences">
              <thead>
                <tr>
                  <th></th>
                  {daysLowerArr.map(day => <th key={day}>{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {shiftsLowerArr.map(shift => (
                  <tr key={shift}>
                    <th>{shift}</th>
                    {daysLowerArr.map(day => (
                      <td key={"cell-" + day + "-"+shift} style={{ textAlign: "center" }}>
                        {(
                          <input 
                          key={day+"-"+shift}
                          onChange={handleChange}
                          type="checkbox" 
                          name={day} 
                          value={shift} 
                          checked={nursePreferredShifts[day as keyof NursePrefModel][shift as keyof ShiftPrefModel]} />
                        )}
                        <br />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <input style={{ marginTop: "1rem" }} type="submit" name="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};
export default NursePreferences;
