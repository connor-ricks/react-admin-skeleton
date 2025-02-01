/**
 * Custom error class representing a permissions-related error.
 *
 * This error should be thrown when a user or system attempts to perform
 * an action that they do not have permission to execute.
 *
 * @extends {Error}
 */
export default class PermissionsError extends Error {
  /**
   * Creates an instance of PermissionsError.
   *
   * @param {string} message - A descriptive message for the error.
   */
  constructor(message) {
    super(message); // Call the parent Error constructor
    this.name = 'PermissionsError'; // Set the error name to 'PermissionsError'
  }
}
