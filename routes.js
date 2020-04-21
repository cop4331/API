/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User signup and login
 */

/**
 * @swagger
 * path:
 *  /api/signup:
 *    post:
 *      summary: Create a new user.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: An error message
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
