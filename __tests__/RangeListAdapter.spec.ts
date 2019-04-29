import Output from '../src/Output';
import RangeListAdapter from '../src/RangeListAdapter';

jest.mock('../src/Output');

describe('RangeListAdapter', () => {
  it('Should call list method with appropriate parameters', () => {
    const list = new RangeListAdapter();
    list.add([1, 5]);
    list.add([10, 15]);
    list.remove([3, 12]);
    list.print();
    // @ts-ignore
    expect(Output.print.mock.calls[0][0]).toBe('[1, 3) [12, 15)');
  });

  it('Should not call add method with inappropriate intervals', () => {
    const list = new RangeListAdapter();
    list.add([1]);
    list.add([2, 3, 4]);
    list.add([]);
    list.add([10, 10]);
    list.add([3, -3]);
    list.add([0, 0]);
    list.print();
    // @ts-ignore
    expect(Output.print.mock.calls[1][0]).toBe('<empty>');
  });

  it('Should not call remove method with inappropriate intervals', () => {
    const list = new RangeListAdapter();
    list.add([-10, 10]);
    list.remove([1]);
    list.remove([2, 3, 4]);
    list.remove([]);
    list.remove([10, 10]);
    list.remove([3, -3]);
    list.remove([0, 0]);
    list.print();
    // @ts-ignore
    expect(Output.print.mock.calls[2][0]).toBe('[-10, 10)');
  });
});
