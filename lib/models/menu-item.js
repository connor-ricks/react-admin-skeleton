/**
 * Represents a menu item in the dashboard.
 * @interface
 */
export default class IMenuItem {
  /**
   * An icon for the menu item.
   * @type {React.ReactNode  | undefined}
   * @default undefined
   */
  icon;

  /**
   * The label of the menu item.
   * @type {string}
   */
  label;

  /**
   * The link associated with the menu item.
   * @type {string}
   */
  path;

  /**
   * The children menu items.
   * @type {Array<IMenuItem> | undefined}
   * @default undefined
   */
  children;
}
