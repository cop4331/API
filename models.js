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
 *            description: Must be valid and unique, required for email verification.
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
 *            description: The user who created the post.
 *          text:
 *            type: string
 *            description: The content of the post.
 *        example:
 *          username: thebestusernameever
 *          text: I love this app so much! It's so useful!
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      StepData:
 *        type: object
 *        required:
 *          - userID
 *          - date
 *          - numSteps
 *          - distanceTraveled
 *          - caloriesBurned
 *          - dailyGoal
 *        properties:
 *          userID:
 *            type: string
 *            description: This is the string representing the MongoDB ObjectID of the user.
 *          date:
 *            type: string
 *          numSteps:
 *            type: number
 *          distanceTraveled:
 *            type: number
 *          caloriesBurned:
 *            type: number
 *          dailyGoal:
 *            type: number
 *        example:
 *          username: thebestusernameever
 *          text: I love this app so much! It's so useful!
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Error:
 *        type: object
 *        required:
 *          - error
 *        properties:
 *          error:
 *            type: string
 *            description: An error message. If no error, string will be empty.
 *        example:
 *          Error: Unauthorized.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginSuccess:
 *        type: object
 *        required:
 *          - id
 *          - accessToken
 *          - error
 *        properties:
 *          id:
 *            type: string
 *            description: Represents the MongoDB ObjectID for the user.
 *          accessToken:
 *            type: string
 *            description: Required for the user to access every endpoint, besides signup and login.
 *          error:
 *             type: string
 *             description: An error message. If no errors, returns empty.
 *        example:
 *          id: "5e9a23090243dc0017ce4284"
 *          accessToken: xxxxx.yyyyy.zzzzz
 *          error: ""
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */
