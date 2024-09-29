import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NurseEntity } from './nurse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NursePrefModel } from './nurse-preferences.interface';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(NurseEntity)
    private nurseRepository: Repository<NurseEntity>,
  ) {}

  async getNurses(): Promise<NurseEntity[]> {
    return this.nurseRepository.find();
  }
  async getNursePrefsByID(id: number): Promise<NursePrefModel>{
    try {
      const nurse = await this.nurseRepository.findOneByOrFail({ id: id });
      if (!nurse){
        throw new NotFoundException(`Nurse with ID ${id} not found`);
      }
      else if (!nurse.preferences && nurse) {
        throw new InternalServerErrorException(`Preferences for nurse with ID ${id} not found`);
      }
      return nurse.preferences;
    } catch (error) {
      throw error;
    }
  }

  async setPreferences(id: number, preferences: NursePrefModel): Promise<NurseEntity> {
    const nurse = await this.nurseRepository.findOneByOrFail({id});
    if (!nurse) {
      throw new NotFoundException(`Nurse with ID ${id} not found`);
    }
    nurse.preferences = preferences;
    return this.nurseRepository.save(nurse);
  }
}
