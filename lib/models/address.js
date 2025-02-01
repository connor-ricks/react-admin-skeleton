/**
 * Represents a physical address.
 * @interface
 */
export default class IAddress {
  /**
   * The street address of the location.
   * @type {string}
   */
  street;

  /**
   * Further address information, such as apartment or suite number.
   * @type {string | undefined}
   * @default undefined
   */
  street2;

  /**
   * The city of the location.
   * @type {string}
   */
  city;

  /**
   * The state of the location.
   * @type {string}
   */
  state;

  /**
   * The zip code of the location.
   * @type {string}
   */
  zip;
}
