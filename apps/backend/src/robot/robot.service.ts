import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Direction, Robot } from './robot.entity';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private robotRepo: Repository<Robot>,
  ) {}

  async getLastPosition(): Promise<Robot | null> {
    const robots = await this.robotRepo.find({
      order: { timestamp: 'DESC' },
      take: 1,
    });
    return robots.length > 0 ? robots[0] : null;
  }

  async place(
    x: number,
    y: number,
    direction: Robot['direction'],
  ): Promise<Robot> {
    if (x < 0 || x > 4 || y < 0 || y > 4) {
      throw new Error('Invalid placement: coordinates must be between 0 and 4');
    }
    // Clear old robot(s)
    await this.robotRepo.clear();
    return this.robotRepo.save({ x, y, direction, timestamp: new Date() });
  }

  async move() {
    const last = await this.getLastPosition();
    if (!last) return null;

    const directions = {
      NORTH: { x: 0, y: 1 },
      EAST: { x: 1, y: 0 },
      SOUTH: { x: 0, y: -1 },
      WEST: { x: -1, y: 0 },
    };

    const offset = directions[last.direction];
    const newX = last.x + offset.x;
    const newY = last.y + offset.y;

    if (newX < 0 || newX > 4 || newY < 0 || newY > 4) return last;

    return this.robotRepo.save({ x: newX, y: newY, direction: last.direction, timestamp: new Date() });
  }

  async turnLeft() {
    const last = await this.getLastPosition();
    if (!last) return null;

    const order = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const index = order.indexOf(last.direction);
    const newDirection = order[(index + 1) % 4] as Direction;

    return this.robotRepo.save({ x: last.x, y: last.y, direction: newDirection, timestamp: new Date() });
  }

  async turnRight() {
    const last = await this.getLastPosition();
    if (!last) return null;

    const order = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const index = order.indexOf(last.direction);
    const newDirection = order[(index + 1) % 4] as Direction;

    return this.robotRepo.save({ x: last.x, y: last.y, direction: newDirection, timestamp: new Date() });
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
