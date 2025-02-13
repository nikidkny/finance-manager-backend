import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm/repository/Repository';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: jest.Mocked<Partial<Repository<Category>>>;

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([
        { id: 1, title: 'Movie' },
        { id: 2, title: 'Tv Show' },
      ]),
      findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Movie' }),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(Category), useValue: repository },
        CategoriesService,
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return true when age is at least 18', () => {
    expect(service.isAdult(19)).toBe(true);
  });

  it('should return false when age is 17.9', () => {
    expect(service.isAdult(17.9)).toBe(false);
  });
  it('should throw exception when age is negative', () => {
    expect(() => service.isAdult(-1)).toThrow('Age cannot be negative');
  });

  it('should return all entries', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, title: 'Movie' },
      { id: 2, title: 'Tv Show' },
    ]);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should delete an entry', async () => {
    const idToRemove = 1;
    const entryToRemove = await service.findOne(1);

    expect(entryToRemove).toEqual({ id: 1, title: 'Movie' });
    expect(repository.findOne).toHaveBeenCalledTimes(1);

    const result = await service.remove(idToRemove);

    expect(repository.remove).toHaveBeenCalledTimes(1);
    expect(repository.remove).toHaveBeenCalledWith({
      id: idToRemove,
      title: entryToRemove.title,
    });
    expect(result).toBe(
      `This category has been deleted ${idToRemove} ${entryToRemove.title}`,
    );
  });
});
