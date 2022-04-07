const router = require('express').Router()

// requirements
const {
 getallThoughts,
  getThoughtById,
  createThought,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} = require('../../controllers/userController');
// set up routes 
router.route('/').get(getAllUsers).post(createThought)

router.route('/:id').get(getThoughtById).post(createThought)

router.route('/:id').get(getThoughtById).put(updateThoughts).delete(deleteThoughts)

router.route('/:thoughtid/reactions/:reactionid').post(addReaction).delete(deleteReaction)

module.exports = router