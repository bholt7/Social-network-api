const router = require('express').Router()

// requirements
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');
// set up routes 
router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(getUserById).post(createUser)

router.route('/:id').get(getUserById).put(updateUsers).delete(deleteUsers)

router.route('/:id/friends/:friendsid').post(addFriend).delete(deleteFriend)

module.exports = router
