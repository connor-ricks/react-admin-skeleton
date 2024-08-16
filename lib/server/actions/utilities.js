/**
 * The response type used for actions.
 *
 * @template Payload
 * @interface
 */
export class IActionResponse {
  /**
   * Wether the action was successful or not.
   * @type {boolean}
   */
  success;
  /**
   * A message describing the result of the action.
   * @type {string | undefined}
   */
  message;
  /**
   * The payload returned by the action.
   * @type {Payload | undefined}
   */
  payload;
}

/**
 * The response type used for server actions.
 * @template Payload
 * @implements {IActionResponse<Payload>}
 */
export class ServerActionResponse {
  /**
   * Creates an instance of ServerActionResponse.
   * @param {boolean} success - Indicates if the action was successful.
   * @param {string | undefined} [message=undefined] - An optional message associated with the response.
   * @param {Payload | undefined} [payload=undefined] - An optional payload associated with the response.
   */
  constructor(success, message = undefined, payload = undefined) {
    this.success = success;
    this.message = message;
    this.payload = payload;
  }

  /**
   * Creates a success response with the given message and payload.
   * @template Payload
   * @param {string | undefined} message
   * @param {Payload | undefined} payload
   * @returns {ServerActionResponse<Payload>}
   */
  static success(message = undefined, payload = undefined) {
    return new ServerActionResponse(true, message, payload);
  }

  /**
   * Creates a failure response with the given message and payload.
   * @template Payload
   * @param {string | undefined} [message=undefined] - An optional message associated with the response.
   * @param {Payload | undefined} [payload=undefined] - An optional payload associated with the response.
   * @returns {ServerActionResponse<Payload>}
   */
  static failure(message = undefined, payload = undefined) {
    return new ServerActionResponse(false, message, payload);
  }
}

/**
 * The response type used for server action errors.
 * @template Payload
 * @implements {IActionResponse<Payload>}
 */
export class ServerActionError extends Error {
  /**
   * Creates an instance of ServerActionError.
   * @param {string | undefined} [message=undefined] - An optional message associated with the response.
   * @param {Payload | undefined} [payload=undefined] - An optional payload associated with the response.
   */
  constructor(message, payload = undefined) {
    super(message);
    this.success = false;
    this.payload = payload;
  }
}

// Wraps a server action callback to handle errors and format the response.
/**
 *
 * @template Payload
 * @param {function(...*): Promise<ServerActionResponse<Payload>>} callback
 * @returns {function(...*): Promise<IActionResponse<Payload>>}
 */
export function asServerAction(callback) {
  return async function (...args) {
    try {
      const response = await callback(...args);
      // Make sure that server actions are always following the expected response format.
      if (response instanceof ServerActionResponse) {
        return {
          success: response.success,
          message: response.message,
          payload: response.payload,
        };
      } else {
        // Throw an error if the response is not a ServerActionResponse.
        const error = new Error(
          'Unsupported response type returned from server action.'
        );

        console.error(error);
        throw error;
      }
    } catch (error) {
      // If the error is a ServerActionError, return the formatted response.
      if (error instanceof ServerActionError) {
        return {
          success: false,
          message: error.message,
          payload: error.payload,
        };
      } else {
        throw error;
      }
    }
  };
}
