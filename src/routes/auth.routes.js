const {Router} = require("express")
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear the token cookie and add the token to blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
* @description Get the currently logged in user's information
 * @access Public
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter