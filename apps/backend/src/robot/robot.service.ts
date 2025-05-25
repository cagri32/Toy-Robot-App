import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Robot } from './robot.entity';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private robotRepo: Repository<Robot>,
  ) {}

  async getLastPosition(): Promise<Robot | null> {
    return this.robotRepo.findOne({
      order: { timestamp: 'DESC' },
    });
  }

  async place(
    x: number,
    y: number,
    direction: Robot['direction'],
  ): Promise<Robot | null> {
    if (x < 0 || x > 4 || y < 0 || y > 4) {
      return null; // Or throw an error for invalid placement
    }
    // Clear old robot(s)
    await this.robotRepo.clear();
    return this.robotRepo.save({ x, y, direction, timestamp: new Date() });
  }

  async getHistory(): Promise<Robot[]> {
    return this.robotRepo.find({ order: { timestamp: 'ASC' } });
  }

  async clearAll(): Promise<void> {
    await this.robotRepo.clear();
  }

  async findAll(): Promise<Robot[]> {
    return this.robotRepo.find();
  }
  async createTestRobot(createRobotDto: CreateRobotDto) {
    const robot = this.robotRepo.create({
      x: createRobotDto.x,
      y: createRobotDto.y,
      direction: createRobotDto.direction,
    });
    return this.robotRepo.save(robot);
  }
}
