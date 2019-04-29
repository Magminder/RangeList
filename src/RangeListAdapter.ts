import RangeList from './RangeList';
import Output from './Output';
import RangeInterval from './RangeInterval';

/**
 * Implements exact logic from the spec
 *
 * As we should have normal processing for [10, 10) (include 10 and exclude 10) interval,
 * it's assumed that we should suppress all errors
 */
export default class RangeListAdapter {
  private list: RangeList = new RangeList();

  /**
   * Adds a range to the list
   * @param range - Array of two integers that specify beginning and end of range.
   */
  add(range: number[]) {
    let rangeInterval;
    try {
      if (range.length !== 2) {
        return;
      }
      const [start, end] = range;
      rangeInterval = new RangeInterval(start, end);
    } catch (e) {
      return;
    }
    this.list.add(rangeInterval);
  }

  /**
   * Removes a range from the list
   * @param range - Array of two integers that specify beginning and end of range.
   */
  remove(range: number[]) {
    let rangeInterval;
    try {
      if (range.length !== 2) {
        return;
      }
      const [start, end] = range;
      rangeInterval = new RangeInterval(start, end);
    } catch (e) {
      return;
    }
    this.list.remove(rangeInterval);
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print(): void {
    Output.print(this.list.toString());
  }
}
