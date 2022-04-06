const {Users, Thoughts} = require('../models')

// thought controller
const thoughtController = {
  // grabbing thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
    .populate({
      path: 'reactions',
      select: '-_v',
    })
    .select('-_v')
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
      return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true})
    })
    .then(thoughtData=>{
      !thoughtData ? res.status(404).json({message:'NOPE'}) : res.json(thoughtData)
    })
  }
}


