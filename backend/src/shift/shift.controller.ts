import { Controller, Get, NotImplementedException, Param } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  async getAllShifts() {
    return this.shiftService.getAllShifts();
  }

  @Get('nurse/:nurseId')
  async getShiftsByNurse(@Param('nurseId') nurseId: string) {
    return this.shiftService.getShiftsByNurse(parseInt(nurseId));
  }

  @Get('schedule/:scheduleId')
  async getShiftsBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.shiftService.getShiftsBySchedule(parseInt(scheduleId));
  }

  @Get('requirements')
  async getShiftRequirements() {
    return this.shiftService.getShiftRequirements();
  }
}
