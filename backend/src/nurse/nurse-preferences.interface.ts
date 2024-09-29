export interface ShiftPrefModel {
    day: boolean;
    night: boolean;
}
export interface NursePrefModel {
    id: string;
    monday: ShiftPrefModel;
    tuesday: ShiftPrefModel;
    wednesday: ShiftPrefModel;
    thursday: ShiftPrefModel;
    friday: ShiftPrefModel;
    saturday: ShiftPrefModel;
    sunday: ShiftPrefModel;
    availableShifts: number;
}
export interface NurseModel{
    name: string;
    id: string;
    preferences: NursePrefModel;
}