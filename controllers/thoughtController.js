const {Users, Thoughts} = require('../models')

// thought controller
const thoughtController = {
  // grabbing thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
    .then(thoughtData=>res.json(thoughtData))
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
  },
  // get thoughts by id
  getThoughtById ({params}, res) {
    Thoughts.findOne({_id: params.id})
  .populate({ path: 'reactions',  select: '-_v'})
    .select('-_v')
    .then(thoughtData=> {
      !thoughtData ? res.status(404).json({message: 'NOPE'}) : res.json(thoughtData)
    })
  },
  // create new thought
  createThought({params, body}, res) {
    Thoughts.create(body)
    .then(({_id})=>{
      return Users.findOneAndUpdate({_id: params.id}, {$push: {thoughts: _id}}, {new: true})
    })
    .then(thoughtData=>{
      !thoughtData ? res.status(404).json({message:'NOPE'}) : res.json(thoughtData)
    })
  },
  // update thoughts
  updateThoughts({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(thoughtData => {
      !thoughtData ? res.status(404).json({message: 'NOPE'}) : res.json(thoughtData)
    }) 
    .catch(err=> res.status(400).json(err))
  },
  // delete thoughts
  deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(thoughtData =>{
      !thoughtData ? res.status(404).json({message: 'NOPE'}) : res.json(thoughtData)
    })
    .catch(err=> res.status(400).json(err))
  },
  // add reaction
  addReaction({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtid}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({ path: 'reactions',  select: '-_v'})
    .select('-_v')
    .then(thoughtData => {
      !thoughtData ? res.status(404).json({message: 'NOPE'}) : res.json(thoughtData)
    })
    .catch(err=> res.status(400).json(err))
  },
  // delete reaction 
  deleteReaction({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtid}, {$pull: {reactions:  {reactionId: params.reactionId}}}, {new: true})
    .then(thoughtData =>{
      !thoughtData ? res.status(404).json({message: 'NOPE'}) : res.json(thoughtData)
    })
    .catch(err=> res.status(400).json(err))
  }

}

module.exports = thoughtController


