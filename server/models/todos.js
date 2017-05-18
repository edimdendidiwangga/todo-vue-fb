const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  task : String,
  is_completed : Boolean,
  user_id : {
    type: Schema.Types.ObjectId, ref: 'User'
  },
	reminder : {
    type: String
  },
  createdAt : {
    type: Date,
    default: Date.now
  }

})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
