import { Entity } from './entity';

describe('Entity', () => {
  class TestEntity extends Entity {}

  it('should allow setting id property', () => {
    const testEntity = new TestEntity();
    const id = 'testId';
    testEntity.id = id;
    expect(testEntity.id).toEqual(id);
  });
});
