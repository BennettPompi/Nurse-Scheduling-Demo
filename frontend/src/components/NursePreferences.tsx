import React, { useEffect, useState } from "react";
import apiService, * as api from "../services/apiService";
import "../App.css"
import { NurseModel, NursePrefModel, ShiftPrefModel } from "../data-objects/nurse-preferences.interface";
import { daysLowerArr, shiftsLowerArr } from "../utils";

const MINIMUM_SHIFTS = 3; 
const NursePreferences = (nurse: NurseModel) => {
  const defaultShiftPrefs = (): ShiftPrefModel => {
    return { day: false, night: false };
  }
  const defaultNursePrefs = (): NursePrefModel => {
    const prefs = {
      availableShifts: 0,
      days: []
    } as NursePrefModel;
    for (let i = 0; i < 7; i++) {
      prefs.days.push(defaultShiftPrefs());
    }
    return prefs;
  }

  // state for show depending on button click on the nurse itself to show details page
  const [showNursePreferredShifts, setShowNursePreferredShifts] =
    useState(false);
  // preferred shifts represents nurse preferences for the week in a format that makes it easy to render
  const [nursePreferredShifts, setNursePreferredShifts] = useState(
    defaultNursePrefs()
  );

  const handleClick = () => {
    setShowNursePreferredShifts((show) => !show);
  };

  const handleSubmitPreferences = (event: React.FormEvent) => {
  //count shifts nurse marked as available
    const countShifts = (): number =>{
      let shiftCount = 0;
      const preferences: NursePrefModel = {...nursePreferredShifts}
      for (const day of preferences.days){
        for (const shift of Object.keys(day)){
          if (day[shift as keyof ShiftPrefModel]){
            shiftCount++;
          }
        }
      }
      return shiftCount;
    }
    
    const setPreferences = async (updatedPreferences: NursePrefModel) => {
      apiService.setNursePreferences(nurse.id, updatedPreferences);
    };
    event.preventDefault();
    const shiftsAvailable: number = countShifts();
    //check if they meet minimum shift requirement
    if (shiftsAvailable >= MINIMUM_SHIFTS) {
      console.log(shiftsAvailable);
      const updatedPreferences = {
        ...nursePreferredShifts,
        availableShifts: shiftsAvailable
      };
      setNursePreferredShifts(updatedPreferences);
      console.log(nursePreferredShifts);
      setPreferences(updatedPreferences).catch(console.error);
    }
    else{
      console.log(`Please select at least ${MINIMUM_SHIFTS} shifts. You have currently selected ${shiftsAvailable} shifts.`);
      alert(`Please select at least ${MINIMUM_SHIFTS} shifts. You have currently selected ${shiftsAvailable} shifts.`);
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
        let nursePreferences = await api.default.getNursePreferences(nurse.id);
        if (!nursePreferences || !Array.isArray(nursePreferences.days)) {
          nursePreferences = defaultNursePrefs();
        }
        setNursePreferredShifts(nursePreferences);
    };

    fetchPreferences().catch(() => {
      //log error to console and return early (because we initialize the pref state with default prefs)
      console.error("Preferences not found for nurse " + nurse.id + ".\n" +
        "Did you initialize them?"
      )
      return
    });
  }, [nurse.id]);

  // changing the preferredShifts in the page depending on the checkboxes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setNursePreferredShifts(prevPrefs => {
      try{
        const dayIndex = daysLowerArr.indexOf(name);
        if (dayIndex === -1) return prevPrefs;
      
        const updatedDays = [...prevPrefs.days];
        updatedDays[dayIndex] = {
          ...updatedDays[dayIndex],
          [value as keyof ShiftPrefModel]: checked
        };
        const ret = {
          ...prevPrefs,
          days: updatedDays,
        };
        return ret;
      }
      catch (e) {return defaultNursePrefs()}
    });
  };

  return (
    <div>
      <button onClick={handleClick}>{nurse.name}</button>
      {showNursePreferredShifts && (
        <div>
          Pick at least 3 preferred shifts for the week:
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
                          checked={
                            nursePreferredShifts.days ? 
                            nursePreferredShifts.days[daysLowerArr.indexOf(day)][shift as keyof ShiftPrefModel]
                          : false} />
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
