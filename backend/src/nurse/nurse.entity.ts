import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { ShiftEntity } from '../shift/shift.entity';
import { NursePrefModel } from './nurse-preferences.interface';

@Entity('nurses')
export class NurseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('json', { nullable: false })
  preferences: NursePrefModel = {
    availableShifts: 0,
    days: Array(7).fill({ day: false, night: false })
  };

  @Column('integer', { nullable: true, default: 0 })
  assignedShifts: number;

  @OneToMany(() => ShiftEntity, shift => shift.nurse)
  shifts: ShiftEntity[];

  constructor() {
    this.preferences = {
      availableShifts: 0,
      days: Array(7).fill({ day: false, night: false })
    };
  }
}
