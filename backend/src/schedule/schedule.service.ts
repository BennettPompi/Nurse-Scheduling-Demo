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

  It is also very ugly and if I had more time I would refactor it. Overview is in the readme, though.
  */
  private assignToShift(nurses: NurseEntity[], requirement: ShiftRequirements):  NurseEntity[] {
    const dayIdx = daysProperArr.indexOf(requirement.dayOfWeek);
    const shiftType = requirement.shift as keyof ShiftPrefModel;
    //set for keeping track of assigned nurses (O(1) lookup)
    const assigned = new Set<NurseEntity>();
    //init our groups
    const shiftPreferred: Set<NurseEntity> = new Set();
    const shiftNotPreferred: Set<NurseEntity> = new Set();
    
    const noDouble: Set<NurseEntity> = new Set();
    const wouldBeDouble: Set<NurseEntity> = new Set();
    
    const wouldExceedRequested: Set<NurseEntity> = new Set();
    const wouldNotExceedRequested: Set<NurseEntity> = new Set();

    const getIntersection = (setA: Set<any>, setB: Set<any>) : Set<any> => {
      const intersection = new Set<any>();
      for (const member of setA){
        if (setB.has(member)){
          intersection.add(member)
        }
      }
      return intersection
    }
    const comparisonFunction = (a: NurseEntity, b: NurseEntity) => (a.preferences.availableShifts - b.preferences.availableShifts)
    const assignFromGroup = (group: NurseEntity[], limit: number) => {
      for (const nurse of group){
        if (assigned.has(nurse)){
          continue;
        }
        assigned.add(nurse);
        nurse.assignedShifts++;
        if (assigned.size == limit || assigned.size == nurses.length){
          return
        }
      }
    }
    //separate nurses into groups
    for (const nurse of nurses) {

      if (nurse.preferences.days[dayIdx][shiftType] == true) {
        shiftPreferred.add(nurse);
      } else {
        shiftNotPreferred.add(nurse);
      }

      if (!nurse.shifts || !(nurse.shifts[nurse.shifts.length-1].dayOfWeek == requirement.dayOfWeek)) {
        noDouble.add(nurse);
      } else {
        wouldBeDouble.add(nurse)
      }

      if (nurse.assignedShifts >= nurse.preferences.availableShifts) {
        wouldExceedRequested.add(nurse);
      } else {
        wouldNotExceedRequested.add(nurse);
      }
    }
     
    const tier1 = [...getIntersection(shiftPreferred, getIntersection(noDouble, wouldNotExceedRequested))];

    assignFromGroup(tier1.sort(comparisonFunction), requirement.nursesRequired);
    if (assigned.size == requirement.nursesRequired || assigned.size == nurses.length) {
      return [...assigned]
    }
    const tier2 = [...getIntersection(shiftNotPreferred, getIntersection(noDouble, wouldNotExceedRequested))];
    assignFromGroup(tier2.sort(comparisonFunction), requirement.nursesRequired);
    if (assigned.size == requirement.nursesRequired || assigned.size == nurses.length) {
      return [...assigned]
    }
    const tier3 = [...getIntersection(shiftNotPreferred, getIntersection(noDouble, wouldExceedRequested))];
    assignFromGroup(tier3.sort(comparisonFunction), requirement.nursesRequired);
    if (assigned.size == requirement.nursesRequired || assigned.size == nurses.length) {
      return [...assigned]
    }
    while (assigned.size < requirement.nursesRequired && assigned.size < nurses.length) {
      const randomNurse = nurses[Math.floor(Math.random() * nurses.length)];
      if (!assigned.has(randomNurse)) {
        assigned.add(randomNurse);
        randomNurse.assignedShifts++;
      }
    }
    return [...assigned]
  }
  async generateSchedule(): Promise<ScheduleEntity> {
    const shiftRequirements: ShiftRequirements[] = await this.shiftService.getShiftRequirements();
    const nurses: NurseEntity[] = await this.nurseService.getNurses();
    const schedule = new ScheduleEntity();
    const finalSchedule = await this.scheduleRepository.save(schedule);
    const id = finalSchedule.id;
    console.log(id);
    finalSchedule.shifts = [];
    
    const newShifts: ShiftEntity[] = [];

    for (const requirement of shiftRequirements) {
      const assignedNurses = this.assignToShift(nurses, requirement);

      for (const nurse of assignedNurses) {
        const newShift = new ShiftEntity();
        newShift.dayOfWeek = requirement.dayOfWeek;
        newShift.type = requirement.shift;
        newShift.nurse = nurse;
        newShift.schedule = finalSchedule;
        finalSchedule.shifts.push(newShift);
        await this.shiftRepository.save(newShift);
      }
    }
    // Fetch the saved schedule with its shifts
    return this.scheduleRepository.save(finalSchedule);
  }

  async getSchedules(): Promise<any> {
    return this.scheduleRepository.find();
  }

  async getScheduleById(id: number): Promise<any> {
    return this.scheduleRepository.findOneByOrFail({id});
  }

  async getScheduleRequirements(): Promise<any> {
    
  }
}
