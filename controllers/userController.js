const {Users} = require('../models')

// User controller
const userController = {
  // grabbing Users
  getAllUsers(req, res) {
    Users.find({})
    .select('-_v')
    // .populate('thoughts')
    // .populate('friends')

    .then(userData=>res.json(userData))
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
  },
  // get Users by id
  getUserById ({params}, res) {
    Users.findOne({_id: params.id})
    .populate({path: 'thoughts', select: '-__v'})
  .populate({ path: 'friends',  select: '-_v'})
    .select('-_v')
    .then(userData=> {
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    })
  },
  // create new User
  createUser({params, body}, res) {
    Users.create(body)
    .then(userData=>{
      !userData ? res.status(404).json({message:'NOPE'}) : res.json(userData)
    })
  },
  // update Users
  updateUsers({params, body}, res) {
    Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(userData => {
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    }) 
    .catch(err=> res.status(400).json(err))
  },
  // delete Users
  deleteUsers({params}, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(userData =>{
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    })
    .catch(err=> res.status(400).json(err))
  },
  //add friend
  addFriend({params}, res) {
    Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendsid}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(userData => {
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    }) 
    .catch(err=> res.status(400).json(err))
  },
  // delete friends
  deleteFriend({params, body}, res) {
    Users.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendsid}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
        .select('-__v')
    .then(userData =>{
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    })
    .catch(err=> res.status(400).json(err))
  }

  
}

module.exports = userController