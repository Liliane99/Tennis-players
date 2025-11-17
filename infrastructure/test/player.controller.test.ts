import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from '../src/controllers/player-controller';
import { PlayerService } from '../src/services/player-service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  const mockPlayerService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    getStatistics: jest.fn(),
    initializeData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: mockPlayerService,
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all players', async () => {
      const mockPlayers = [{ id: '1', firstname: 'Rafael', lastname: 'Nadal' }];
      mockPlayerService.getAll.mockResolvedValue(mockPlayers);

      const result = await controller.getAll();

      expect(result).toEqual(mockPlayers);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a player by id', async () => {
      const mockPlayer = { id: '1', firstname: 'Rafael', lastname: 'Nadal' };
      mockPlayerService.getById.mockResolvedValue(mockPlayer);

      const result = await controller.getById('1');

      expect(result).toEqual(mockPlayer);
      expect(service.getById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new player', async () => {
      const newPlayer = { firstname: 'Novak', lastname: 'Djokovic' };
      const createdPlayer = { id: '2', ...newPlayer };
      mockPlayerService.create.mockResolvedValue(createdPlayer);

      const result = await controller.create(newPlayer);

      expect(result).toEqual(createdPlayer);
      expect(service.create).toHaveBeenCalledWith(newPlayer);
    });
  });

  describe('getStatistics', () => {
    it('should return statistics', async () => {
      const mockStats = { averageIMC: 22.5, heightMedian: 185 };
      mockPlayerService.getStatistics.mockResolvedValue(mockStats);

      const result = await controller.getStatistics();

      expect(result).toEqual(mockStats);
      expect(service.getStatistics).toHaveBeenCalled();
    });
  });

  describe('initializeData', () => {
    it('should initialize database with data', async () => {
      const mockResult = { message: 'Database initialized successfully', playersCreated: 17 };
      mockPlayerService.initializeData.mockResolvedValue(mockResult);

      const result = await controller.initializeData();

      expect(result).toEqual(mockResult);
      expect(service.initializeData).toHaveBeenCalled();
    });
  });
});
