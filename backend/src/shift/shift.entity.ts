import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { NurseEntity } from '../nurse/nurse.entity';

export type ShiftType = 'day' | 'night';
export type ShiftRequirements = {
  shift: ShiftType;
  nursesRequired: number;
  dayOfWeek: string;
};

@Entity('shifts')
export class ShiftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  dayOfWeek: string;

  @Column({ type: 'varchar', length: 10 })
  type: ShiftType;

  @ManyToOne(() => NurseEntity, nurse => nurse.shifts)
  nurse: NurseEntity;

  @Column()
  scheduleId: number;
}
