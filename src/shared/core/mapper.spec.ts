import { Mapper } from './mapper';

describe('Mapper', () => {
  class TestMapper extends Mapper<any, any> {
    mapFrom(param: any): any {
      return param;
    }
  }

  it('should map input to output', () => {
    const testMapper = new TestMapper();
    const input = { id: '1', name: 'John Doe' };
    const output = testMapper.mapFrom(input);
    expect(output).toEqual(input);
  });
});
