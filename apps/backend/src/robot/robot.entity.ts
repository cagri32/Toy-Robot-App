import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

@Entity()
export class Robot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ type: 'enum', enum: ['NORTH', 'SOUTH', 'EAST', 'WEST'] })
  direction: Direction;

  @CreateDateColumn()
  @Index()
  timestamp: Date;
}
