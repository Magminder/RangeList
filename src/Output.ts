/**
 * Class represented output.
 *
 * Ideally should implement some common interface, which should be used in the core classes to unbind business logic
 * from input-output implementation details. Another option is to switch to different implementations inside of that
 * module (by implementing plugins to Output module), leaving core logic clean from the detail which output we're using.
 */
export default class Output {
  /**
   * Prints message
   * @static
   * @param {string} s - string to output
   */
  static print(s: string): void {
    console.log(s);
  }
}
