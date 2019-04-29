import RangeInterval from '../src/RangeInterval';

describe('RangeInterval', () => {
  it('Should check constructor variables', () => {
    expect(() => new RangeInterval(1, 2)).not.toThrow(RangeError);
    expect(() => new RangeInterval(-10, -5)).not.toThrow(RangeError);
    expect(() => new RangeInterval(0, 0)).toThrow(RangeError);
    expect(() => new RangeInterval(10, 10)).toThrow(RangeError);
    expect(() => new RangeInterval(-10, -10)).toThrow(RangeError);
    expect(() => new RangeInterval(-2, -3)).toThrow(RangeError);
    expect(() => new RangeInterval(10, 9)).toThrow(RangeError);
  });

  it('Should return start number', () => {
    let r = new RangeInterval(1, 2);
    expect(r.getStart()).toBe(1);
    r = new RangeInterval(0, 10);
    expect(r.getStart()).toBe(0);
    r = new RangeInterval(-10, -5);
    expect(r.getStart()).toBe(-10);
    r = new RangeInterval(-20, 20);
    expect(r.getStart()).toBe(-20);
  });

  it('Should return end number', () => {
    let r = new RangeInterval(1, 2);
    expect(r.getEnd()).toBe(2);
    r = new RangeInterval(-5, 0);
    expect(r.getEnd()).toBe(0);
    r = new RangeInterval(-10, -5);
    expect(r.getEnd()).toBe(-5);
    r = new RangeInterval(-20, 20);
    expect(r.getEnd()).toBe(20);
  });

  it('Should detect possibility to be joined', () => {
    const r1 = new RangeInterval(0, 10);
    const r2 = new RangeInterval(-20, -10);
    const r3 = new RangeInterval(20, 30);
    const r4 = new RangeInterval(-5, 5);
    const r5 = new RangeInterval(5, 15);
    const r6 = new RangeInterval(-2, 12);
    const r7 = new RangeInterval(2, 7);
    const r8 = new RangeInterval(10, 12);
    const r9 = new RangeInterval(-2, 0);

    expect(r1.canBeJoined(r2)).toBeFalsy();
    expect(r1.canBeJoined(r3)).toBeFalsy();
    expect(r1.canBeJoined(r4)).toBeTruthy();
    expect(r1.canBeJoined(r5)).toBeTruthy();
    expect(r1.canBeJoined(r6)).toBeTruthy();
    expect(r1.canBeJoined(r7)).toBeTruthy();
    expect(r1.canBeJoined(r8)).toBeTruthy();
    expect(r1.canBeJoined(r9)).toBeTruthy();
  });

  it('Should calculate extension by another interval', () => {
    const r1 = new RangeInterval(0, 10);
    const r2 = new RangeInterval(-20, -10);
    const r3 = new RangeInterval(20, 30);
    const r4 = new RangeInterval(-5, 5);
    const r5 = new RangeInterval(5, 15);
    const r6 = new RangeInterval(-2, 12);
    const r7 = new RangeInterval(2, 7);
    const r8 = new RangeInterval(10, 12);
    const r9 = new RangeInterval(-2, 0);

    expect(() => r1.getExtension(r2)).toThrow(RangeError);
    expect(() => r1.getExtension(r3)).toThrow(RangeError);

    const r14 = r1.getExtension(r4);
    expect(r14.getStart()).toBe(-5);
    expect(r14.getEnd()).toBe(10);

    const r15 = r1.getExtension(r5);
    expect(r15.getStart()).toBe(0);
    expect(r15.getEnd()).toBe(15);

    const r16 = r1.getExtension(r6);
    expect(r16.getStart()).toBe(-2);
    expect(r16.getEnd()).toBe(12);

    const r17 = r1.getExtension(r7);
    expect(r17.getStart()).toBe(0);
    expect(r17.getEnd()).toBe(10);

    const r18 = r1.getExtension(r8);
    expect(r18.getStart()).toBe(0);
    expect(r18.getEnd()).toBe(12);

    const r19 = r1.getExtension(r9);
    expect(r19.getStart()).toBe(-2);
    expect(r19.getEnd()).toBe(10);
  });

  it('Should calculate subtraction by another interval', () => {
    const r1 = new RangeInterval(0, 10);
    const r2 = new RangeInterval(-20, -10);
    const r3 = new RangeInterval(20, 30);
    const r4 = new RangeInterval(-5, 5);
    const r5 = new RangeInterval(5, 15);
    const r6 = new RangeInterval(-2, 12);
    const r7 = new RangeInterval(2, 7);

    const r12 = r1.getSubtraction(r2);
    expect(r12.length).toBe(1);
    expect(r12[0].getStart()).toBe(0);
    expect(r12[0].getEnd()).toBe(10);

    const r13 = r1.getSubtraction(r3);
    expect(r13.length).toBe(1);
    expect(r13[0].getStart()).toBe(0);
    expect(r13[0].getEnd()).toBe(10);

    const r14 = r1.getSubtraction(r4);
    expect(r14.length).toBe(1);
    expect(r14[0].getStart()).toBe(5);
    expect(r14[0].getEnd()).toBe(10);

    const r15 = r1.getSubtraction(r5);
    expect(r15.length).toBe(1);
    expect(r15[0].getStart()).toBe(0);
    expect(r15[0].getEnd()).toBe(5);

    const r16 = r1.getSubtraction(r6);
    expect(r16.length).toBe(0);

    const r17 = r1.getSubtraction(r7);
    expect(r17.length).toBe(2);
    expect(r17[0].getStart()).toBe(0);
    expect(r17[0].getEnd()).toBe(2);
    expect(r17[1].getStart()).toBe(7);
    expect(r17[1].getEnd()).toBe(10);
  });

  it('Should convert to a string', () => {
    const r1 = new RangeInterval(1, 2);
    const r2 = new RangeInterval(-2, -1);
    const r3 = new RangeInterval(-2, 2);

    expect(r1.toString()).toBe('[1, 2)');
    expect(r2.toString()).toBe('[-2, -1)');
    expect(r3.toString()).toBe('[-2, 2)');
  });
});
