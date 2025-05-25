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

  @Get('last')
  getLast(): Promise<Robot | null> {
    return this.robotService.getLastPosition();
  }

  @Post('place')
  place(@Body() body: { x: number; y: number; direction: Robot['direction'] }) {
    return this.robotService.place(body.x, body.y, body.direction);
  }

  @Post('move')
  move() {
    return this.robotService.move();
  }

  @Post('left')
  left() {
    return this.robotService.turnLeft();
  }

  @Post('right')
  right() {
    return this.robotService.turnRight();
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
