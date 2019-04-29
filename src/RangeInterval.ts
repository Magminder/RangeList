/**
 * RangeInterval represents numeric interval with inclusive left and non-inclusive right borders
 */
export default class RangeInterval {
  /**
   * Represents left border of the range
   */
  private readonly start: number;

  /**
   * Represents right border of the range
   */
  private readonly end: number;

  constructor(start: number, end: number) {
    if (end <= start) {
      throw new RangeError('Incorrect RangeInterval borders');
    }
    this.start = start;
    this.end = end;
  }

  /**
   * Returns left border of the range
   */
  getStart(): number {
    return this.start;
  }

  /**
   * Returns end value of the range
   */
  getEnd(): number {
    return this.end;
  }

  /**
   * Checks is the ranges can be joined together
   */
  canBeJoined(range: RangeInterval): boolean {
    return this.getStart() <= range.getEnd() && range.getStart() <= this.getEnd();
  }

  /**
   * Checks if the range is covered by another one
   */
  private isCovered(range: RangeInterval): boolean {
    return this.getStart() >= range.getStart() && this.getEnd() <= range.getEnd();
  }

  /**
   * Returns extended interval calculated by connecting current and passed interval
   */
  getExtension(range: RangeInterval): RangeInterval {
    if (!this.canBeJoined(range)) {
      throw new RangeError('No connections with the passed range');
    }
    return new RangeInterval(
      Math.min(this.getStart(), range.getStart()),
      Math.max(this.getEnd(), range.getEnd()),
    );
  }

  /**
   * Returns subtraction result of current and passed interval
   */
  getSubtraction(range: RangeInterval): RangeInterval[] {
    // it removes all the interval
    if (this.isCovered(range)) {
      return [];
    }
    // subtraction on the left side
    if (range.getStart() <= this.getStart() && this.getStart() < range.getEnd()) {
      return [new RangeInterval(range.getEnd(), this.getEnd())];
    }
    // subtraction on the right side
    if (range.getStart() < this.getEnd() && this.getEnd() <= range.getEnd()) {
      return [new RangeInterval(this.getStart(), range.getStart())];
    }
    // subtraction in the middle
    if (this.getStart() < range.getStart() && range.getEnd() < this.getEnd()) {
      return [
        new RangeInterval(this.getStart(), range.getStart()),
        new RangeInterval(range.getEnd(), this.getEnd()),
      ];
    }
    return [this];
  }

  /**
   * Returns string representation of range
   */
  toString(): string {
    return `[${this.start}, ${this.end})`;
  }
}
