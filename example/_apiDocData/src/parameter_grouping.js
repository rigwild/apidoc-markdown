/**
 * @apiDefine login Replace "login" with this text.
 */

/**
 * @apiDefine 201 201 - Everything ok, replace "201" with this text.
 */

/**
 * @apiDefine 401 401 - Oh oh, replace "401" with this text
 */

/**
 * @api {get} /test/:id Grouping
 * @apiName GetGrouping
 * @apiGroup Grouping
 * @apiVersion 0.1.0
 * @apiDescription Title and Grouping of param, success and error
 *
 *
 * @apiParam {String} param1                         No Group, automatically set Group to "Parameter"
 *
 * @apiParam (login) {String} param2                 Group "login"
 * @apiParam (login) {String} param3="Default Value" Group "login" with default Value
 *
 *
 * @apiSuccess {String} success1                       No Group, automatically set "Success 200"
 *
 * @apiSuccess (201) {String} success2                 Group "201"
 * @apiSuccess (201) {String} success3="Default Value" Group "201" with default Value
 *
 *
 * @apiError {String} error1       No Group automatically set "Error 4xx"
 *
 * @apiError (400) {String} error2 Undefined Group "400"
 *
 * @apiError (401) {String} error3 Group "401"
 */
