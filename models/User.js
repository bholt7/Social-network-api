const {Schema, model} = require('mongoose')

const UserSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // regex to validate email
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]

    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
)
// getting the total of friends
UserSchema.virtual('friendCount').get(function(){
  return this.friends.length
})

// now creating the users model using the users schema
const Users = model('User', UserSchema)

// exporting the mod
module.exports = Users
