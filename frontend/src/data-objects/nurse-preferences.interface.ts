export interface ShiftPrefModel {
    day: boolean;
    night: boolean;
}
export interface NursePrefModel {
    monday: ShiftPrefModel;
    tuesday: ShiftPrefModel;
    wednesday: ShiftPrefModel;
    thursday: ShiftPrefModel;
    friday: ShiftPrefModel;
    saturday: ShiftPrefModel;
    sunday: ShiftPrefModel;
    
}
export interface NurseModel{
    name: string;
    id: number;
}