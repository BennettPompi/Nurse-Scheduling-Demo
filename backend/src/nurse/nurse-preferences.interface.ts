export interface ShiftPreference {
    day: boolean;
    night: boolean;
}
export interface NursePreferences {
    monday: ShiftPreference;
    tuesday: ShiftPreference;
    wednesday: ShiftPreference;
    thursday: ShiftPreference;
    friday: ShiftPreference;
    saturday: ShiftPreference;
    sunday: ShiftPreference;
    availableShifts: number;
}