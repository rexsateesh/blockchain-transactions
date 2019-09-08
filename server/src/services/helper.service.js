export default class HelperService {
    /**
     * Create response
     * @param status boolean
     * @param message string
     * @param data object[]
     * @param error object[]
     */
    response(status, message, data = null, error = null) {
      return {
        status, message, data, error
      };
    }
}