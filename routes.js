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
 * tags:
 *   name: Steps
 *   description: Get step history or the most recent step data, or post step data to the database.
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
 *    get:
 *      security: 
 *         - bearerAuth: []
 *      summary: Get all posts from the database. You do not need to send any JSON. It will be ignored.
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description: An array of posts.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 */

/**
 * @swagger
 * path:
 *  /getstepdata:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new StepData document in the database.
 *      tags: [Steps]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StepData'
 *      responses:
 *        "200":
 *          description: Returns all the step data corresponding to the user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StepData'
 */

/**
 * @swagger
 * path:
 *  /getrecentstepdata:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a new StepData document in the database.
 *      tags: [Steps]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StepData'
 *      responses:
 *        "200":
 *          description: Returns all the step data corresponding to the user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StepData'
 */
