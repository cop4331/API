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
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Post:
 *        type: object
 *        required:
 *          - username
 *          - text
 *        properties:
 *          username:
 *            type: string
 *          text:
 *            type: string
 *        example:
 *          username: thebestusernameever
 *          text: I love this app so much! It's so useful!
 */
