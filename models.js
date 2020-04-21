/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *        properties:
 *          username:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *             type: string
 *        example:
 *          username: thebestusernameever
 *          email: thebestemailever@mail.com
 *          password: thebestpasswordever
 *           
 */
