import RangeInterval from '../src/RangeInterval';
import RangeList from '../src/RangeList';

describe('RangeList', () => {
  it('Should export to string', () => {
    const list = new RangeList();
    expect(list.toString()).toBe('<empty>');

    const r1 = new RangeInterval(1, 2);
    const r2 = new RangeInterval(5, 6);

    list.add(r1);
    expect(list.toString()).toBe(r1.toString());

    list.add(r2);
    expect(list.toString()).toBe(`${r1.toString()} ${r2.toString()}`);
  });

  describe('Add interval', () => {
    it('Should join near intervals', () => {
      const r1 = new RangeInterval(1, 2);
      const r2 = new RangeInterval(2, 3);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      expect(list.toString()).toBe('[1, 3)');
    });

    it('Should join multiple intervals', () => {
      const r1 = new RangeInterval(1, 10);
      const r2 = new RangeInterval(12, 18);
      const r3 = new RangeInterval(20, 30);
      const r4 = new RangeInterval(9, 22);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      list.add(r3);
      list.add(r4);
      expect(list.toString()).toBe('[1, 30)');
    });

    it('Should add non-crossing intervals', () => {
      const r1 = new RangeInterval(1, 10);
      const r2 = new RangeInterval(12, 18);
      const r3 = new RangeInterval(-20, -10);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      list.add(r3);
      expect(list.toString()).toBe('[-20, -10) [1, 10) [12, 18)');
    });
  });

  describe('Remove interval', () => {
    it('Should not change list if we have no intersections with removed interval', () => {
      const r1 = new RangeInterval(1, 2);
      const r2 = new RangeInterval(3, 4);
      const r3 = new RangeInterval(-2, -1);
      const r4 = new RangeInterval(2, 3);
      const r5 = new RangeInterval(4, 5);
      const r6 = new RangeInterval(-3, 1);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      expect(list.toString()).toBe('[1, 2) [3, 4)');
      list.remove(r3);
      list.remove(r4);
      list.remove(r5);
      list.remove(r6);
      expect(list.toString()).toBe('[1, 2) [3, 4)');
    });

    it('Should divide interval into 2', () => {
      const r1 = new RangeInterval(1, 2);
      const r2 = new RangeInterval(3, 10);
      const r3 = new RangeInterval(4, 5);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      list.remove(r3);
      expect(list.toString()).toBe('[1, 2) [3, 4) [5, 10)');
    });

    it('Should remove multiple intervals', () => {
      const r1 = new RangeInterval(1, 5);
      const r2 = new RangeInterval(10, 15);
      const r3 = new RangeInterval(20, 25);
      const r4 = new RangeInterval(30, 35);
      const r5 = new RangeInterval(3, 33);
      const list = new RangeList();
      list.add(r1);
      list.add(r2);
      list.add(r3);
      list.add(r4);
      list.remove(r5);
      expect(list.toString()).toBe('[1, 3) [33, 35)');
    });
  });
});
