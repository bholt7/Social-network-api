const {Schema, model, Types} = require('mongoose')
const moment = require('moment') // using moment for date and time

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      default: ()=> new Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // moment js
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // moment js 
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema] // using the reaction schema to validate data
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  
)

// total reactions
ThoughtSchema.virtual('totalReactions').get(function(){
  return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought 


