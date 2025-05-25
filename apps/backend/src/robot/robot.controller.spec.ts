import { Test, TestingModule } from '@nestjs/testing';
import { RobotController } from './robot.controller';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';

describe('RobotController', () => {
  let controller: RobotController;
  let service: RobotService;

  const mockRobotService = {
    getLastPosition: jest.fn(),
    place: jest.fn(),
    getHistory: jest.fn(),
    clearAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RobotController],
      providers: [{ provide: RobotService, useValue: mockRobotService }],
    }).compile();

    controller = module.get<RobotController>(RobotController);
    service = module.get<RobotService>(RobotService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getLast should return the last robot position', async () => {
    const mockRobot = { x: 1, y: 2, direction: 'NORTH' } as Robot;
    mockRobotService.getLastPosition.mockResolvedValue(mockRobot);

    const result = await controller.getLast();

    expect(service.getLastPosition).toHaveBeenCalled();
    expect(result).toEqual(mockRobot);
  });

  it('place should call place method with correct parameters', async () => {
    const dto = { x: 5, y: 6, direction: 'EAST' } as const;
    const savedRobot = { ...dto } as Robot;
    mockRobotService.place.mockResolvedValue(savedRobot);

    const result = await controller.place(dto);

    expect(service.place).toHaveBeenCalledWith(dto.x, dto.y, dto.direction);
    expect(result).toEqual(savedRobot);
  });

  it('getHistory should return robot history', async () => {
    const history = [{ x: 0, y: 0, direction: 'NORTH' }] as Robot[];
    mockRobotService.getHistory.mockResolvedValue(history);

    const result = await controller.getHistory();

    expect(service.getHistory).toHaveBeenCalled();
    expect(result).toEqual(history);
  });

  it('clear should call clearAll method', async () => {
    mockRobotService.clearAll.mockResolvedValue(undefined);

    const result = await controller.clear();

    expect(service.clearAll).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
