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
 *          - userID
 *          - description
 *        properties:
 *          userID:
 *            type: string
 *            description: The user who created the post.
 *          description:
 *            type: string
 *            description: The content of the post.
 *        example:
 *          userID: thebestusernameever
 *          description: I love this app so much! It's so useful!
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
 *          userID: "5e9a23090243dc0017ce4284"
 *          date: 4/21/2020
 *          numSteps: 7500
 *          distanceTraveled: 4.5
 *          caloriesBurned: 650
 *          dailyGoal: 10000
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
 *          accessToken: "xxxxx.yyyyy.zzzzz"
 *          error: ""
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserID:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: string
 *            description: Represents the MongoDB ObjectID for the user.
 *        example:
 *          userID: "5e9a23090243dc0017ce4284"
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
