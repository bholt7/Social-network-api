const router = require('express').Router()

// requirements
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');
// set up routes 
 router.route('/').get(getAllThoughts)

router.route('/:id').get(getThoughtById).post(createThought)

router.route('/:id').get(getThoughtById).put(updateThoughts).delete(deleteThoughts)

router.route('/:thoughtid/reactions/:reactionid').post(addReaction).delete(deleteReaction)

module.exports = router