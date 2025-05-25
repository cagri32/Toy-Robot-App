import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotController } from './robot.controller';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Robot])],
  providers: [RobotService],
  controllers: [RobotController],
  exports: [RobotService],
})
export class RobotModule {}