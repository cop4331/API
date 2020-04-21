/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User signup and login
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Create a post and get all posts from the database.
 */

/**
 * @swagger
 * path:
 *  /signup:
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
 *          description: An error message.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * path:
 *  /login:
 *    post:
 *      summary: Log in to a user account. It is not required to send email paramater. If you do, it will be ignored.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: An error message.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginSuccess'
 */

/**
 * @swagger
 * path:
 *  /createpost:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new post.
 *      tags: [Posts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        "200":
 *          description: An error message.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * path:
 *  /getallposts:
 *    post:
 *      security: 
 *         - bearerAuth: []
 *      summary: Get all posts from the database. You do not need to send any JSON. It will be ignored.
 *      tags: [Posts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        "200":
 *          description: An array of posts.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 */
