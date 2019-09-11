/*
 * A custom Error for use with ToastNotification.
 *
 * Throw it with toast options (object) as first parameter.
 * Observe! the option.message will be passed to Error constructor if not explicitliy passed as second argument.
 */
class ToastError extends Error {
  constructor(toastOptions, message, ...params) {
    /* pass message and remaining arguments (including vendor specific ones) to parent constructor. Pass explicit 
    message or the toast.message to super (to allow for consumers to skip sending duplicate message) */
    super((toastOptions && toastOptions.message) || message, ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ToastError);
    }

    this.name = 'ToastError';
    this.toast = toastOptions; // attach Custom information stored in toastOptions
  }
}

export default ToastError;
