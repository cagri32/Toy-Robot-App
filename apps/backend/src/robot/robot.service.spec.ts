import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;

  const mockRepository: Partial<Record<keyof Repository<Robot>, jest.Mock>> = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RobotService,
        {
          provide: getRepositoryToken(Robot),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RobotService>(RobotService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have createTestRobot method', () => {
    expect(service.createTestRobot).toBeDefined();
  });

  it('should call repo.create and repo.save when createTestRobot is called', async () => {
    const robotEntity = { x: 0, y: 0, direction: 'NORTH' };
    mockRepository.create!.mockReturnValue(robotEntity);
    mockRepository.save!.mockResolvedValue(robotEntity);

    const result = await service.createTestRobot({
      x: 1,
      y: 2,
      direction: 'NORTH',
    });

    expect(mockRepository.create).toHaveBeenCalledWith({
      x: 1,
      y: 2,
      direction: 'NORTH',
    });
    expect(mockRepository.save).toHaveBeenCalledWith(robotEntity);
    expect(result).toEqual(robotEntity);
  });

  it('should have findAll method', () => {
    expect(service.findAll).toBeDefined();
  });

  it('should call repo.find when findAll is called', async () => {
    const mockRobots = [{ x: 0, y: 0, direction: 'NORTH' }];
    mockRepository.find!.mockResolvedValue(mockRobots);

    const result = await service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockRobots);
  });
});
