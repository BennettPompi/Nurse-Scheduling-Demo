import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';  
import { NurseService } from './nurse.service';  
import { NurseEntity } from './nurse.entity';  
import { NursePrefModel } from './nurse-preferences.interface';

@Controller('nurses')  
export class NurseController {  
  constructor(private readonly nurseService: NurseService) {}  

  @Get()
  async getNurses(): Promise<NurseEntity[]> {
    return this.nurseService.getNurses();
  }
  @Get(':id/preferences')
  async getNursePrefsByID(@Param('id') id: number):Promise<NursePrefModel>{
    const prefs = await this.nurseService.getNursePrefsByID(id);
    return prefs;
  }


  @Post(':id/preferences')  
  async setPreferences(
    @Param('id', ParseIntPipe) id: number, 
    @Body() preferences: NursePrefModel
  ): Promise<NurseEntity> {
    return this.nurseService.setPreferences(id, preferences);
  }
}
