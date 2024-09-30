import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleEntity } from './schedule.entity';
import { ShiftModule } from 'src/shift/shift.module';
import { NurseModule } from 'src/nurse/nurse.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity]), ShiftModule, NurseModule],
  exports: [TypeOrmModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
