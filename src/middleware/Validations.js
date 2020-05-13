import Response from '../helpers/Response';
import UserInputs from '../utils/UserInput';

/**
 * 
 * @class Validation
 * @description class to handle request validations
 * 
 * @method signupValidator
 * @method signinValidator
 */
export default class Validations {
  /**
   * 
   * @description signupValidator
   * 
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * 
   * @returns {object} http response object
   */
  static signupValidator = (request, response, next) => {
    const { validateFields } = UserInputs;
    const { isValid, issues } = validateFields(request.body, [
      'email',
      'password',
      'firstName',
      'lastName',
    ]);
    if (!isValid) {
      return Response.errorResponse(response, 400, 'invalid input', issues);
    }
    next();
  }

  /**
   * 
   * @description signinValidator
   * 
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * 
   * @returns {object} http response object
   */
  static signinValidator = (request, response, next) => {
    const { validateFields } = UserInputs;
    const { isValid, issues } = validateFields(request.body, [
      'email',
      'password',
    ]);

    if (!isValid) {
      return Response.errorResponse(response, 400, 'invalid input', issues);
    }
    next();
  }
}
