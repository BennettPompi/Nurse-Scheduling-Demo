export interface ShiftPrefModel {
    day: boolean;
    night: boolean;
}
export interface NursePrefModel {
    availableShifts: number;
    days: ShiftPrefModel[]
}
export interface NurseModel{
    name: string;
    id: number;
    preferences: NursePrefModel;
}