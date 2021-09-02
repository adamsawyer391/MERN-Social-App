import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

/**
 * get all users
 */
router.route('/api/users').get(userCtrl.list).post(userCtrl.create)


/**
 * get photo os user by user ID
 */
router.route('/api/users/photo/:userId').get(userCtrl.photo, userCtrl.defaultPhoto)

router.route('/api/users/defaultphoto').get(userCtrl.defaultPhoto)



/**
 * follow and unfollow people
 */
 router.route('/api/users/follow')
 .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)
router.route('/api/users/unfollow')
 .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)



/**
 * delete single user by user ID
 */
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router