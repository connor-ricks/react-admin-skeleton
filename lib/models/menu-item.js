/**
 * Represents a menu item in the dashboard.
 * @interface
 */
export default class IMenuItem {
  /**
   * An for the menu item.
   * @type {React.JSX.Element | undefined}
   */
  icon;

  /**
   * The label of the menu item.
   * @type {string | React.JSX.Element}
   */
  label;

  /**
   * The link associated with the menu item.
   * @type {string}
   */
  path;

  /**
   * A suffix for the menu item.
   * @type {React.JSX.Element | undefined}
   */
  suffix;

  /**
   * The children menu items.
   * @type {Array<IMenuItem>}
   */
  children;
}
