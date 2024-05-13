/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from './repository';
import { Entity } from './entity';

describe('Repository', () => {
  class TestEntity extends Entity {
    constructor(
      public id?: string,
      public name?: string,
    ) {
      super();
    }
  }

  class TestRepository extends Repository<TestEntity> {
    async create(data: TestEntity): Promise<TestEntity> {
      return data;
    }

    async update(id: string, data: TestEntity): Promise<TestEntity> {
      return data;
    }

    async findOne(filter: string, options?: any): Promise<TestEntity | null> {
      return null;
    }

    async findAll(): Promise<TestEntity[]> {
      return [];
    }

    async remove(id: string): Promise<void> {
      return;
    }
  }

  let repository: TestRepository;

  beforeEach(() => {
    repository = new TestRepository();
  });

  it('should create a new entity', async () => {
    const testData = new TestEntity('1', 'John Doe');
    const createdEntity = await repository.create(testData);
    expect(createdEntity).toEqual(testData);
  });

  it('should update an entity', async () => {
    const testData = new TestEntity('1', 'John Doe');
    const updatedEntity = await repository.update('1', testData);
    expect(updatedEntity).toEqual(testData);
  });

  it('should find one entity', async () => {
    const foundEntity = await repository.findOne('testFilter');
    expect(foundEntity).toBeNull();
  });

  it('should find all entities', async () => {
    const allEntities = await repository.findAll();
    expect(allEntities).toEqual([]);
  });

  it('should remove an entity', async () => {
    await expect(repository.remove('1')).resolves.toBeUndefined();
  });
});
