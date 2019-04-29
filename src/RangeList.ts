import RangeInterval from './RangeInterval';

export default class RangeList {
  /**
   * List of ranges
   */
  private list: RangeInterval[] = [];

  /**
   * Sorts list of ranges
   */
  private sort() {
    this.list.sort((a: RangeInterval, b: RangeInterval) => a.getStart() - b.getStart());
  }

  /**
   * Adds a range to the list
   */
  add(range: RangeInterval) {
    let addRange = range;
    this.list = this.list.reduce(
      (list: RangeInterval[], listRange: RangeInterval) => {
        if (!addRange.canBeJoined(listRange)) {
          list.push(listRange);
        } else {
          addRange = addRange.getExtension(listRange);
        }
        return list;
      },
      [],
    );
    this.list.push(addRange);
    this.sort();
  }

  /**
   * Removes a range from the list
   */
  remove(range: RangeInterval) {
    this.list = this.list.reduce(
      (list: RangeInterval[], listRange: RangeInterval) => {
        listRange.getSubtraction(range).forEach(resultRange => list.push(resultRange));
        return list;
      },
      [],
    );
  }

  /**
   * Returns string representation of the range list
   */
  toString(): string {
    if (!this.list.length) {
      return '<empty>';
    }
    return this.list.map((range: RangeInterval) => range.toString()).join(' ');
  }
}
