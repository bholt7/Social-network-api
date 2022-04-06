const {Users, Users} = require('../models')

// User controller
const userController = {
  // grabbing Users
  getAllUsers(req, res) {
    Users.find({})
    .populate({path: 'Users', select: '-__v'})
    .populate({
      path: 'friends',
      select: '-_v',
    })
    .select('-_v')
    .then(userData=>res.json(userData))
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
  },
  // get Users by id
  getUserById ({params}, res) {
    Users.findOne({_id: params.id})
    .populate({path: 'Users', select: '-__v'})
  .populate({ path: 'friends',  select: '-_v'})
    .select('-_v')
    .then(userData=> {
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    })
  },
  // create new User
  createUser({params, body}, res) {
    Users.create(body)
    .then(({_id})=>{
      return Users.findOneAndUpdate({_id: params.userId}, {$push: {Users: _id}}, {new: true})
    })
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
    Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .then(userData => {
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    }) 
    .catch(err=> res.status(400).json(err))
  },
  // delete friends
  deleteFriend({params, body}, res) {
    Users.findOneAndUpdate({_id: params.UserId}, {$pull: {friends: params.friendsId}}, {new: true})
    .then(userData =>{
      !userData ? res.status(404).json({message: 'NOPE'}) : res.json(userData)
    })
    .catch(err=> res.status(400).json(err))
  }

  
}

module.exports = userController