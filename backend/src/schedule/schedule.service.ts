import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { ShiftService } from 'src/shift/shift.service';
import { NurseService } from 'src/nurse/nurse.service';
import { ShiftEntity, ShiftRequirements } from 'src/shift/shift.entity';
import { NurseModel, NursePrefModel, ShiftPrefModel } from 'src/nurse/nurse-preferences.interface';
import { daysProperArr } from './utils';
import { NurseEntity } from 'src/nurse/nurse.entity';

@Injectable()
export class ScheduleService {
  
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(ShiftEntity)
    private readonly shiftRepository: Repository<ShiftEntity>,
    private readonly shiftService: ShiftService,
    private readonly nurseService: NurseService
  ) {}

  /*
  Assigns nurses to a shift based on the shift requirements and the nurses' preferences.
  Returns ShiftEntity[].
  */
  private assignToShift(nurses: NurseEntity[], requirement: ShiftRequirements): NurseEntity[] {
    const dayIdx = daysProperArr.indexOf(requirement.dayOfWeek);
    const shiftType = requirement.shift as keyof ShiftPrefModel;
    const assigned = new Set<NurseEntity>();

    // Sort nurses by available shifts (ascending)
    nurses.sort((a, b) => a.preferences.availableShifts - b.preferences.availableShifts);

    // First, assign nurses who prefer this shift and didn't work the same morning
    for (const nurse of nurses) {
      if (assigned.size >= requirement.nursesRequired) break;
      if (nurse.preferences.days[dayIdx][shiftType] && nurse.assignedShifts < nurse.preferences.availableShifts
        && (Array.isArray(nurse.shifts) && nurse.shifts.length > 0 ? nurse.shifts[nurse.shifts.length - 1].dayOfWeek !== requirement.dayOfWeek : true)
      ) {
        assigned.add(nurse);
        nurse.assignedShifts++;
      }
    }

    // If we still need more nurses, assign from those who didn't prefer this shift (and didn't work the same morning)
    if (assigned.size < requirement.nursesRequired) {
      for (const nurse of nurses) {
        if (assigned.size >= requirement.nursesRequired) break;
        if (!assigned.has(nurse) && nurse.assignedShifts < nurse.preferences.availableShifts
        && (Array.isArray(nurse.shifts) && nurse.shifts.length > 0 ? nurse.shifts[nurse.shifts.length - 1].dayOfWeek !== requirement.dayOfWeek : true)) {
          assigned.add(nurse);
          nurse.assignedShifts++;
        }
      }
    }

    // If we still don't have enough, assign randomly
    while (assigned.size < requirement.nursesRequired && assigned.size < nurses.length) {
      const availableNurses = nurses.filter(nurse => !assigned.has(nurse));
      if (availableNurses.length === 0) break;
      const randomNurse = availableNurses[Math.floor(Math.random() * availableNurses.length)];
      assigned.add(randomNurse);
      randomNurse.assignedShifts++;
    }

    return Array.from(assigned);
  }
  async generateSchedule(): Promise<ScheduleEntity> {
    const shiftRequirements: ShiftRequirements[] = await this.shiftService.getShiftRequirements();
    const nurses: NurseEntity[] = await this.nurseService.getNurses();
    const schedule = new ScheduleEntity();
    const finalSchedule = await this.scheduleRepository.save(schedule);

    for (const requirement of shiftRequirements) {
      const assignedNurses = this.assignToShift(nurses, requirement);

      for (const nurse of assignedNurses) {
        const newShift = new ShiftEntity();
        newShift.dayOfWeek = requirement.dayOfWeek;
        newShift.type = requirement.shift;
        newShift.nurse = nurse;
        newShift.scheduleId = finalSchedule.id;
        if (!nurse.shifts) nurse.shifts = [];
        nurse.shifts.push(newShift);
        await this.shiftRepository.save(newShift);
      }
    }

    return finalSchedule;
  }

  async getSchedules(): Promise<any> {
    const schedules = await this.scheduleRepository.find();
    for (const schedule of schedules) {
      schedule.shifts = await this.shiftRepository.find({
        where: { scheduleId: schedule.id },
        relations: ['nurse']
      });
    }
    return schedules;
  }

  async getScheduleById(id: number): Promise<any> {
    const schedule = await this.scheduleRepository.findOneByOrFail({id});
    return schedule;
  }

  async getScheduleRequirements(): Promise<any> {
    
  }
}
