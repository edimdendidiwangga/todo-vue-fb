const Todo = require('../models/todos')
const methods = {}

methods.insertOne = function(req, res){
  Todo.create({
    task : req.body.task,
    is_completed : req.body.is_completed,
    user_id : req.body.user_id
  }, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
  Todo.find({})
    .populate('user_id')
    .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

// methods.getById = function(req, res){
//   Todo.findById(req.params.id, function(error, record){
//     if(error){
//       res.json({error})
//     } else {
//       res.json(record)
//     }
//   })
// }

methods.updateById = function(req, res){
  Todo.findByIdAndUpdate(req.params.id,
    { $set:
      {
        task : req.body.task,
        is_completed : req.body.is_completed,
        user_id : req.body.user_id
      }
    }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Todo.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}


module.exports = methods
