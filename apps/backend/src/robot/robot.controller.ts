import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';

@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  getAll() {
    return this.robotService.findAll();
  }

  @Post()
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotService.createTestRobot(createRobotDto);
  }

  @Get()
  getLast(): Promise<Robot | null> {
    return this.robotService.getLastPosition();
  }

  @Post('place')
  place(@Body() body: { x: number; y: number; direction: Robot['direction'] }) {
    return this.robotService.place(body.x, body.y, body.direction);
  }

  @Get('history')
  getHistory(): Promise<Robot[]> {
    return this.robotService.getHistory();
  }

  @Delete('clear')
  clear() {
    return this.robotService.clearAll();
  }
}
